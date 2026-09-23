import os
import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Replace width: '100vw' or width: 100vw with width: 100% (careful with quotes)
    new_content = re.sub(r'width\s*:\s*[\'"]100vw[\'"]', 'width: \'100%\'', content)
    new_content = re.sub(r'width\s*:\s*100vw\b', 'width: 100%', new_content)
    
    new_content = re.sub(r'max-width\s*:\s*[\'"]100vw[\'"]', 'maxWidth: \'100%\'', new_content)
    new_content = re.sub(r'max-width\s*:\s*100vw\b', 'max-width: 100%', new_content)

    if content != new_content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Fixed {filepath}")

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith(('.js', '.jsx', '.css')):
            process_file(os.path.join(root, file))
