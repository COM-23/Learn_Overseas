from PIL import Image

def fix_image():
    img = Image.open('/Users/dishik/.gemini/antigravity-ide/brain/cb9408d2-a9b0-4406-9961-1d3da6ae2010/.user_uploaded/media_1788531088042.png').convert("RGBA")
    width, height = img.size
    pixels = img.load()
    
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            
            # The "T" error has max brightness ~148
            # The checkerboard is ~68 and ~97
            # The logo text is ~255 down to ~200 (anti-aliasing)
            if r > 180 and g > 180 and b > 180:
                # Keep it as pure white for maximum glow effect!
                pixels[x, y] = (255, 255, 255, a)
            else:
                pixels[x, y] = (0, 0, 0, 0)

    img.save('/Users/dishik/Downloads/Internship /Learn Overseas/public/particle_logo_clean.png')

fix_image()
