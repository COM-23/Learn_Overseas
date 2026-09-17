from PIL import Image
from collections import Counter

img = Image.open('/Users/dishik/.gemini/antigravity-ide/brain/cb9408d2-a9b0-4406-9961-1d3da6ae2010/.user_uploaded/media_1788531088042.png').convert("RGBA")
width, height = img.size
pixels = img.load()

# Let's check the pixel values in the top-left 100x100 box where the "T" is
t_colors = []
for y in range(100):
    for x in range(100):
        t_colors.append(pixels[x, y][:3])

print("Top left most common colors:", Counter(t_colors).most_common(10))

# Let's check the maximum brightness in the top-left 100x100
max_brightness = max(sum(pixels[x, y][:3])/3 for x in range(100) for y in range(100))
print("Max brightness in top-left (where T is):", max_brightness)

# Let's check the brightness of the actual white text (middle of image)
mid_colors = []
for y in range(height//2 - 50, height//2 + 50):
    for x in range(width//2 - 50, width//2 + 50):
        mid_colors.append(pixels[x, y][:3])

print("Middle most common colors:", Counter(mid_colors).most_common(10))
