from PIL import Image, ImageDraw, ImageFont
import os

img = Image.new('RGBA', (800, 200), (255, 255, 255, 0))
d = ImageDraw.Draw(img)
# Simple text logo
d.text((50, 50), "Learn OVERSEAS", fill=(255,255,255,255), size=40)
img.save('public/logo.png')
