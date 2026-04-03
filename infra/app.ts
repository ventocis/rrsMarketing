import * as cdk from 'aws-cdk-lib'
import { AppEnv, CdkEnvironments, Constants } from '@roadreadysafety/cdk-infrastructure/constants'
import { applyCdkTags } from '@roadreadysafety/cdk-infrastructure/utils/tagging'
import * as stacks from './stacks'
import path from 'path'

const app = new cdk.App();

const gitRepoName = 'rrsMarketing'

// Configure apps
const defaultConfig = {
    appName: 'rrs-marketing',
    crossRegionReferences: true,
    bundlePath: path.join(__dirname, '../dist'),
}

const appConfig: Record<AppEnv, Omit<stacks.AppStackProps & stacks.CertificateStackProps & stacks.DnsStackProps, 'certificate' | 'hostedZone'>> = {
    [AppEnv.QA]: {
        appEnv: AppEnv.QA,
        env: CdkEnvironments[AppEnv.QA],
        domainName: Constants.environments[AppEnv.QA].rootDomain,
        ...defaultConfig,
    },
    [AppEnv.PROD]: {
        appEnv: AppEnv.PROD,
        env: CdkEnvironments[AppEnv.PROD],
        domainName: Constants.environments[AppEnv.PROD].rootDomain,
        ...defaultConfig,
    },
}

Object.values(AppEnv).forEach(env => {
    const appEnv = env as AppEnv;
    const config = appConfig[appEnv];

    const dnsStack = new stacks.DnsStack(app, `rrsMarketing-dns-${env}`, {
        ...config,
        env: config.env,
    })
    applyCdkTags(dnsStack, env, gitRepoName)

    const certStack = new stacks.CertificateStack(app, `rrsMarketing-certificate-${env}`, {
        ...config,
        hostedZone: dnsStack.hostedZone,
        env: { account: config.env.account, region: 'us-east-1' },
    })
    certStack.addDependency(dnsStack)
    applyCdkTags(certStack, env, gitRepoName)

    const appStack = new stacks.AppStack(app, `rrsMarketing-app-${env}`, {
        ...config,
        env: config.env,
        hostedZone: dnsStack.hostedZone,
        certificate: certStack.certificate,
    })
    applyCdkTags(appStack, env, gitRepoName)
})
