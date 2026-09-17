import json

def extract_file(target_file, out_file):
    lines_by_num = {}
    with open("/Users/dishik/.gemini/antigravity-ide/brain/fce90668-eca4-4753-b879-36f555b585a3/.system_generated/logs/transcript_full.jsonl") as f:
        for line in f:
            try:
                data = json.loads(line)
                if data.get("type") == "VIEW_FILE" and target_file in data.get("content", ""):
                    content = data["content"]
                    in_lines = False
                    # Only parse the earliest VIEW_FILE event's blocks?
                    # No, we might have viewed different parts of the file over time.
                    # BUT wait, what if I edited it and THEN viewed it?
                    # I should only take lines from before the FIRST replace_file_content for this file.
            except Exception as e:
                pass

extract_file("GraduationScene.jsx", "grad_orig.jsx")
