import urllib.request
import json
def get_image(title):
    url = f"https://en.wikipedia.org/w/api.php?action=query&titles={title}&prop=pageimages&format=json&pithumbsize=800"
    req = urllib.request.urlopen(url)
    data = json.loads(req.read())
    pages = data['query']['pages']
    for page_id in pages:
        if 'thumbnail' in pages[page_id]:
            return pages[page_id]['thumbnail']['source']
    return None

print("Airplane:", get_image("Boeing_777"))
print("Asteroid:", get_image("Asteroid"))
print("Graduation:", get_image("Square_academic_cap"))
