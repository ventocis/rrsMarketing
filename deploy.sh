#!/bin/bash

# Deployment script for Road Ready Safety Test Site
# This script builds the project and syncs it to S3

set -e  # Exit on any error

echo "🚀 Starting deployment..."

# Build the project
echo "📦 Building the project..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Build failed - dist directory not found"
    exit 1
fi

echo "✅ Build completed successfully"

# Sync to S3
echo "☁️  Syncing to S3..."
aws s3 sync dist/ s3://rrs-testaug202025 --delete

echo "✅ Deployment completed successfully!"

# Optional: Invalidate CloudFront cache
echo "🔄 Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id $(aws cloudfront list-distributions --query "DistributionList.Items[?Comment=='Road Ready Safety Test Site - August 2025'].Id" --output text) --paths "/*"

echo "🎉 Deployment and cache invalidation completed!"

# Get and display the website URL
echo "🌐 The URL for the website is https://$(aws cloudfront list-distributions --query "DistributionList.Items[?Comment=='Road Ready Safety Test Site - August 2025'].DomainName" --output text)"
