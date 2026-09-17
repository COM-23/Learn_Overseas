from PIL import Image
img = Image.open('public/logo.png').convert("RGBA")
pixels = list(img.getdata())
non_transparent = [p for p in pixels if p[3] > 0]
print("Total non-transparent pixels:", len(non_transparent))
print("First 5 non-transparent pixels:", non_transparent[:5])
