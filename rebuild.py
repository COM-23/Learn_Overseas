import json

def reconstruct_file(exact_path):
    lines = {}
    with open("/Users/dishik/.gemini/antigravity-ide/brain/fce90668-eca4-4753-b879-36f555b585a3/.system_generated/logs/transcript_full.jsonl") as f:
        for line in f:
            try:
                data = json.loads(line)
                if data.get("type") == "VIEW_FILE" and exact_path in data.get("content", ""):
                    content = data["content"]
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
                                lines[int(parts[0])] = parts[1]
                
                if data.get("type") == "PLANNER_RESPONSE" and "tool_calls" in data:
                    for tc in data["tool_calls"]:
                        if tc["name"] in ["replace_file_content", "multi_replace_file_content", "write_to_file"]:
                            # check if this edit matches the file path precisely
                            args = str(tc.get("args", ""))
                            if exact_path.split("/")[-1] in args:
                                return lines
            except Exception as e:
                pass
    return lines

home_lines = reconstruct_file("file:///Users/dishik/Downloads/Internship%20/Learn%20Overseas/src/pages/Home.jsx")
with open("Home_original.jsx", "w") as f:
    for i in range(1, max(home_lines.keys()) + 1 if home_lines else 1):
        f.write(home_lines.get(i, "") + "\n")

grad_lines = reconstruct_file("file:///Users/dishik/Downloads/Internship%20/Learn%20Overseas/src/components/GraduationScene.jsx")
with open("Grad_original.jsx", "w") as f:
    for i in range(1, max(grad_lines.keys()) + 1 if grad_lines else 1):
        f.write(grad_lines.get(i, "") + "\n")

print(f"Home.jsx extracted {len(home_lines)} lines")
print(f"GraduationScene.jsx extracted {len(grad_lines)} lines")
