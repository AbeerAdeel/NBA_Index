# Scrapes data from basketball reference to build our dataset for our deep model
import pandas as pd
import numpy as np
from bs4 import BeautifulSoup
from scrape_tools import getSoup
from string import ascii_lowercase
import urllib.request
import shutil
import requests
import unidecode

base_url = 'https://www.basketball-reference.com'
letters = ascii_lowercase.replace('x', '')


def getHOFPlayerLinks(url='https://www.basketball-reference.com/awards/hof.html'):
    # I manually added Kobe, Duncan and Garnett as they will be in the hall of fame next year
    soup = getSoup(url)
    links = {'/players/b/bryanko01.html',
             '/players/d/duncati01.html', '/players/g/garneke01.html'}
    for a in soup.find_all('a', href=True):
        if a.text == 'Player':
            links.add(a['href'])
    return links


def getAllStarLinks(url='https://www.basketball-reference.com/awards/all_star_by_player.html'):
    soup = getSoup(url)
    hof_players = getHOFPlayerLinks()
    cols = [header.string for header in soup.find('thead').findAll('th')]
    col_idx = cols.index('Player')
    links = {td[col_idx].find('a')['href'] for td in [tr.findAll(
        'td') for tr in soup.find('tbody').findAll('tr')]}
    return links - hof_players


def getGeneralPlayerLinks(url='https://www.basketball-reference.com/players/'):
    hof_players = getHOFPlayerLinks()
    all_star_players = getAllStarLinks()
    all_links = set()
    for letter in letters:
        page_url = ''.join([url, letter])
        soup = getSoup(page_url)
        cols = [header.string for header in soup.find('thead').findAll('th')]
        col_idx = cols.index('Player')
        links = {th[col_idx].find('a')['href'] for th in [tr.findAll(
            'th') for tr in soup.find('tbody').findAll('tr')]}
        links = links - all_star_players - hof_players
        all_links.update(links)
    return all_links


def getAllLinks(url='https://www.basketball-reference.com/players/'):
    all_links = []
    for letter in letters:
        page_url = ''.join([url, letter])
        soup = getSoup(page_url)
        cols = [header.string for header in soup.find('thead').findAll('th')]
        col_idx = cols.index('Player')
        links = [th[col_idx].find('a')['href'] for th in [tr.findAll(
            'th') for tr in soup.find('tbody').findAll('tr')]]
        all_links.extend(links)
    return all_links


def generatePlayerLinks(player_links):
    for link in player_links:
        yield ''.join([base_url, link])


def downloadImage(image, name):
    response = requests.get(image, stream=True)

    file = open("images/{}".format(name), 'wb')

    response.raw.decode_content = True
    shutil.copyfileobj(response.raw, file)
    del response


def getImageNames(links, isDownload):
    urls = generatePlayerLinks(links)
    for url in urls:
        soup = getSoup(url)
        div = soup.find('div', {'class': 'media-item'})
        if div:
            img = div.find('img')
            img_name_split = str(img['src']).split("/")
            img_name = img_name_split[len(img_name_split) - 1]
            player_name = soup.find('h1', itemprop="name").text
            if isDownload:
                downloadImage(img['src'], img_name)
                print("Downladed image", img_name)
            yield {"Name": player_name, "imgFile": img_name}


def getPlayerAwards(soup):
    # Go through each a tag in bling and get award names
    award_names = []
    award_count = []
    award_div = soup.find('ul', id="bling")
    if award_div == None:
        return [], []
    award_list = [i.text for i in award_div.find_all('a')]

    # Split the awards by award name and value
    for award in award_list:
        if 'x ' in award:
            split_string = award.split('x ')
            number = int(split_string[0])
            award_name = split_string[1]
            if award_name == 'Def. POY':
                award_name = 'Def POY'
            award_names.append(award_name)
            award_count.append(number)
        elif award != 'Hall of Fame' and 'x ' not in award:
            split_string = award.split(' ')
            if len(split_string) > 2:
                award_name = ' '.join([split_string[1], split_string[2]])
                if award_name == 'Def. POY':
                    award_name = 'Def POY'
            else:
                award_name = split_string[1]
            award_names.append(award_name)
            award_count.append(1)

    return award_names, award_count


