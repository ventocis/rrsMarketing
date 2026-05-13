import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";
import * as r53 from "aws-cdk-lib/aws-route53";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import { AppEnv } from "@roadreadysafety/cdk-infrastructure/constants";
import { GtmGateway, StaticSite } from "@roadreadysafety/cdk-infrastructure/constructs";

export interface AppStackProps extends cdk.StackProps {
  env: Required<cdk.Environment>;
  appEnv: AppEnv;
  domainName: string;
  hostedZone: r53.IHostedZone;
  certificate: acm.ICertificate;
  bundlePath: string;
  gtmContainerId: string;
}

export class AppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: AppStackProps) {
    super(scope, id, props);

    const site = new StaticSite(this, "Site", {
      siteName: "rrs-marketing",
      domainName: props.domainName,
      hostedZone: props.hostedZone,
      certificate: props.certificate,
      buildOutputPath: props.bundlePath,
      env: props.env,
      isPrerendered: true,
      wwwRedirect: true,
      customErrorConfig: { mode: "static", errorPage: "/404.html" },
    });

    new GtmGateway(this, "GtmGateway", {
      distribution: site.distribution,
      containerId: props.gtmContainerId,
      pathPrefix: "/gtm",
    });
  }
}
