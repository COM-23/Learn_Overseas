import os
import subprocess
import glob
import re

# Convert HEIC to PNG using sips
heic_files = glob.glob('./*.HEIC') + glob.glob('./*.heic')
for heic in heic_files:
    png_name = heic.rsplit('.', 1)[0] + '.png'
    subprocess.run(['sips', '-s', 'format', 'png', heic, '--out', png_name])

# All relevant images (excluding screenshots)
images = []
exclude = ['team_debug', 'screenshot', 'team_kunal_debug', 'team_black_screen', 'airplane_test', 'home_debug', 'process_images.py']
for ext in ['*.png', '*.jpg', '*.jpeg', '*.JPG', '*.JPEG']:
    for f in glob.glob('./' + ext):
        if not any(ex.lower() in f.lower() for ex in exclude):
            images.append(f)

processed_files = []
# Process images using rembg CLI
for img in images:
    base_name = os.path.basename(img).rsplit('.', 1)[0]
    
    # clean up name: remove spaces, lowercase, remove titles
    clean_name = base_name.lower().replace(' - executive student advisor', '').replace(' mumbai', '').replace(' photo', '').replace(' img', '').replace(' pic', '').replace(' ', '_')
    clean_name = re.sub(r'[^a-z0-9_]', '', clean_name)
    
    out_path = f"public/{clean_name}.png"
    if not os.path.exists(out_path):
        print(f"Processing {img} -> {out_path}")
        subprocess.run(['./.venv/bin/rembg', 'i', img, out_path])
    
    processed_files.append((base_name, clean_name))

print("Completed processing images.")

# Node.js script string to update teamData.js
nodejs_code = """
const fs = require('fs');

const processedFiles = %s;

let teamData = fs.readFileSync('src/data/teamData.js', 'utf8');

for (const [original, cleanName] of processedFiles) {
    // Generate a regex to find the team member. The original name might be 'Aravind BR', 'Siva Priya', etc.
    let nameToMatch = original.replace(/ - Executive Student Advisor/ig, '').replace(/ Mumbai/ig, '').replace(/ Photo/ig, '').replace(/ img/ig, '').replace(/ Pic/ig, '').trim();
    
    // Attempt fuzzy match for the name in the teamData.js file
    // For example, if nameToMatch is "Preethi Naidu", but the file has "Preethi M". We might just match first name.
    let firstName = nameToMatch.split(' ')[0];
    
    // We can use a regex to match the object in TEAM_MEMBERS
    // e.g. { id: "...", name: "Siva Priya", ... }
    const regex = new RegExp(`({[^}]*name:\\s*["']([^"']*${firstName}[^"']*)["'][^}]*)(})`, 'i');
    
    if (regex.test(teamData)) {
        console.log(`Matched ${nameToMatch} to JS data using ${firstName}`);
        teamData = teamData.replace(regex, (match, p1, p2, p3) => {
            // Check if it already has an image property
            if (p1.includes('image:')) return match;
            return p1 + `, image: "/${cleanName}.png" ` + p3;
        });
    } else {
        console.log(`Could not find a match for ${nameToMatch}`);
    }
}

fs.writeFileSync('src/data/teamData.js', teamData);
""" % (str(processed_files))

with open('update_team.js', 'w') as f:
    f.write(nodejs_code)

print("Created update_team.js. Running it...")
subprocess.run(['node', 'update_team.js'])