def isCurrentPlayer(soup):
    class_div = soup.find('div', {'class': 'p1'})
    div = class_div.find('div')
    p_lst = div.findAll('p')
    p_count = 0
    for p in p_lst:
        if p.text != '':
            p_count += 1
    return p_count == 2


def getActiveLinks(url='https://www.basketball-reference.com/leagues/NBA_2020_per_game.html'):
    soup = getSoup(url)
    cols = [header.string for header in soup.find('thead').findAll('th')]
    col_idx = cols.index('Player') - 1
    for tr in soup.find('tbody').findAll('tr'):
        for td in [tr.findAll('td')]:
            if len(td) > 0:
                yield td[col_idx].find('a')['href']


def getAverageSalary(url='https://www.basketball-reference.com/contracts/players.html'):
    soup = getSoup(url)
    cols = [header.string for header in soup.find('thead').findAll('th')]
    for tr in soup.find('tbody').findAll('tr'):
        for td in [tr.findAll('td')]:
            lst = []
            if len(td) > 0:
                name = unidecode.unidecode(td[0].find('a').text)
                for i in range(2, 8):
                    if td[i].text !='':
                        lst.append(int(td[i].text.replace('$', '').replace(',', '')))
                avg = int(np.array(lst).mean())
                yield {"Name": name, "avgSalary": avg}


def getRookieLinks(url):
    soup = getSoup(url)
    cols = [header.string for header in soup.find('thead').findAll('th')]
    col_idx = 10

    for tr in soup.find('tbody').findAll('tr'):
        for th in tr.findAll('th'):
            player = tr.find('a')
            if player:
                yield player['href']


def getPlayerInfo(target, links, getActive):
    urls = generatePlayerLinks(links)
    class_names = ['p1', 'p2', 'p3']
    all_categories = []
    all_stats = []

    # Go through each player bball ref url
    for url in urls:
        soup = getSoup(url)
        isActive = isCurrentPlayer(soup)
        player_name = soup.find('h1', itemprop="name").text
        player_awards = getPlayerAwards(soup)
        if isActive == False and isActive == getActive:

            # Go through each stats card class and scrape categories and stats, also determine if th
            for class_name in class_names:
                class_div = soup.find('div', {'class': class_name})
                stats = [float(i.text) if i.text != '-' else 'NA' for i in class_div.find_all(
                    'p') if i.text != '']
                categories = [i.text for i in class_div.find_all('h4')]
                all_categories.extend(categories)
                all_stats.extend(stats)
            # Organize player dictonaries
            all_categories.extend(player_awards[0])
            all_stats.extend(player_awards[1])
            all_categories.extend(['Name', 'Target', 'isActive'])
            all_stats.extend([player_name, target, getActive])
            player_dict = dict(zip(all_categories, all_stats))
            print("Sucessfully scraped", player_dict)
            yield player_dict
            all_categories = []
            all_stats = []
        elif isActive == True and isActive == getActive:
            for class_name in class_names:
                class_div = soup.find('div', {'class': class_name})
                p_lst = class_div.find_all('p')
                stats = [float(p_lst[i].text) if p_lst[i].text != '-' else 'NA' for i in range(
                    len(p_lst)) if p_lst[i].text != '' if i % 2 == 1]
                categories = [i.text for i in class_div.find_all('h4')]
                all_categories.extend(categories)
                all_stats.extend(stats)

            # Organize player dictonaries
            all_categories.extend(player_awards[0])
            all_stats.extend(player_awards[1])
            all_categories.extend(['Name', 'Target', 'isActive'])
            all_stats.extend([player_name, target, getActive])
            player_dict = dict(zip(all_categories, all_stats))
            print("Sucessfully scraped", player_dict)
            yield player_dict
            all_categories = []
            all_stats = []

