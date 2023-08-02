# Awesome Task Manger
## Table of contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [What's in the box ?](#whats-in-the-box-)
  - [CircleCI](#circleci)
  - [Commitizen](#commitizen)
  - [Commitlint](#commitlint)
  - [Docker Compose](#docker-compose)
  - [ESLint](#eslint)
  - [GitHub Actions](#github-actions)
  - [Husky](#husky)
  - [Lint-staged](#lint-staged)
  - [Prettier](#prettier)
- [Running the app](#running-the-app)
- [Code scaffolding](#code-scaffolding)
- [Build](#build)
- [Test](#test)
- [Further help](#further-help)
- [Useful Docker commands](#useful-docker-commands)

---

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them :

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [Docker](https://docs.docker.com/get-docker/)

---

### Installation

1. Clone the git repository

   ```bash
   git clone https://github.com/AfshinJalili/awesome-task-manager.git
   ```

1. Go into the project directory

   ```bash
   cd awesome-task-manager/
   ```

1. Checkout working branch

   ```bash
   git checkout <branch>
   ```

1. Install NPM dependencies

   ```bash
   npm i
   ```

1. Copy `.env.dist` to `.env`

   ```bash
   cp .env.dist .env
   ```

1. Replace the values of the variables with your own

1. Create Docker images and launch them

   ```bash
   docker-compose up -d --build
   ```

---

## What's in the box ?

### CircleCI

[CircleCI](https://circleci.com/) automates your software builds, tests, and deployments.

**CircleCI pipeline file**: [`.circleci/config.yml`](./.circleci/config.yml).

For more configuration options and details, see the [configuration docs](https://circleci.com/docs/).

---

### Commitizen

[commitizen](https://github.com/commitizen/cz-cli) is a command line utility that makes it easier to create commit messages following the [conventional commit format](https://conventionalcommits.org) specification.

Use `git cz` instead of `git commit` to use commitizen.

[![Add and commit with Commitizen](https://github.com/commitizen/cz-cli/raw/master/meta/screenshots/add-commit.png)](https://github.com/commitizen/cz-cli/raw/master/meta/screenshots/add-commit.png)

**Configuration file**: [`.czrc`](./.czrc).

---

### Commitlint

[commitlint](https://github.com/conventional-changelog/commitlint) checks if your commit messages meet the [conventional commit format](https://conventionalcommits.org).

**Configuration file**: [`.commitlintrc.json`](./.commitlintrc.json).

In general the pattern mostly looks like this:

```sh
type(scope?): subject  #scope is optional
```

Are you a good `commitizen` ?

---

### Docker Compose

**Compose file**: [`docker-compose.yml`](./docker-compose.yml).

Containers :

- PostgreSQL 14
- pgAdmin 6

Compose file uses `.env`.

---

### ESLint

[ESLint](https://eslint.org/) is a fully pluggable tool for identifying and reporting on patterns in JavaScript.

**Configuration file**: [`.eslintrc.js`](./.eslintrc.js).

For more configuration options and details, see the [configuration docs](https://eslint.org/docs/user-guide/configuring).

---

### GitHub Actions

[GitHub Actions](https://github.com/features/actions) makes it easy to automate all your software workflows, now with world-class CI/CD. Build, test, and deploy your code right from GitHub. Make code reviews, branch management, and issue triaging work the way you want.

**CI workflow file**: [`.github/workflows/ci.yml`](./.github/workflows/ci.yml).

---

### Husky

[Husky](https://github.com/typicode/husky) is a package that helps you create Git hooks easily.

**Configuration folder**: [`.husky`](./.husky/).

---

### Lint-staged

[Lint-staged](https://github.com/okonet/lint-staged) is a Node.js script that allows you to run arbitrary scripts against currently staged files.

**Configuration file**: [`.lintstagedrc.json`](./.lintstagedrc.json).

---

### Prettier

[Prettier](https://prettier.io/) is an opinionated code formatter.

**Configuration file**: [`.prettierrc.json`](./.prettierrc.json).  
**Ignore file**: [`.prettierignore`](./.prettierignore).

For more configuration options and details, see the [configuration docs](https://prettier.io/docs/en/configuration.html).

---

## Running the app

### development

```bash
npm run start
```

### watch mode

```bash
npm run start:dev
```

### production mode

```bash
npm run start:prod
```

---

## Code scaffolding

Run `nest generate|g <schematic> <name> [options]` to generate a new Nest Element.

---

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

---

## Test

### unit tests

```bash
npm run test
```

### e2e tests

```bash
npm run test:e2e
```

### test coverage

```bash
npm run test:cov
```

---

## Further help

To get more help on the Nest CLI use `nest --help` or go check out the [Nest CLI README](https://github.com/nestjs/nest-cli/blob/master/README.md).

---

## Useful Docker commands

1. If you want to check that all containers are up :

   ```bash
   docker-compose ps
   ```

1. Other Docker commands :

   ```bash
   # Start Docker
   docker-compose start

   # Restart Docker
   docker-compose restart

   # Stop Docker
   docker-compose stop

   # Delete all containers
   docker rm $(docker ps -aq)

   # Delete all images
   docker rmi $(docker images -q)
   ```

1. How to get a Docker container's IP address from the host ?

   ```bash
   docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <container>
   docker inspect $(docker ps -f name=<service> -q) | grep IPAddress
   ```

---
