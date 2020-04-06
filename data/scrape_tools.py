# Common reused scrape tools
from bs4 import BeautifulSoup
import re
import requests

# Gets BeautiflSoup object for a certain html
def getSoup(url):
        response = requests.get(url)
        soup = BeautifulSoup(response.text, "html.parser")
        return soup

def getTable(player_url, table_name):
    soup = getSoup(player_url)
    table = soup.find('table', {'class': table_name})
    return table

