# Road Ready Safety - Dev Environment

This document describes the development environment setup and deployment process for the Road Ready Safety website.

## 🏗️ **Infrastructure**

### AWS Resources
- **S3 Bucket**: `rrs-testaug202025-dev`
- **CloudFront Distribution**: `E23C0I4XA6HHPK`
- **Website URL**: `https://d3nf9vaelf82s8.cloudfront.net`

### Configuration Files
- `cloudfront-config-dev.json` - CloudFront distribution configuration
- `bucket-policy-dev.json` - S3 bucket policy for public access
- `cf-dist-dev.json` - CloudFront distribution details
- `cloudfront-update-config-dev.json` - CloudFront update configuration

## 🚀 **Deployment Process**

### Prerequisites
- AWS CLI configured with appropriate permissions
- Node.js and npm installed
- Access to the dev AWS account

### Quick Deploy
```bash
# Deploy to QA environment via CDK
make deploy ENV=qa
```

## 🔧 **Development Workflow**

1. **Make changes** to the source code
2. **Test locally** with `npm run dev`
3. **Deploy to QA** with `make deploy ENV=qa`
4. **Verify** at `https://d3nf9vaelf82s8.cloudfront.net`

## 📋 **AWS Commands Reference**

### Check S3 Bucket Status
```bash
aws s3 ls | grep rrs-testaug202025
```

### Check CloudFront Distribution Status
```bash
aws cloudfront list-distributions \
  --query "DistributionList.Items[?Comment=='Road Ready Safety Test Site - Dev Environment - August 2025']"
```

### View CloudFront Distribution Details
```bash
aws cloudfront get-distribution --id E23C0I4XA6HHPK
```

### Check S3 Bucket Contents
```bash
aws s3 ls s3://rrs-testaug202025-dev --recursive
```

## 🛠️ **Troubleshooting**

### Common Issues

1. **Build fails**: Check for syntax errors and missing dependencies
2. **S3 sync fails**: Verify AWS credentials and bucket permissions
3. **CloudFront not updating**: Wait for cache invalidation to complete (can take 5-15 minutes)
4. **Website not accessible**: Check CloudFront distribution status and S3 bucket policy

### Useful Debug Commands
```bash
# Check AWS profile
aws sts get-caller-identity

# Test S3 access
aws s3 ls s3://rrs-testaug202025-dev

# Check CloudFront status
aws cloudfront get-distribution --id E23C0I4XA6HHPK --query 'Distribution.Status'
```

## 🔒 **Security Notes**

- The dev S3 bucket has public read access for static website hosting
- CloudFront provides HTTPS and caching
- No sensitive data should be stored in the dev environment
- Use environment variables for any configuration that varies between environments

## 📝 **Notes**

- The dev environment is separate from production
- All configuration files are suffixed with `-dev` for clarity
- The deployment script automatically handles build, sync, and cache invalidation
- CloudFront cache invalidation can take 5-15 minutes to propagate globally
