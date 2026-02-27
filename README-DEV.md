# Road Ready Safety - Dev Environment

This document describes the development environment setup and deployment process for the Road Ready Safety website.

## 🏗️ **Builds: QA vs production**

The site supports two build modes that control **Texas routes** and **enrollment links**:

| Build | Use for | Texas /texas page | Texas “Start course” / Enroll links |
|-------|--------|--------------------|-------------------------------------|
| **Production** | prod (e.g. roadreadysafety.com) | Off | `/courses/tx-defensive` → affiliate (DTA) |
| **QA** | QA (e.g. qa.roadreadysafety.com) | On | `https://app.qa.roadreadysafety.com/public/checkout?sku=tx-bdi` |

### Commands

- **Production build** (no Texas routes, current prod behavior):
  ```bash
  npm run build:prod
  ```
  Or your usual prod deploy script (e.g. `./deploy-prod.sh`), which should **not** set the Texas env vars below.

- **QA build** (Texas on, enrollment → QA app):
  ```bash
  npm run build:qa
  ```
  This sets `VITE_TEXAS_ROUTES_ENABLED=true` and `VITE_TEXAS_ENROLLMENT_URL=https://app.qa.roadreadysafety.com/public/checkout?sku=tx-bdi` for that build. Use this when deploying to **qa.roadreadysafety.com**.

### Env vars (optional / CI)

If you set env vars in CI or in `.env.local` (see `.env.example`), use:

- **`VITE_TEXAS_ROUTES_ENABLED`** — `true` to enable `/texas` and course-finder → Texas; unset or `false` for prod.
- **`VITE_TEXAS_ENROLLMENT_URL`** — When set, all Texas “Start course” / “Enroll” buttons use this URL (e.g. QA checkout). Leave unset for prod.

Copy `.env.example` to `.env.local` and uncomment/edit as needed for local QA testing.

---

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
- `deploy-dev.sh` - Deployment script for dev environment

## 🚀 **Deployment Process**

### Prerequisites
- AWS CLI configured with appropriate permissions
- Node.js and npm installed
- Access to the dev AWS account

### Quick Deploy
```bash
# Deploy to dev environment
./deploy-dev.sh
```

### Manual Steps (if needed)
```bash
# Build the project
npm run build

# Sync to S3 dev bucket
aws s3 sync dist/ s3://rrs-testaug202025-dev --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id E23C0I4XA6HHPK \
  --paths "/*"
```

## 🔧 **Development Workflow**

1. **Make changes** to the source code
2. **Test locally** with `npm run dev`
3. **Deploy to dev** with `./deploy-dev.sh`
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
