install:
	npm install

start:
	make build
	make lint
	make test

test:
	npm test

test-coverage:
	npm test -- --coverage

publish:
	npx publish --dry -run

build:
	rm -rf dist
	npm run build

lint:
	npx eslint .