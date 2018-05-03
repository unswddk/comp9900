#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Apr 23 16:48:46 2018

@author: chenyirong
"""
#import preprocess
import random
import math
import operator
import csv
import requests

import pandas as pd

# split the data into a trainingdataset and testdataset in ratio of 67/33

def loadDataset(filename, split, trainingSet=[], testSet=[], content_header=[]):
    with open(filename, 'r') as csvfile:
        # returns a reader object which will iterate over lines
        lines = csv.reader(csvfile)
        # dataset is a list of all data, where each item is a line as list
        dataset = list(lines)
        # minus 1 because we are predicting for next day
        for x in range(len(dataset) - 1):
            # convert the content to float
            # minus 1 because last is string for up or down
            for y in range(1, len(content_header) - 1):
                dataset[x][y] = float(dataset[x][y])
            if random.random() < split:
                trainingSet.append(dataset[x])
            else:
                testSet.append(dataset[x])


def euclideanDistance(instance1, instance2, length):
    distance = 0
    for x in range(1, length):
#        print(instance1[x])
#        print(instance2[x])
        distance += pow((instance1[x] - instance2[x]), 2)
    return math.sqrt(distance)


# get k nearest neighbors of the <array><num> testInstance among <array><array>
# trainingSet
def getNeighbors(trainingSet, testInstance, k):
    distance = []
    # minus 1 because we are splitting our data and test also has known class
    length = len(testInstance) - 1

    for x in range((len(trainingSet))):
        dist = euclideanDistance(testInstance, trainingSet[x], length)
        distance.append((trainingSet[x], dist))
    # sort based on the the item at index 1 i.e the distance
    distance.sort(key=operator.itemgetter(1))
    neighbors = []
    for x in range(k):
        neighbors.append(distance[x][0])
    return neighbors


# make all responses vote their classification, the one with the highest vote
# wins
def getResponse(neighbors):
    classVotes = {}
    for x in range(len(neighbors)):
        response = neighbors[x][-1]
        if response in classVotes:
            classVotes[response] += 1
        else:
            classVotes[response] = 1
    
    #print(classVotes)
    high_key = " "
    high_value = float("-inf")
    for key in classVotes.keys():
        if classVotes[key] >= high_value:
            high_key = key
    
    return high_key
    #sortedVotes = sorted(classVotes.iteritems(), key=operator.itemgetter(1), reverse=True)
    #return sortedVotes[0][0]


def getAccuracy(testSet, predictions):
    correct = 0
    for x in range(len(testSet)):
        if testSet[x][-1] == predictions[x]:
            correct += 1
    return (correct/float(len(testSet))) * 100.0


def predictFor(k, filename, stockname, split):
    #iv = ["date", "open", "high", "low", "close", "yesterday closing adj","state change"]
    iv = ["date", "open", "high", "low", "close","state change"]
    trainingSet = []
    testSet = []
    totalCount = 0

    # open the file
    loadDataset(filename, split, trainingSet, testSet, iv)

    print("Predicting for ", stockname)
    print("Train: " + repr(len(trainingSet)))
    print("Test: " + repr(len(testSet)))
    totalCount += len(trainingSet) + len(testSet)
    print("Total: " + repr(totalCount))

    # generate predictions
    predict_and_get_accuracy(testSet, trainingSet, k, stockname)
    
    
def predict_and_get_accuracy(testSet, trainingSet, k, stockname):
    predictions = []
    for x in range(len(testSet)):
        neighbors = getNeighbors(trainingSet, testSet[x], k)
        result = getResponse(neighbors)
        predictions.append(result)

    accuracy = getAccuracy(testSet, predictions)
    print('Accuracy: ' + repr(accuracy) + '%')
    
def predictForTomorrow(k, filename, yesterday_instance, split):
    #iv = ["date", "open", "high", "low", "close", "yesterday closing adj","state change"]
    iv = ["date", "open", "high", "low", "close","state change"]
    trainingSet = []
    testSet = []
    # open the file
    loadDataset(filename, split, trainingSet, testSet, iv)
    
    neighbors = getNeighbors(trainingSet, yesterday_instance, k)
    result = getResponse(neighbors)
    
    print(result)
    return result

def preprocess_data(stock_code):
    #stock_code = "BFR"
    
    #url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol="+stock_code+"&outputsize=full&apikey=QQW8ENTIJEEQ0S23&datatype=csv"
    url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+stock_code+".ax&outputsize=full&apikey=QQW8ENTIJEEQ0S23&datatype=csv"
    file_name = "daily_adjusted_" + stock_code + ".csv"
    r = requests.get(url) 
    with open(file_name, "wb") as file:  # 文件名通过解析url地址得到
        file.write(r.content)

    
    file = open(file_name,'r')
    out_name = stock_code + '.csv'
    out = open(out_name,'w', newline ='')
    reader = csv.reader(file)
    #length = len(list(reader))
    #print(length)
    sortedlist = sorted(reader, key = lambda x: x[0])
    length = len(sortedlist)
    if length == 3:
        return "Wrong Code"
    else:
        csv_writer = csv.writer(out,dialect='excel')
        
        n = 0
        previous_adjusted_closing_price = 0
        yesterday_instance = []
        for line in sortedlist:
            #print(n)
            line.pop()
            #line.pop()
            #line.pop()
            if n == 0:
                #previous_adjusted_closing_price = float(line[5])
                previous_adjusted_closing_price = float(line[4])
                #csv_writer.writerow(line)
                n += 1
            else:
                if line[0] == 'timestamp':
                    n += 1
                    continue
                elif n == length - 2:
                    for x in line:
                        try:
                            m = float(x)
                        except Exception:
                            yesterday_instance.append(x)
                        else:
                            yesterday_instance.append(float(x))
                else:
                    #if float(line[5]) - previous_adjusted_closing_price > 0:
                    if float(line[4]) - previous_adjusted_closing_price > 0:
                        line.append('up')
                        csv_writer.writerow(line)
                        #previous_adjusted_closing_price = float(line[5])
                        previous_adjusted_closing_price = float(line[4])
                        n += 1
                    else:
                        line.append('down')
                        csv_writer.writerow(line)
                        #previous_adjusted_closing_price = float(line[5])
                        previous_adjusted_closing_price = float(line[4])
                        n += 1
        
              
        file.close()
        out.close()
        if n >= 100:
            return yesterday_instance
        else:
            return False
    
#def main(stock_code):
def get_prediction(code):
    stock_code = code
    yesterday_instance = preprocess_data(stock_code)
    
    if yesterday_instance == "Wrong Code":
        print("Wrong Stock Code!")
        return False
    elif yesterday_instance != False:
        print(yesterday_instance)
        split = 0.67
        
        predict_file_name = stock_code + '.csv'
        predictFor(1, predict_file_name, stock_code, split)
        prediction = predictForTomorrow(1, predict_file_name, yesterday_instance, 1)
        
        return prediction
    else:
        print("Not enough historical stock information to predict!")
        return False

get_prediction("1PG")