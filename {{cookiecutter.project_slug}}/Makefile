start:
	yarn run start

lint:
	yarn run lint
	yarn run pretty-quick --staged  --check

test:
	yarn run test --coverage --watchAll=false

remove_cache:
	rm -rf node_modules/.cache

clean:
	rm -rf node_modules

build:
	NODE_ENV=production GENERATE_SOURCEMAP=false yarn run build

fix:
	yarn run lint --fix
	yarn run pretty-quick
