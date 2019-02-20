# Makefile

# Chosing global install with yarn or npm
init:
	@[ "${MODE}" ] || (echo ">> MODE is not set"; exit 1)
ifeq ($(MODE), yarn)
	@yarn global add @quasar/cli
	@yarn
else
	@npm install -g @quasar/cli
	@yarn
endif

dev:
	@echo "Starting development mode..."
	@quasar dev

lint:
	@yarn eslint --ext .js,.vue src
	@yarn tslint --project tsconfig.json

lint-fix:
	@yarn eslint --ext .js,.vue src --fix
	@yarn tslint --project tsconfig.json --fix

# Generate contract from template
contract:
	@[ "${CONTRACT}" ] || (echo ">> CONTRACT is not set"; exit 1)
	@echo "creating contract ${CONTRACT}"
	@cp -r templates/contracts/contract src/contracts/contract/${CONTRACT}

lighthouse: 
	@quasar serve dist/pwa &
	@yarn audit:lighthouse