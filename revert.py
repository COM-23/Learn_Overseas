import json
import sys

def run():
    edits = []
    with open("/Users/dishik/.gemini/antigravity-ide/brain/fce90668-eca4-4753-b879-36f555b585a3/.system_generated/logs/transcript_full.jsonl") as f:
        for line in f:
            try:
                data = json.loads(line)
                if data.get("type") == "PLANNER_RESPONSE" and "tool_calls" in data:
                    for tc in data["tool_calls"]:
                        if tc["name"] in ["replace_file_content", "multi_replace_file_content"]:
                            edits.append(tc)
                # Also check if there was a write_to_file?
                if data.get("type") == "PLANNER_RESPONSE" and "tool_calls" in data:
                    for tc in data["tool_calls"]:
                        if tc["name"] == "write_to_file":
                            edits.append(tc)
            except Exception:
                pass
    
    # Let's print out the sequence of edits for GraduationScene.jsx
    grad_edits = [e for e in edits if "GraduationScene" in str(e)]
    home_edits = [e for e in edits if "Home.jsx" in str(e)]
    
    print(f"Found {len(grad_edits)} edits for GraduationScene")
    print(f"Found {len(home_edits)} edits for Home.jsx")
    
    with open("edits.json", "w") as out:
        json.dump({"grad": grad_edits, "home": home_edits}, out, indent=2)

run()
