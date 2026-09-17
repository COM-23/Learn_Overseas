from PIL import Image

def fix_image():
    img = Image.open('public/particle_logo.png').convert("RGBA")
    width, height = img.size
    pixels = img.load()
    
    # We will do a flood fill from (0,0) to remove the background
    # Background colors are white (255,255,255) and grey (e.g. 204,204,204 or similar)
    
    # Let's see what the top-left pixel is
    bg_colors = set()
    bg_colors.add(pixels[0,0][:3])
    bg_colors.add(pixels[10,0][:3])
    
    visited = set()
    queue = [(0, 0)]
    
    # Actually, a much easier way: the checkerboard is just grey and white.
    # The text is white.
    # The text is NOT connected to the edges of the image!
    # So if we flood fill from the edges, we can remove the entire checkerboard!
    
    edges = []
    for x in range(width):
        edges.append((x, 0))
        edges.append((x, height - 1))
    for y in range(height):
        edges.append((0, y))
        edges.append((width - 1, y))
        
    queue = edges
    
    def is_bg(color):
        # A pixel is background if it's perfectly grayscale
        r, g, b = color[:3]
        return r == g and g == b
        
    while queue:
        x, y = queue.pop(0)
        if (x, y) in visited:
            continue
        visited.add((x, y))
        
        if is_bg(pixels[x, y]):
            pixels[x, y] = (0, 0, 0, 0)
            for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nx, ny = x + dx, y + dy
                if 0 <= nx < width and 0 <= ny < height:
                    queue.append((nx, ny))

    img.save('public/particle_logo_clean.png')

fix_image()
