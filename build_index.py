# -*- coding: utf-8 -*-
import os

PARTS_DIR = os.path.join(os.path.dirname(__file__), "parts")
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), "index.html")

PART_FILES = [
    "01_head.html",
    "02_header_nav.html",
    "03_view1_overview.html",
    "04_view2_sandbox.html",
    "05_view3_empirical.html",
    "06_view4_balancer.html",
    "07_view5_sniper.html",
    "08_view6_scanner.html",
    "09_view7_faq.html",
    "10_script.js"
]

def build():
    print("Assembling index.html from parts...")
    assembled_content = []
    
    for filename in PART_FILES:
        filepath = os.path.join(PARTS_DIR, filename)
        if not os.path.exists(filepath):
            raise FileNotFoundError(f"Missing part: {filepath}")
        
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
            print(f"  + Added {filename} ({len(content)} chars)")
            assembled_content.append(content)
            
    full_html = "\n".join(assembled_content)
    
    with open(OUTPUT_FILE, "w", encoding="utf-8") as out:
        out.write(full_html)
        
    print(f"Successfully generated {OUTPUT_FILE} ({len(full_html)} chars, {len(full_html.splitlines())} lines).")

if __name__ == "__main__":
    build()
