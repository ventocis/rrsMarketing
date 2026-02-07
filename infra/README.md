# rrsMarketing/infra

Directory contains CDK code to manage and deploy the application.

## NPM Configuration

You will need to be authenticated into shared account and run the following command to 
pull from the NPM registry:

```
export CODEARTIFACT_AUTH_TOKEN=`aws codeartifact get-authorization-token --domain roadreadysafety --domain-owner 632757408528 --region us-east-2 --query authorizationToken --output text`
```