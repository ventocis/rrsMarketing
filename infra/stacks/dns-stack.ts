import * as cdk from 'aws-cdk-lib'
import * as r53 from 'aws-cdk-lib/aws-route53'
import { Construct } from 'constructs'

export interface DnsStackProps extends cdk.StackProps {
    domainName: string
}

export class DnsStack extends cdk.Stack {
    public readonly hostedZone: r53.IHostedZone

    constructor(scope: Construct, id: string, props: DnsStackProps) {
        super(scope, id, props)

        this.hostedZone = r53.HostedZone.fromLookup(this, 'HostedZone', {
            domainName: props.domainName,
            privateZone: false,
        })
    }
}
