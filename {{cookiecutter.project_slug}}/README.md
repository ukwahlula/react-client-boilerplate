# {{cookiecutter.project_name}}

Dev stack:

- react (create react app)
- yarn
- scss
- antd
- react-restfull

## Clone repository

Install git on your system https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

```
git clone ...
cd {{cookiecutter.project_slug}}
```

## Run

### Install system dependencies (Ubuntu / OSX)

Install nvm, see instruction here: https://github.com/nvm-sh/nvm

```
nvm install 13.7.0
nvm use 13.7.0
node --version
```

### Activate environment:

Depends on your environment (staging at default) run the following

```
cp envsets/local_dev.env envsets/.env
source envsets/.env
```

### Install project requirements:

```
yarn install
```

### Start dev server:

```
make start
```

## Run tests

### Run all tests:

```
make test
```

### Run one test:

```
NODE_ENV=test yarn run jest app/containers/Rest/tests/reducer.test.js
```
