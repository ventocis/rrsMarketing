import * as cdk from 'aws-cdk-lib'
import * as r53 from 'aws-cdk-lib/aws-route53'
import { DnsZone } from '@roadreadysafety/cdk-infrastructure/constructs'
import { Construct } from 'constructs'

export interface DnsStackProps extends cdk.StackProps {
    domainName: string
    existingHostedZoneId?: string
}

export class DnsStack extends cdk.Stack {
    public readonly hostedZone: r53.IHostedZone

    constructor(scope: Construct, id: string, props: DnsStackProps) {
        super(scope, id, props)

        const dnsZone = new DnsZone(this, 'DnsZone', {
            zoneName: props.domainName,
            existingHostedZoneId: props.existingHostedZoneId,
        })
        this.hostedZone = dnsZone.hostedZone
    }
}
