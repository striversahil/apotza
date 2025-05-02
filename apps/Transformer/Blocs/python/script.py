# script.py
import sys
import json

def Function(query):
    return query


if __name__ == "__main__":
    # query_json = 
    query = sys.stdin.read()
    print(Function(query))

