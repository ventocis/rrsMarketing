import { Construct } from 'constructs'
import * as cdk from 'aws-cdk-lib'
import * as acm from 'aws-cdk-lib/aws-certificatemanager'
import { AppEnv } from '@roadreadysafety/cdk-infrastructure/constants'
import * as r53 from 'aws-cdk-lib/aws-route53'

export interface CertificateStackProps extends cdk.StackProps {
    env: cdk.Environment
    appEnv: AppEnv
    domainName: string
    hostedZone: r53.IHostedZone
}

export class CertificateStack extends cdk.Stack {
    public readonly certificate: acm.ICertificate

    constructor(scope: Construct, id: string, props: CertificateStackProps) {
        super(scope, id, props);

        this.certificate = new acm.Certificate(this, 'Certificate', {
            domainName: props.domainName,
            subjectAlternativeNames: [`www.${props.domainName}`],
            validation: acm.CertificateValidation.fromDns(props.hostedZone),
        })
    }
}
