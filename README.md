## Prereqs
- Node 20
- AWS CLI
- AWS SAM CLI
- jq 

## How to use
You can deploy the stack using the CLI command `make deploy env={env}` where `env` correlates to a JSON file in the `config/environment` directory. This file contains environment specific parameters on the stack, which are passed into the deploy command via `jq`.

Each lambda function defined in the stack should have their Metadata > BuildMethod set to `makefile`. When running `make deploy` (which is wrapping `sam build && sam deploy`) this builds the resource by seeking out a make command related to the resource's name, e.g. `make build-{resourceName}` and allows us to handle packaging ourselves. The main benefit to doing things this way is we can do a granular package per lambda and build the shared lambda layer at the same time (which keeps each resource's total package size incredibly small in AWS). See line 23-28 in `template.yaml` and line 26 in `Makefile` to understand the relationship between lambda and build command.
