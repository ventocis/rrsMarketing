AWS_REGION ?= us-east-2

CDK = cd infra && npx cdk
CDK_SYNTH = $(CDK) synth
CDK_DEPLOY = $(CDK) deploy --app cdk.out --require-approval never

.PHONY: clean build deploy

clean:
	rm -rf infra/cdk.out
	rm -rf dist

dist:
	npm run build

infra/cdk.out: dist
	$(CDK_SYNTH)

build: infra/cdk.out

# Usage: make deploy ENV=qa
deploy: build
ifndef ENV
	$(error ENV is required. Usage: make deploy ENV=qa)
endif
	$(CDK_DEPLOY) '*-$(ENV)'