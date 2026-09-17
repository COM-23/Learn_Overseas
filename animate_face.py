import cv2
import numpy as np
import os

image_path = 'public/ceo.png'
output_path = 'public/animated_ceo.mp4'

if not os.path.exists(image_path):
    print(f"Error: {image_path} not found")
    exit(1)

img = cv2.imread(image_path)
h, w = img.shape[:2]

fourcc = cv2.VideoWriter_fourcc(*'mp4v')
out = cv2.VideoWriter(output_path, fourcc, 30.0, (w, h))

num_frames = 30
grid_x, grid_y = np.meshgrid(np.arange(w), np.arange(h))
grid_x = grid_x.astype(np.float32)
grid_y = grid_y.astype(np.float32)

# Approximate positions for a standard face portrait
eye_y = h * 0.4
mouth_y = h * 0.75
mouth_x = w * 0.5

def apply_warp(progress):
    map_x = np.copy(grid_x)
    map_y = np.copy(grid_y)
    
    # Blink (pull down at eye_y)
    blink = 1.0 - abs((progress - 0.5) * 2)
    dist_eye = np.abs(map_y - eye_y)
    weight_eye = np.maximum(0, 1 - dist_eye / (h * 0.1))
    map_y -= weight_eye * (h * 0.02) * blink
    
    # Smile (pull up and out at mouth corners)
    dist_mouth = np.sqrt((map_x - mouth_x)**2 + (map_y - mouth_y)**2)
    weight_mouth = np.maximum(0, 1 - dist_mouth / (h * 0.15))
    map_y -= weight_mouth * (h * 0.05) * progress
    
    warped = cv2.remap(img, map_x, map_y, interpolation=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REPLICATE)
    return warped

print("Generating video frames...")
for i in range(num_frames):
    p = i / (num_frames - 1)
    # Ease in-out
    p = p * p * (3 - 2 * p)
    out.write(apply_warp(p))

final_frame = apply_warp(1.0)
for _ in range(15):
    out.write(final_frame)

for i in range(num_frames - 1, -1, -1):
    p = i / (num_frames - 1)
    p = p * p * (3 - 2 * p)
    out.write(apply_warp(p))

out.release()
print(f"Created {output_path}")
