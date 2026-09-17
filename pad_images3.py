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
TARGET_WIDTH = 400

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
        
        scale = TARGET_WIDTH / float(w)
        new_w = int(w * scale)
        new_h = int(h * scale)
            
        resized = cropped.resize((new_w, new_h), Image.Resampling.LANCZOS)
        
        new_img = Image.new('RGBA', (TARGET_SIZE, TARGET_SIZE), (0, 0, 0, 0))
        
        # Paste at top center, y=50 to align head exactly with Chris and Kunal
        paste_x = (TARGET_SIZE - new_w) // 2
        paste_y = 50 
        
        new_img.paste(resized, (paste_x, paste_y))
        new_img.save(img_path)
        print(f"Repadded {img_path} to {new_w}x{new_h} at y=50")
