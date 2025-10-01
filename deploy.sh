#!/bin/bash

# Smart Budget Recommendation - Deployment Script
# This script can be used for manual deployment or as a reference

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Smart Budget Deployment Script${NC}"
echo -e "${GREEN}========================================${NC}\n"

# Configuration (can be overridden by environment variables)
DEPLOY_PATH="${DEPLOY_PATH:-/var/www/smart-budget}"
BACKUP_DIR="${BACKUP_DIR:-${DEPLOY_PATH}/backups}"
BUILD_DIR="dist"

# Function to print colored messages
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running on server or local
if [ "$1" == "local" ]; then
    print_info "Running local build..."

    # Install dependencies
    print_info "Installing dependencies..."
    npm ci

    # Run linter
    print_info "Running linter..."
    npm run lint

    # Build production bundle
    print_info "Building production bundle..."
    npm run build

    # Create tarball
    print_info "Creating deployment package..."
    tar -czf dist.tar.gz dist/

    print_info "Build completed! Package: dist.tar.gz"
    print_info "Upload this to your server and run: ./deploy.sh server"

elif [ "$1" == "server" ]; then
    print_info "Deploying on server..."

    # Check if dist.tar.gz exists
    if [ ! -f "dist.tar.gz" ]; then
        print_error "dist.tar.gz not found! Please upload the build package first."
        exit 1
    fi

    # Create backup directory if it doesn't exist
    mkdir -p "$BACKUP_DIR"

    # Backup current deployment
    if [ -d "$DEPLOY_PATH/$BUILD_DIR" ]; then
        BACKUP_NAME="backup_$(date +%Y%m%d_%H%M%S).tar.gz"
        print_info "Creating backup: $BACKUP_NAME"
        tar -czf "$BACKUP_DIR/$BACKUP_NAME" -C "$DEPLOY_PATH" "$BUILD_DIR"

        # Keep only last 5 backups
        cd "$BACKUP_DIR"
        ls -t backup_*.tar.gz | tail -n +6 | xargs -r rm
        cd - > /dev/null
    fi

    # Remove old dist
    if [ -d "$DEPLOY_PATH/$BUILD_DIR" ]; then
        print_info "Removing old deployment..."
        rm -rf "$DEPLOY_PATH/$BUILD_DIR"
    fi

    # Extract new build
    print_info "Extracting new build..."
    tar -xzf dist.tar.gz -C "$DEPLOY_PATH"

    # Set permissions
    print_info "Setting permissions..."
    chmod -R 755 "$DEPLOY_PATH/$BUILD_DIR"

    # Cleanup
    rm -f dist.tar.gz

    print_info "Deployment completed successfully!"

    # Optional: Reload web server
    if command -v systemctl &> /dev/null; then
        print_warning "Don't forget to reload your web server if needed:"
        echo "  sudo systemctl reload nginx"
        echo "  sudo systemctl reload apache2"
    fi

else
    print_error "Usage: $0 [local|server]"
    echo ""
    echo "Examples:"
    echo "  $0 local   # Build locally and create deployment package"
    echo "  $0 server  # Deploy on server from dist.tar.gz"
    echo ""
    echo "Environment variables:"
    echo "  DEPLOY_PATH    # Deployment path (default: /var/www/smart-budget)"
    echo "  BACKUP_DIR     # Backup directory (default: \$DEPLOY_PATH/backups)"
    exit 1
fi

echo -e "\n${GREEN}========================================${NC}"
echo -e "${GREEN}Done!${NC}"
echo -e "${GREEN}========================================${NC}"
