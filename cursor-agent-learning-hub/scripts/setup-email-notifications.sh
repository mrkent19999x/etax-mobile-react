#!/bin/bash
# Email Notifications Setup

echo "📧 Setting up email notifications..."

# Install mailutils if not present
if ! command -v mail &> /dev/null; then
    echo "📦 Installing mailutils..."
    sudo apt-get update
    sudo apt-get install -y mailutils
fi

# Configure email settings
echo "📝 Configuring email settings..."
cat > ~/.mailrc << EOL
set from="$USER_EMAIL"
set smtp="smtp.gmail.com:587"
set smtp-auth-user="$USER_EMAIL"
set smtp-auth-password="your_app_password"
set smtp-auth=login
set ssl-verify=ignore
set nss-config-dir=/etc/ssl/certs
EOL

echo "✅ Email notifications configured"
echo "⚠️  Please update your app password in ~/.mailrc"
