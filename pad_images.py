import os
from PIL import Image

processed_files = [
    'kiran_sn', 'mehdi_raza_', 'sudeepthi', 'aswajith_m', 'anusha', 
    'meenakshi_rawat', 'darshan', 'mala_panda_', 'suman', 'preethi_naidu', 
    'soumya', 'prathiba_maria_caroline', 'anon', 'tharun_m', 'keerthana', 
    'anuja_d', 'swapna', 'sanjana_soni', 'udaya_vikram', 'ganesh_b_s', 
    'vibha', 'ruchita_patil', 'aravind_br', 'sharathi_r', 'siva_priya',
    'aparna_ashish', 'pawan_singh_negi'
]

TARGET_SIZE = 1024
TARGET_PERSON_HEIGHT = 950

for base in processed_files:
    img_path = f"public/{base}.png"
    if not os.path.exists(img_path):
        print(f"Skipping {img_path} (not found)")
        continue
    
    with Image.open(img_path) as img:
        # Ignore if it's already 1024x1024
        if img.size == (TARGET_SIZE, TARGET_SIZE):
            print(f"Skipping {img_path} (already 1024x1024)")
            continue
            
        bbox = img.getbbox()
        if not bbox:
            print(f"Skipping {img_path} (empty)")
            continue
            
        # Crop to bounding box to remove any existing padding from rembg
        cropped = img.crop(bbox)
        
        # Scale to make the height TARGET_PERSON_HEIGHT
        w, h = cropped.size
        scale = TARGET_PERSON_HEIGHT / float(h)
        new_w = int(w * scale)
        new_h = TARGET_PERSON_HEIGHT
        
        # If the person is incredibly wide, scale down based on width
        if new_w > 950:
            scale = 950 / float(w)
            new_w = 950
            new_h = int(h * scale)
            
        resized = cropped.resize((new_w, new_h), Image.Resampling.LANCZOS)
        
        # Create a new 1024x1024 transparent image
        new_img = Image.new('RGBA', (TARGET_SIZE, TARGET_SIZE), (0, 0, 0, 0))
        
        # Paste at bottom center
        # Bottom padding 25px
        paste_x = (TARGET_SIZE - new_w) // 2
        paste_y = TARGET_SIZE - new_h - 25 
        
        new_img.paste(resized, (paste_x, paste_y))
        new_img.save(img_path)
        print(f"Padded and resized {img_path}")
