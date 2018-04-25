# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""

import string
import sys
import os
import urllib
import urllib.request
import csv
#import urllib2
from bs4 import BeautifulSoup
import requests
import re


def preprocess_data(stock_code):
    #stock_code = "BFR"
    #stock_code = sys.argv[1]
    #stock_code = "WFC"
    url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol="+stock_code+"&outputsize=full&apikey=QQW8ENTIJEEQ0S23&datatype=csv"
#    url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=' + stock_code +'&outputsize=full&apikey=QQW8ENTIJEEQ0S23&datatype=csv'
#    local = os.path.abspath('.')
    file_name = "daily_adjusted_" + stock_code + ".csv"
    r = requests.get(url) 
    with open(file_name, "wb") as file:  # 文件名通过解析url地址得到
        file.write(r.content)
    #urllib.request.urlretrieve(url)
    #urllib.request.urlopen(url)
    #requests.get(url)
    #urllib.open(url)
    
    
    file = open(file_name,'r')
    out_name = stock_code + '.csv'
    out = open(out_name,'w', newline ='')
    reader = csv.reader(file)
    #length = len(list(reader))
    #print(length)
    sortedlist = sorted(reader, key = lambda x: x[0])
    length = len(sortedlist)
    csv_writer = csv.writer(out,dialect='excel')
    
    n = 0
    previous_adjusted_closing_price = 0
    yesterday_instance = []
    for line in sortedlist:
        #print(n)
        line.pop()
        line.pop()
        line.pop()
        if n == 0:
            previous_adjusted_closing_price = float(line[5])
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
                if float(line[5]) - previous_adjusted_closing_price > 0:
                    line.append('up')
                    csv_writer.writerow(line)
                    previous_adjusted_closing_price = float(line[5])
                    n += 1
                else:
                    line.append('down')
                    csv_writer.writerow(line)
                    previous_adjusted_closing_price = float(line[5])
                    n += 1
    
    #dataset = list(reader)  
    #for x in range(len(dataset)):
    #    dataset[x].pop()
    #    dataset[x].pop()
    #    if x == 0:
    #        dataset[x].append('Label')
    #        csv_writer.writerow(dataset[x])
    #    elif x == len(dataset)-1:
    #        continue
    #    else:
    #        if float(dataset[x][5]) - float(dataset[x+1][5]) > 0:
    #            dataset[x].append('up')
    #            csv_writer.writerow(dataset[x])
    #        else:
    #            dataset[x].append('down')
    #            csv_writer.writerow(dataset[x])
        
    #for line in dataset:
    #    line.pop()
    #    line.pop()
    #    if n == 0:
    #        line.append('Label')
    #        csv_writer.writerow(line)
    #    elif n == 1:
    #        previous_adjusted_closing_price = float(line[5])
    #        csv_writer.writerow(line)
    #    else:
    #        if previous_adjusted_closing_price - float(line[5]) > 0:
    #            line.append('up')
    #            csv_writer.writerow(line)
    #        else:
    #            line.append('down')
    #            csv_writer.writerow(line)
    #    n += 1
          
    file.close()
    out.close()
    return yesterday_instance

#print(preprocess_data("WFC"))