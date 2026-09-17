import os
import re

directory = '/Users/dishik/Downloads/Internship /Learn Overseas/src'

for root, dirs, files in os.walk(directory):
    for file in files:
        if file.endswith(('.jsx', '.js', '.css')):
            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                content = f.read()
            
            new_content = re.sub(r'backdropFilter:\s*[\'"].*?[\'"]\s*,?\s*', '', content)
            new_content = re.sub(r'WebkitBackdropFilter:\s*[\'"].*?[\'"]\s*,?\s*', '', new_content)
            new_content = re.sub(r'backdropFilter:\s*[^,]+,?\s*', '', new_content)
            new_content = re.sub(r'WebkitBackdropFilter:\s*[^,]+,?\s*', '', new_content)
            new_content = re.sub(r'backdrop-filter:\s*[^;]+;\s*', '', new_content)
            new_content = re.sub(r'-webkit-backdrop-filter:\s*[^;]+;\s*', '', new_content)

            if new_content != content:
                with open(filepath, 'w') as f:
                    f.write(new_content)
                print(f"Fixed {filepath}")
