#!/usr/bin/env bash

# read -p "Enter keywords to search: " keywords
# echo $keywords

for file in Ahoora/*; do 
    res=$(cat $file | grep "map<int, int>")
    if [[ $res ]]; then
        url=${file//_//}
        url=${url:7}
        url="codeforces.com"$url
        echo $url
    fi
done;
