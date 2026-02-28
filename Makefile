AWS_REGION ?= us-east-2

CDK = cd infra && npx cdk
CDK_SYNTH = $(CDK) synth
CDK_DEPLOY = $(CDK) deploy --app cdk.out --require-approval never

.PHONY: clean build deploy

clean:
	rm -rf infra/cdk.out
	rm -rf dist

ifeq ($(ENV),qa)
BUILD_CMD = npm run build:qa
else
BUILD_CMD = npm run build:prod
endif

build:
ifndef ENV
	$(error ENV is required. Usage: make build ENV=qa)
endif
	$(BUILD_CMD)
	$(CDK_SYNTH)

# Usage: make deploy ENV=qa
deploy: build
ifndef ENV
	$(error ENV is required. Usage: make deploy ENV=qa)
endif
	$(CDK_DEPLOY) '*-$(ENV)'
