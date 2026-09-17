from PIL import Image

img = Image.open('public/particle_logo.png').convert("RGBA")
datas = img.getdata()

new_data = []
for item in datas:
    # item is (R, G, B, A)
    # The checkerboard is usually a mix of white (255,255,255) and light grey (e.g., 204,204,204 or 230,230,230)
    # But wait, the logo text itself is white!
    # If the checkerboard has a specific pattern, it's hard to filter pixel by pixel.
    
    # Actually, we can check if it's perfectly grey (R==G==B) and not perfectly white (255,255,255)
    # But the white squares of the checkerboard ARE perfectly white.
    pass
