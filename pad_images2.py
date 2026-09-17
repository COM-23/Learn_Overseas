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
MAX_WIDTH = 550
MAX_HEIGHT = 900

for base in processed_files:
    img_path = f"public/{base}.png"
    if not os.path.exists(img_path):
        continue
    
    with Image.open(img_path) as img:
        bbox = img.getbbox()
        if not bbox:
            continue
            
        cropped = img.crop(bbox)
        w, h = cropped.size
        
        # Determine scale so that width doesn't exceed MAX_WIDTH and height doesn't exceed MAX_HEIGHT
        scale_w = MAX_WIDTH / float(w)
        scale_h = MAX_HEIGHT / float(h)
        scale = min(scale_w, scale_h)
        
        new_w = int(w * scale)
        new_h = int(h * scale)
            
        resized = cropped.resize((new_w, new_h), Image.Resampling.LANCZOS)
        
        new_img = Image.new('RGBA', (TARGET_SIZE, TARGET_SIZE), (0, 0, 0, 0))
        
        # Paste at bottom center
        paste_x = (TARGET_SIZE - new_w) // 2
        paste_y = TARGET_SIZE - new_h - 10 
        
        new_img.paste(resized, (paste_x, paste_y))
        new_img.save(img_path)
        print(f"Repadded {img_path} to {new_w}x{new_h}")
