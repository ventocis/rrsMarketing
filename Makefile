# Docker/ECR Makefile for basic-driver-improvement-course

# AWS Configuration (override via environment or command line)
AWS_REGION ?= us-east-2
AWS_ACCOUNT_ID ?= $(shell aws sts get-caller-identity --query Account --output text)

GIT_SHA ?= $(shell git rev-parse --short HEAD)

CDK = cd infra && npx cdk
CDK_SYNTH = $(CDK) synth -c gitHash=$(GIT_SHA)
CDK_DEPLOY = $(CDK) deploy --app cdk.out -c gitHash=$(GIT_SHA) --require-approval never

.PHONY: clean build cdk-synth cdk-deploy-shared cdk-deploy-qa deploy

clean:
	rm -rf infra/cdk.out
	rm -rf .output

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

ci:
	npm ci
	cd infra && npm ci
ifeq ($(DEPLOY),qa)
	$(MAKE) deploy ENV=qa
else ifeq ($(DEPLOY),prod)
	$(MAKE) deploy ENV=prod
else
	$(MAKE) build
endif

# run from cli to release a new version
publish:
ifndef V
	$(error V is required. Usage: make publish V=0.3.4)
endif
	git tag v$(V) && git push origin v$(V)