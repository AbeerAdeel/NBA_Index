from sklearn.utils import resample, class_weight
from collections import Counter
import pandas as pd
import numpy as np
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
pd.options.mode.chained_assignment = None

def getCleanDataSets():
    train_df = pd.read_csv('salary-data.csv')
    predict_df = pd.read_csv('current_stats.csv')

    return train_df.fillna(0), predict_df.fillna(0)


def getInputOutput(df, isTarget):
    columns = list(df.columns)
    if isTarget:
        targets = df['Salary']
        columns.remove('Salary')
    else:
        targets = []
        if 'Name' in columns:
            columns.remove('Name')
    columns.remove('G')
    columns.remove('GS')
    columns.remove('MP')
    values = df[columns].values
    print(columns)
    return values, targets

def makeModel():
    dataset = getCleanDataSets()[0]
    values = getInputOutput(dataset, True)[0]
    targets = getInputOutput(dataset, True)[1]
    epocs = 750
    
    X, y = values, targets
    X = X.astype('float32')

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33)
    print(X_train.shape, X_test.shape, y_train.shape, y_test.shape)
    n_features = X_train.shape[1]

    model = tf.keras.Sequential()
    model.add(tf.keras.layers.Dense(64, activation='relu', input_shape=(n_features,)))
    model.add(tf.keras.layers.Dense(64, activation='relu'))
    model.add(tf.keras.layers.Dense(1))

    optimizer = tf.keras.optimizers.RMSprop(0.1)

    model.compile(optimizer=optimizer, loss='mse', metrics = ['mae', 'mse'])
    model.fit(X_train, y_train, epochs=epocs, validation_split=0.2, verbose=0)

    error = model.evaluate(X_test, y_test, verbose=0)
    print(error)
    

    allPlayers = getCleanDataSets()[1]
    print(len(allPlayers))
    values = getInputOutput(allPlayers, False)[0].astype('float32')
    yhat = model.predict(values)
    allPlayers['marketValue'] = yhat
    df = allPlayers[['Name', 'marketValue']]
    df.to_csv('players.csv')


makeModel()