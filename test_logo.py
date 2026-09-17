from PIL import Image
img = Image.open('public/logo.png').convert("RGBA")
print(img.size)
colors = set()
for p in list(img.getdata())[:100]:
    colors.add(p)
print("Some pixels:", list(colors)[:5])
