import * as cdk from 'aws-cdk-lib/core'
import { AppEnv, CdkEnvironments, Constants } from '@roadreadysafety/cdk-infrastructure/constants'
import { applyCdkTags } from '@roadreadysafety/cdk-infrastructure/utils/tagging'
import * as stacks from './stacks'
import path from 'path'

const app = new cdk.App();

const gitRepoName = 'rrsMarketing'
const gitHash = app.node.tryGetContext('gitHash')

// Configure apps
const defaultConfig = {
    appName: 'rrs-marketing',
    crossRegionReferences: true,
    bundlePath: path.join(__dirname, '../dist'),
}

const appConfig: Record<AppEnv, stacks.CloudfrontCertificateStackProps> = {
    [AppEnv.QA]: {
        appEnv: AppEnv.QA,
        env: CdkEnvironments[AppEnv.QA],
        ...Constants.environments[AppEnv.QA],
        ...defaultConfig,
    },
    [AppEnv.PROD]: {
        appEnv: AppEnv.PROD,
        env: CdkEnvironments[AppEnv.PROD],
        ...Constants.environments[AppEnv.PROD],
        ...defaultConfig,
    },
}

Object.values(AppEnv).forEach(env => {
    const config = appConfig[env]
    const cloudfrontCertStack = new stacks.CloudfrontCertificateStack(app, `rrsMarketing-cloudfront-${env}`, {
        ...config,
        ...{
            env: {account: config.env.account, region: 'us-east-1'},
        },
    })
    applyCdkTags(cloudfrontCertStack, env, gitRepoName, gitHash)
})
