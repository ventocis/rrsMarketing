import { Construct } from 'constructs'
import * as cdk from 'aws-cdk-lib'
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch'
import * as cloudwatch_actions from 'aws-cdk-lib/aws-cloudwatch-actions'
import * as sns from 'aws-cdk-lib/aws-sns'
import { AppEnv, Constants } from '@roadreadysafety/cdk-infrastructure/constants'

export interface MonitoringStackProps extends cdk.StackProps {
    env: Required<cdk.Environment>
    appEnv: AppEnv
    distributionId: string
}

export class MonitoringStack extends cdk.Stack {

    constructor(scope: Construct, id: string, props: MonitoringStackProps) {
        super(scope, id, props)

        const monitoringTopicArn = Constants.monitoringTopicArnFor(props.env.account, props.env.region)
        const monitoringTopic = sns.Topic.fromTopicAttributes(this, 'MonitoringTopic', {
            topicArn: monitoringTopicArn,
        })

        const totalErrorRate = new cloudwatch.Metric({
            namespace: 'AWS/CloudFront',
            metricName: 'TotalErrorRate',
            dimensionsMap: {
                DistributionId: props.distributionId,
                Region: 'Global',
            },
            statistic: 'Average',
            period: cdk.Duration.minutes(5),
        })

        const alarm = new cloudwatch.Alarm(this, 'TotalErrorRateAlarm', {
            alarmName: `rrsMarketing-cloudfront-${props.appEnv}-TotalErrorRate`,
            alarmDescription: `CloudFront TotalErrorRate alarm for rrsMarketing ${props.appEnv}`,
            metric: totalErrorRate,
            threshold: 5,
            evaluationPeriods: 3,
            comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
            treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING,
        })

        const snsAction = new cloudwatch_actions.SnsAction(monitoringTopic)
        alarm.addAlarmAction(snsAction)
        alarm.addOkAction(snsAction)
    }
}
