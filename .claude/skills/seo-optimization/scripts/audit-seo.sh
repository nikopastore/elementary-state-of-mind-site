#!/bin/bash
# SEO Audit Script
# Scans project for missing SEO elements

set -e

echo "=== SEO Audit ==="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track issues
ISSUES=0

# 1. Check for llms.txt (CRITICAL)
echo "Checking llms.txt..."
if [ -f "public/llms.txt" ] || [ -f "static/llms.txt" ] || [ -f "llms.txt" ]; then
    echo -e "${GREEN}✓ llms.txt found${NC}"
else
    echo -e "${RED}✗ llms.txt MISSING (CRITICAL for LLM discoverability)${NC}"
    ISSUES=$((ISSUES + 1))
fi
echo ""

# 2. Check for robots.txt
echo "Checking robots.txt..."
if [ -f "public/robots.txt" ] || [ -f "static/robots.txt" ] || [ -f "robots.txt" ]; then
    ROBOTS_FILE=$(find . -name "robots.txt" -type f | head -n 1)
    echo -e "${GREEN}✓ robots.txt found${NC}"

    # Check if it allows LLM bots
    if grep -q "GPTBot\|CCBot\|anthropic-ai\|Claude-Web" "$ROBOTS_FILE"; then
        echo -e "${GREEN}  ✓ Allows LLM bots${NC}"
    else
        echo -e "${YELLOW}  ⚠ Consider allowing LLM bots (GPTBot, CCBot, anthropic-ai)${NC}"
    fi
else
    echo -e "${RED}✗ robots.txt missing${NC}"
    ISSUES=$((ISSUES + 1))
fi
echo ""

# 3. Check for sitemap
echo "Checking sitemap..."
if [ -f "public/sitemap.xml" ] || [ -f "app/sitemap.ts" ] || [ -f "src/app/sitemap.ts" ] || find . -name "sitemap.*" -type f | grep -q .; then
    echo -e "${GREEN}✓ Sitemap found${NC}"
else
    echo -e "${RED}✗ Sitemap missing${NC}"
    ISSUES=$((ISSUES + 1))
fi
echo ""

# 4. Check for structured data (JSON-LD)
echo "Checking structured data..."
if grep -r "application/ld+json" --include="*.tsx" --include="*.ts" --include="*.jsx" --include="*.js" --include="*.html" . 2>/dev/null | head -n 1 > /dev/null; then
    echo -e "${GREEN}✓ JSON-LD structured data found${NC}"
    COUNT=$(grep -r "application/ld+json" --include="*.tsx" --include="*.ts" --include="*.jsx" --include="*.js" --include="*.html" . 2>/dev/null | wc -l)
    echo "  Found $COUNT occurrences"
else
    echo -e "${YELLOW}⚠ No JSON-LD structured data found${NC}"
fi
echo ""

# 5. Check for meta tags in key files
echo "Checking meta tags..."
if [ -d "src/app" ]; then
    # Next.js app router
    if grep -r "export.*metadata" src/app --include="*.tsx" --include="*.ts" | head -n 1 > /dev/null; then
        echo -e "${GREEN}✓ Metadata exports found (Next.js)${NC}"
    else
        echo -e "${YELLOW}⚠ No metadata exports found${NC}"
    fi
elif [ -d "pages" ]; then
    # Next.js pages router or other frameworks
    if grep -r "<meta" pages --include="*.tsx" --include="*.jsx" | head -n 1 > /dev/null; then
        echo -e "${GREEN}✓ Meta tags found${NC}"
    else
        echo -e "${YELLOW}⚠ No meta tags found${NC}"
    fi
fi
echo ""

# Summary
echo "=== Audit Summary ==="
if [ $ISSUES -eq 0 ]; then
    echo -e "${GREEN}All critical SEO elements present!${NC}"
else
    echo -e "${RED}Found $ISSUES critical issues${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Run: ./scripts/generate-llms-txt.sh (if missing)"
    echo "2. Add robots.txt with LLM bot allowances"
    echo "3. Generate sitemap (framework-specific)"
    echo "4. Add structured data with generate-json-ld.js"
fi
