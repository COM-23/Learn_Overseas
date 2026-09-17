from PIL import Image

# Read image
img = Image.open('public/team3d/team_member.png')
pixels = img.load()
w, h = img.size

# Left eye coordinates (approx)
lx, ly, lw, lh = 370, 345, 80, 25
# Right eye coordinates (approx)
rx, ry, rw, rh = 575, 345, 80, 25

# For the left eye, copy skin patch from slightly above/below and overwrite the eye
for y in range(lh):
    for x in range(lw):
        # Sample from cheek below the glasses
        src_y = ly + lh + 40 + y 
        if src_y < h:
            r, g, b, a = pixels[lx+x, src_y]
            # Draw a dark line for eyelashes at the bottom of the patch
            if y == lh - 1:
                r, g, b = int(r*0.5), int(g*0.5), int(b*0.5)
            pixels[lx+x, ly+y] = (r, g, b, a)

# Right eye
for y in range(rh):
    for x in range(rw):
        src_y = ry + rh + 40 + y 
        if src_y < h:
            r, g, b, a = pixels[rx+x, src_y]
            if y == rh - 1:
                r, g, b = int(r*0.5), int(g*0.5), int(b*0.5)
            pixels[rx+x, ry+y] = (r, g, b, a)

img.save('public/team3d/team_member_closed.png')
print("Done")
