# Docker/ECR Makefile for basic-driver-improvement-course

# AWS Configuration (override via environment or command line)
AWS_REGION ?= us-east-2
AWS_ACCOUNT_ID ?= $(shell aws sts get-caller-identity --query Account --output text)

GIT_SHA ?= $(shell git rev-parse --short HEAD)

# CI token for accessing private repos (set via environment in CI)
GITHUB_TOKEN ?=

CDK = cd infra && npx cdk
CDK_SYNTH = $(CDK) synth -c gitHash=$(GIT_SHA)
CDK_DEPLOY = $(CDK) deploy --app cdk.out -c gitHash=$(GIT_SHA)

.PHONY: clean build cdk-synth cdk-deploy-shared cdk-deploy-qa deploy configure-git

configure-git:
ifndef GITHUB_TOKEN
	$(error GITHUB_TOKEN is required)
endif
	@echo "configuring git access with token"
	git config --global url."https://x-access-token:$(GITHUB_TOKEN)@github.com/".insteadOf "git@github.com:"
	git config --global url."https://x-access-token:$(GITHUB_TOKEN)@github.com/".insteadOf "ssh://git@github.com/"
	git ls-remote https://x-access-token:$(GITHUB_TOKEN)@github.com/ventocis/rrsInfra.git HEAD > /dev/null 2>&1 && echo "Token has access" || echo "Token cannot access repo"

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

ci: configure-git
ifndef REF
	$(error REF is required. Usage: make ci REF=main)
endif
	npm ci
	cd infra && npm ci
ifeq ($(REF),refs/heads/main)
	$(MAKE) deploy ENV=qa
else
	$(MAKE) build
endif
