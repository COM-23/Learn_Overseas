import urllib.request
import os

domains = [
    "cornell.edu", "caltech.edu", "uchicago.edu", "unsw.edu.au", 
    "tcd.ie", "yorku.ca", "ucd.ie", "umb.edu", "pacific.edu", "ucalgary.ca"
]

for domain in domains:
    url = f"https://s2.googleusercontent.com/s2/favicons?domain={domain}&sz=256"
    filename = f"public/logos/{domain}.png"
    print(f"Downloading {filename}...")
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            with open(filename, 'wb') as f:
                f.write(response.read())
        print(f"Success for {filename}")
    except Exception as e:
        print(f"Failed for {filename}: {e}")
