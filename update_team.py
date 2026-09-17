import os
import re

processed_files = [
    ('Kiran SN', 'kiran_sn'),
    ('Mehdi Raza ', 'mehdi_raza_'),
    ('Sudeepthi', 'sudeepthi'),
    ('Aswajith M', 'aswajith_m'),
    ('Anusha', 'anusha'),
    ('Meenakshi Rawat', 'meenakshi_rawat'),
    ('Darshan Mumbai', 'darshan'),
    ('Mala Panda Mumbai ', 'mala_panda_'),
    ('SUMAN - Executive Student Advisor', 'suman'),
    ('Preethi Naidu', 'preethi_naidu'),
    ('SOUMYA - Executive Student Advisor', 'soumya'),
    ('Prathiba Maria Caroline', 'prathiba_maria_caroline'),
    ('ANON - Executive Student Advisor', 'anon'),
    ('Tharun M', 'tharun_m'),
    ('Keerthana', 'keerthana'),
    ('Anuja D img', 'anuja_d'),
    ('Swapna Pic', 'swapna'),
    ('Sanjana Soni', 'sanjana_soni'),
    ('Udaya Vikram', 'udaya_vikram'),
    ('Ganesh B S', 'ganesh_b_s'),
    ('Vibha', 'vibha'),
    ('Ruchita Patil Photo', 'ruchita_patil'),
    ('Aravind BR', 'aravind_br'),
    ('Sharathi R', 'sharathi_r'),
    ('Siva Priya - Executive Student Advisor', 'siva_priya')
]

with open('src/data/teamData.js', 'r') as f:
    team_data = f.read()

for original, clean_name in processed_files:
    # Cleanup original name to find the first name
    name_to_match = re.sub(r'(?i) - Executive Student Advisor| Mumbai| Photo| img| Pic', '', original).strip()
    first_name = name_to_match.split()[0]

    # Use regex to find the object in TEAM_MEMBERS
    # We want to insert `image: "/<clean_name>.png"` into the object that has `name: "FirstName ..."`
    # e.g., { id: "...", name: "Siva Priya", role: "...", category: "..." }
    
    # Python regex to find the block for the person
    # Match from `{` until `name: "FirstName..."` and then until `}`
    pattern = re.compile(rf'({{[^}}]*name:\s*["\'][^"\']*?{first_name}[^"\']*?["\'][^}}]*)(}})', re.IGNORECASE)
    
    match = pattern.search(team_data)
    if match:
        block = match.group(1)
        if 'image:' not in block:
            new_block = block + f', image: "/{clean_name}.png" '
            team_data = team_data[:match.start(1)] + new_block + team_data[match.end(1):]
            print(f"Matched {name_to_match} -> {first_name} and added image /{clean_name}.png")
        else:
            print(f"Matched {name_to_match} -> {first_name} but it already has an image.")
    else:
        print(f"Could not find a match for {name_to_match} (first name: {first_name})")

with open('src/data/teamData.js', 'w') as f:
    f.write(team_data)
