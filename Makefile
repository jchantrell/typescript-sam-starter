#!/bin/bash

# make deploy env=dev

PARAMS = $(shell jq -r '.[] | "\(.key)=\(.value)"' config/environment/$(env).json)
STACK_NAME = $(shell jq '.[] | select(.key=="StackName") | .value' config/environment/$(env).json)-$(env)
S3_BUCKET = $(shell jq '.[] | select(.key=="S3Bucket") | .value' config/environment/$(env).json)
S3_PREFIX = $(shell jq '.[] | select(.key=="S3Prefix") | .value' config/environment/$(env).json)

deploy:
	@echo "Building stack..."
	@sam build
	@echo "Deploying stack: $(STACK_NAME)"
	@sam deploy \
	 	--config-env $(env) \
	 	--stack-name $(STACK_NAME) \
	 	--capabilities CAPABILITY_NAMED_IAM \
	 	--s3-bucket $(S3_BUCKET) \
	 	--s3-prefix $(S3_PREFIX) \
	 	--parameter-overrides $(PARAMS)

test:
	npm ci
	npm run test

build-ExampleFunction:
	$(MAKE) HANDLER=src/handlers/example.ts build-lambda-common

build-lambda-common:
	npm ci
	rm -rf dist
	echo "{\"extends\": \"./tsconfig.json\", \"include\": [\"${HANDLER}\"] }" > tsconfig-only-handler.json
	npm run build -- --build tsconfig-only-handler.json
	cp -r dist "$(ARTIFACTS_DIR)/"

build-DependencyLayer:
	mkdir -p "$(ARTIFACTS_DIR)/nodejs"
	cp package.json package-lock.json "$(ARTIFACTS_DIR)/nodejs/"
	npm ci --production --prefix "$(ARTIFACTS_DIR)/nodejs/"
	rm "$(ARTIFACTS_DIR)/nodejs/package.json"
