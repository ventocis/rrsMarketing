#!/bin/bash

# Deployment script for Road Ready Safety Test Site - Production Environment
# This script builds the project and syncs it to S3 production bucket

set -e  # Exit on any error

echo "🚀 Starting production deployment..."

# Build the project
echo "📦 Building the project..."
npm run build:prod

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Build failed - dist directory not found"
    exit 1
fi

echo "✅ Build completed successfully"

# Sync to S3 Production Bucket
echo "☁️  Syncing to S3 Production Bucket..."
aws s3 sync dist/ s3://road-ready-safety-prod-us-east-2-20250824 --delete --profile prod-deploy

echo "✅ Deployment completed successfully!"

# Invalidate CloudFront cache
echo "🔄 Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id EZAJYBMKSTNEH --paths "/*" --profile prod-deploy

echo "🎉 Deployment and cache invalidation completed!"

# Get and display the website URL
echo "🌐 The URL for the production website is https://d27d85gzw5gki7.cloudfront.net"

echo "📋 Deployment Summary:"
echo "   - S3 Bucket: road-ready-safety-prod-us-east-2-20250824"
echo "   - CloudFront Distribution ID: EZAJYBMKSTNEH"
echo "   - CloudFront Domain: d27d85gzw5gki7.cloudfront.net"
