from PIL import Image

def crop_and_center():
    img = Image.open('/Users/dishik/Downloads/Internship /Learn Overseas/public/particle_logo_clean.png')
    
    # Get the bounding box of the non-zero alpha pixels
    bbox = img.getbbox()
    if bbox:
        # Crop the image to the bounding box
        img_cropped = img.crop(bbox)
        # Save it
        img_cropped.save('/Users/dishik/Downloads/Internship /Learn Overseas/public/particle_logo_clean.png')
        print(f"Cropped from {img.size} to {img_cropped.size}")
    else:
        print("Bounding box not found (empty image?)")

crop_and_center()
