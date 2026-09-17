from PIL import Image, ImageDraw

img = Image.open('public/team3d/team_member.png')
draw = ImageDraw.Draw(img)
w, h = img.size

# Draw a grid or specific boxes to find the exact eye coordinates
# Let's draw boxes for left eye (from X=32% to 45%, Y=38% to 40%)
def draw_box(x_pct, y_pct, w_pct, h_pct, color):
    x0 = w * x_pct
    y0 = h * y_pct
    x1 = x0 + w * w_pct
    y1 = y0 + h * h_pct
    draw.rectangle([x0, y0, x1, y1], outline=color, width=2)

# Left eye eyelid sample
draw_box(0.33, 0.38, 0.12, 0.02, "red") 
# Left eyeball area (to see how far to stretch)
draw_box(0.33, 0.40, 0.12, 0.03, "blue")

# Right eye eyelid sample
draw_box(0.55, 0.38, 0.12, 0.02, "red")
# Right eyeball area
draw_box(0.55, 0.40, 0.12, 0.03, "blue")

# Save to artifacts so I can view it
import os
os.makedirs('/Users/dishik/.gemini/antigravity-ide/brain/1c374bcc-2204-4eac-9ae9-bfb5d95baa21/scratch', exist_ok=True)
img.save('/Users/dishik/.gemini/antigravity-ide/brain/1c374bcc-2204-4eac-9ae9-bfb5d95baa21/scratch/eye_boxes.png')
print("Done")
