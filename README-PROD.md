# Road Ready Safety - Production Deployment

## Deployment Summary

The Road Ready Safety website has been successfully deployed to AWS using the following infrastructure:

### AWS Resources Created

- **S3 Bucket**: `road-ready-safety-prod-us-east-2-20250824`
  - Region: `us-east-2`
  - Configured for static website hosting
  - Public read access enabled
  - Website endpoint: `http://road-ready-safety-prod-us-east-2-20250824.s3-website.us-east-2.amazonaws.com`

- **CloudFront Distribution**: `EZAJYBMKSTNEH`
  - Domain: `d27d85gzw5gki7.cloudfront.net`
  - HTTPS enabled with automatic redirect
  - Global edge caching
  - SPA routing support (404 → index.html)

### Website URLs

- **Production URL**: https://d27d85gzw5gki7.cloudfront.net
- **S3 Direct URL**: http://road-ready-safety-prod-us-east-2-20250824.s3-website.us-east-2.amazonaws.com

### Deployment Process

1. **Build**: `npm run build` - Creates optimized static files in `dist/` directory
2. **Upload**: Files synced to S3 bucket using `aws s3 sync`
3. **Cache Invalidation**: CloudFront cache invalidated for immediate updates

### Files Created

- `deploy-prod.sh` - Production deployment script
- `cloudfront-update-config-us-east-2.json` - CloudFront distribution configuration
- `bucket-policy-prod-us-east-2.json` - S3 bucket public access policy

### Future Deployments

To deploy updates to production:

```bash
./deploy-prod.sh
```

**Use the production build only.** Do not set `VITE_TEXAS_ROUTES_ENABLED` or `VITE_TEXAS_ENROLLMENT_URL` for prod; the Texas landing page stays off and Texas enrollment uses the existing affiliate (DTA). For QA builds and env vars, see **README-DEV.md** (“Builds: QA vs production”).

This script will:
1. Build the project
2. Sync files to S3
3. Invalidate CloudFront cache
4. Display the production URL

### AWS Profile

All production deployments use the `prod-deploy` AWS profile to ensure proper access controls and billing separation.

### Architecture

```
Internet → CloudFront → S3 Bucket (Static Website Hosting)
```

- **CloudFront**: Provides global CDN, HTTPS, and edge caching
- **S3**: Stores static website files with public read access
- **Route 53** (optional): Can be added for custom domain names

### Security

- S3 bucket configured for public read access only
- CloudFront provides HTTPS termination
- No sensitive data stored in S3 bucket
- Static site architecture reduces attack surface

### Monitoring

- CloudFront provides access logs (currently disabled)
- S3 bucket logging can be enabled if needed
- AWS CloudWatch can be used for monitoring

### Cost Optimization

- CloudFront Price Class: `PriceClass_100` (US, Canada, Europe)
- S3 storage costs minimal for static files
- CloudFront data transfer costs based on usage
