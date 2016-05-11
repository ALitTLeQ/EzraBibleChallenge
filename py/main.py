# -*- coding: utf-8 -*-
import json
import csv
result = {}
f = open('test.csv', 'r')  
for row in csv.DictReader(f, ["Q", "A"]):  
    result[row['Q']] = row["A"]
f.close()
#print result
print json.dumps(result, ensure_ascii=False)
