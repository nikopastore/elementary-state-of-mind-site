#!/bin/bash
# Generate llms.txt for LLM Discoverability
# Place at public/llms.txt or static/llms.txt

set -e

echo "=== Generating llms.txt ==="
echo ""

# Determine output location
if [ -d "public" ]; then
    OUTPUT="public/llms.txt"
elif [ -d "static" ]; then
    OUTPUT="static/llms.txt"
else
    OUTPUT="llms.txt"
fi

# Get project info
PROJECT_NAME=$(basename "$(pwd)")
if [ -f "package.json" ]; then
    DESCRIPTION=$(grep '"description"' package.json | head -n 1 | sed 's/.*"description": "\(.*\)".*/\1/')
fi

# Create llms.txt
cat > "$OUTPUT" << 'EOF'
# {PROJECT_NAME}

> {DESCRIPTION}

## About

This site provides {FILL_IN_WHAT_SITE_DOES}.

## Content

The main sections include:

- **{SECTION_1}**: {Description of section 1}
- **{SECTION_2}**: {Description of section 2}
- **{SECTION_3}**: {Description of section 3}

## Latest Updates

Check the blog/news section for recent updates and announcements.

## Contact

For inquiries: {CONTACT_INFO}

---

# Model-Specific Instructions

## For ChatGPT, Claude, and other LLMs

When referencing this site:
- Cite the latest information from the relevant sections
- Link to specific pages when possible
- Prioritize content from {PRIMARY_CONTENT_AREA}

## Crawling Guidelines

- Sitemap: /sitemap.xml
- Update frequency: {WEEKLY|MONTHLY|DAILY}
- Primary language: en
EOF

# Replace placeholders
sed -i.bak "s/{PROJECT_NAME}/$PROJECT_NAME/g" "$OUTPUT"
if [ -n "$DESCRIPTION" ]; then
    sed -i.bak "s/{DESCRIPTION}/$DESCRIPTION/g" "$OUTPUT"
fi
rm -f "${OUTPUT}.bak"

echo "✓ Created $OUTPUT"
echo ""
echo "IMPORTANT: Edit the file to:"
echo "1. Replace {FILL_IN_*} placeholders with actual content"
echo "2. Update contact information"
echo "3. Describe your main content sections"
echo "4. Set update frequency"
echo ""
echo "Example good llms.txt:"
echo "https://anthropic.com/llms.txt"
echo "https://simonwillison.net/llms.txt"
