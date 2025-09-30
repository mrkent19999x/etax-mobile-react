#!/bin/bash
# GitHub Upload Script for Cursor Agent Learning Hub
# Anh cần thay GITHUB_TOKEN bằng token thật của anh

echo "🚀 Uploading Cursor Agent Learning Hub to GitHub..."

# Thay token này bằng token GitHub thật của anh
GITHUB_TOKEN="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"
REPO_OWNER="mrkent19999x"
REPO_NAME="Mcp-server-collection"
BRANCH="cursor-agent-learning-hub"

# Tạo branch mới trên GitHub
echo "📋 Creating branch: $BRANCH"
curl -H "Authorization: token $GITHUB_TOKEN" \
     -X POST \
     -H "Accept: application/vnd.github.v3+json" \
     "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/git/refs" \
     -d "{\"ref\": \"refs/heads/$BRANCH\", \"sha\": \"$(curl -H \"Authorization: token $GITHUB_TOKEN\" https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/git/refs/heads/main | jq -r '.object.sha')\"}"

# Upload README.md
echo "📄 Uploading README.md..."
README_CONTENT=$(cat README.md | base64 -w 0)
curl -H "Authorization: token $GITHUB_TOKEN" \
     -X PUT \
     -H "Accept: application/vnd.github.v3+json" \
     "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/contents/cursor-agent-learning-hub/README.md" \
     -d "{\"message\": \"Add Cursor Agent Learning Hub README\", \"content\": \"$README_CONTENT\", \"branch\": \"$BRANCH\"}"

# Upload configs
echo "⚙️ Uploading configs..."
for file in configs/*; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        echo "  - Uploading $filename..."
        content=$(cat "$file" | base64 -w 0)
        curl -H "Authorization: token $GITHUB_TOKEN" \
             -X PUT \
             -H "Accept: application/vnd.github.v3+json" \
             "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/contents/cursor-agent-learning-hub/$file" \
             -d "{\"message\": \"Add $filename\", \"content\": \"$content\", \"branch\": \"$BRANCH\"}"
    fi
done

# Upload scripts
echo "🔧 Uploading scripts..."
for file in scripts/*; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        echo "  - Uploading $filename..."
        content=$(cat "$file" | base64 -w 0)
        curl -H "Authorization: token $GITHUB_TOKEN" \
             -X PUT \
             -H "Accept: application/vnd.github.v3+json" \
             "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/contents/cursor-agent-learning-hub/$file" \
             -d "{\"message\": \"Add $filename\", \"content\": \"$content\", \"branch\": \"$BRANCH\"}"
    fi
done

# Upload docs
echo "📚 Uploading docs..."
for file in docs/*; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        echo "  - Uploading $filename..."
        content=$(cat "$file" | base64 -w 0)
        curl -H "Authorization: token $GITHUB_TOKEN" \
             -X PUT \
             -H "Accept: application/vnd.github.v3+json" \
             "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/contents/cursor-agent-learning-hub/$file" \
             -d "{\"message\": \"Add $filename\", \"content\": \"$content\", \"branch\": \"$BRANCH\"}"
    fi
done

echo "🎉 Upload completed!"
echo "📋 Repository: https://github.com/$REPO_OWNER/$REPO_NAME/tree/$BRANCH"
echo "📧 All notifications will be sent to: begau1302@gmail.com"