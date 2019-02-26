# Makefile

# Chosing global install with yarn or npm
init:
	@[ "${MODE}" ] || (echo ">> MODE is not set"; exit 1)
ifeq ($(MODE), yarn)
	@yarn global add @quasar/cli snyk snyk-to-html
	@yarn
else
	@npm install -g @quasar/cli snyk snyk-to-html
	@yarn
endif

dev:
	@echo "Starting development mode..."
	@quasar dev

lint:
	@yarn eslint --ext .js,.vue,.ts src

lint-fix:
	@yarn eslint --ext .js,.vue,.ts src --fix

test:
	@yarn test
	@yarn test:e2e:CI

# Generate contract from template
contract:
	@[ "${CONTRACT}" ] || (echo ">> CONTRACT is not set"; exit 1)
	@echo "creating contract ${CONTRACT}"
	@cp -r templates/contracts/contract src/contracts/contract/${CONTRACT}

lighthouse: 
	@quasar serve dist/pwa &
	@yarn audit:lighthouse

report:
	@yarn audit:lighthouse
	@yarn test --coverage
	@yarn audit:node_modules
	@yarn audit:snyk