from PIL import Image

def remove_checkerboard(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    new_data = []
    # A typical checkerboard is white (255,255,255) and grey (204,204,204 or similar)
    # The logo itself is likely white.
    # If the logo is white, we can extract it by checking the alpha channel of the original image if any? No, it's probably flattened.
    # If the user uploaded a screenshot of a transparent image, the checkerboard is flattened.
    # We can detect pixels that are exactly the grey of the checkerboard.
    for item in data:
        r, g, b, a = item
        # Grey checkerboard squares
        if r == g == b and r < 240 and r > 180:
            new_data.append((0, 0, 0, 0))
        # White squares - problem is the logo is also white!
        # If we just make grey squares transparent, the white squares will remain.
        # Let's just make it completely white but mask out the checkerboard? No.
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path)

remove_checkerboard('public/logo.png', 'public/logo_test.png')
