import urllib.request
import os

logos = {
    "caltech.edu.png": "https://upload.wikimedia.org/wikipedia/en/a/a4/Caltech_seal.svg",
    "pacific.edu.png": "https://upload.wikimedia.org/wikipedia/commons/1/11/University_of_the_Pacific_seal.svg",
    "unsw.edu.au.png": "https://upload.wikimedia.org/wikipedia/en/e/e1/University_of_New_South_Wales_coat_of_arms.svg",
    "yorku.ca.png": "https://upload.wikimedia.org/wikipedia/en/7/73/York_University_logo.svg",
    "ucalgary.ca.png": "https://upload.wikimedia.org/wikipedia/en/f/f6/University_of_Calgary_coat_of_arms.svg"
}

for filename, url in logos.items():
    print(f"Downloading {filename}...")
    try:
        # Use a real user agent to bypass some blocks
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            with open(f"public/logos/{filename}", 'wb') as f:
                f.write(response.read())
        print(f"Success for {filename}")
    except Exception as e:
        print(f"Failed for {filename}: {e}")
