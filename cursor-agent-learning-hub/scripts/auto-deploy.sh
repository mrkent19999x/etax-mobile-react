#!/bin/bash
# Auto Deployment Script

echo "🚀 Auto Deployment - Ultimate Assistant Mode"

PROJECT_NAME=$1
PROJECT_EMAIL=${USER_EMAIL:-"user@email.com"}

if [ -z "$PROJECT_NAME" ]; then
    echo "❌ Project name is required"
    exit 1
fi

echo "📋 Deploying project: $PROJECT_NAME"
echo "📧 Email: $PROJECT_EMAIL"

cd "$PROJECT_NAME"

# Auto-build
echo "🔨 Building project..."
npm run build
if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi

# Auto-test
echo "🧪 Running tests..."
npm run test
if [ $? -eq 0 ]; then
    echo "✅ Tests passed"
else
    echo "❌ Tests failed"
    exit 1
fi

# Auto-deploy
echo "🚀 Deploying to production..."
npm run deploy
if [ $? -eq 0 ]; then
    echo "✅ Deployment successful"
else
    echo "❌ Deployment failed"
    exit 1
fi

# Send notification email
echo "📧 Sending deployment notification to $PROJECT_EMAIL"
echo "Project $PROJECT_NAME has been successfully deployed to production!" | mail -s "Ultimate Assistant: $PROJECT_NAME Deployed" "$PROJECT_EMAIL"

echo "🎉 Project $PROJECT_NAME deployed successfully!"
echo "📧 Notification sent to $PROJECT_EMAIL"
