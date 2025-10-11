import os
import glob
import yaml

# Adjust this to point at your Quartz content folder
CONTENT_DIR = "content"

def extract_tags_from_file(path):
    with open(path, "r", encoding="utf-8") as f:
        text = f.read()

    if text.startswith("---"):
        parts = text.split("---", 2)
        if len(parts) > 2:
            frontmatter = parts[1]
            try:
                data = yaml.safe_load(frontmatter)
                if isinstance(data, dict) and "tags" in data:
                    tags = data.get("tags")
                    if isinstance(tags, list):
                        return tags
                    elif isinstance(tags, str):
                        return [tags]
            except Exception as e:
                print(f"⚠️ YAML parse error in {path}: {e}")
    return []   # always return a list, not None

def main():
    tag_counts = {}
    # Scan all markdown files
    for filepath in glob.glob(os.path.join(CONTENT_DIR, "**", "*.md"), recursive=True):
        tags = extract_tags_from_file(filepath)
        for tag in tags:
            t = str(tag).strip()
            if not t:
                continue
            tag_counts[t] = tag_counts.get(t, 0) + 1

    sorted_tags = sorted(tag_counts.items(), key=lambda x: x[1], reverse=True)

    print(f"Total unique tags: {len(sorted_tags)}")
    print(f"Total tag uses: {sum(tag_counts.values())}\n")
    for tag, count in sorted_tags:
        print(f"{tag}\t{count}")

if __name__ == "__main__":
    main()
