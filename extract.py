import json

found_lines = {}
with open("/Users/dishik/.gemini/antigravity-ide/brain/fce90668-eca4-4753-b879-36f555b585a3/.system_generated/logs/transcript_full.jsonl") as f:
    for line in f:
        try:
            data = json.loads(line)
            if data.get("type") == "VIEW_FILE" and "GraduationScene.jsx" in data.get("content", ""):
                content = data["content"]
                # parse the lines
                in_lines = False
                for c_line in content.split("\n"):
                    if c_line.startswith("The following code has been modified"):
                        in_lines = True
                        continue
                    if c_line.startswith("The above content does NOT show"):
                        in_lines = False
                        continue
                    if in_lines and ": " in c_line:
                        parts = c_line.split(": ", 1)
                        if parts[0].isdigit():
                            found_lines[int(parts[0])] = parts[1]
        except Exception as e:
            pass

with open("original_graduation.jsx", "w") as f:
    for i in range(1, max(found_lines.keys()) + 1 if found_lines else 1):
        f.write(found_lines.get(i, "") + "\n")
print(f"Extracted {len(found_lines)} lines")
