import { Construct } from 'constructs'
import * as acm from 'aws-cdk-lib/aws-certificatemanager'
import * as cdk from 'aws-cdk-lib'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import * as targets from 'aws-cdk-lib/aws-route53-targets'
import * as r53 from 'aws-cdk-lib/aws-route53'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment'
import { AppEnv, EnvironmentConstants } from '@roadreadysafety/cdk-infrastructure/constants'
import { HostedZone } from 'aws-cdk-lib/aws-route53'
import * as utils from '@roadreadysafety/cdk-infrastructure/utils'

export interface CloudfrontCertificateStackProps extends cdk.StackProps, EnvironmentConstants {
    env: Required<cdk.Environment>,
    appEnv: AppEnv,
    bundlePath: string,
}

/**
 * The purpose of this stack is to create a certificate for Cloudfront distribution.
 * The certificate is created in us-east-1 and exported to the root stack for use in other stacks.
 */
export class CloudfrontCertificateStack extends cdk.Stack {

    public readonly distributionId: string

    constructor(scope: Construct, id: string, props: CloudfrontCertificateStackProps) {
        super(scope, id, props);

        // We need to look up the zone here to validate the cert
        const zone = HostedZone.fromLookup(this, 'HostedZone', {
            domainName: props.rootDomain,
            privateZone: false,
        })
        const validation = acm.CertificateValidation.fromDns(zone)

        const certificate = new acm.Certificate(this, 'Certificate', {
            domainName: props.rootDomain,
            validation,
        })

        const regionAbbrev = utils.regionToShort(props.env.region)
        const bucket = new s3.Bucket(this, 'RrsUiBucket', {
            bucketName: `rrsui-app-${props.env.account}-${regionAbbrev}`,
            publicReadAccess: false,
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
        });

        const distribution = new cloudfront.Distribution(this, 'RrsUiDistribution', {
            certificate,
            domainNames: [props.rootDomain],
            defaultRootObject: 'index.html',
            defaultBehavior: {
                origin: origins.S3BucketOrigin.withOriginAccessControl(bucket),
                viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                compress: true,
            },
            errorResponses: [
                { httpStatus: 403, responseHttpStatus: 200, responsePagePath: '/index.html' },
                { httpStatus: 404, responseHttpStatus: 200, responsePagePath: '/index.html' },
            ],
        })

        this.distributionId = distribution.distributionId

        new r53.ARecord(this, 'UiAliasRecord', {
            zone,
            recordName: props.rootDomain,
            target: r53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
        })

        new s3deploy.BucketDeployment(this, 'DeployUi', {
            sources: [s3deploy.Source.asset(props.bundlePath)],
            destinationBucket: bucket,
            distribution, // Invalidate CloudFront cache after deployment
            distributionPaths: ['/*'],
            prune: true,
            exclude: ['banner.json'],
        })
    }
}