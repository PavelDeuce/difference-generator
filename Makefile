install:
	npm install

start:
	npx babel-node src/bin/

test:
	npm test

publish:
	npx publish --dry -run

build:
	rm -rf dist
	npm run build

lint:
	npx eslint .