# paper-portal

## Setup

### Install Frontend Deps

```bash
cd frontend

yarn install
```

### Install Backend Deps

```bash
cd ..
poetry install

. .venv/bin/activate
```

### Setup Precommit Hooks

```bash
poetry install

. .venv/bin/activate
```

### Start Docker Containers

```bash
docker-compose -f Docker/docker-compose-dev.yaml up
```

### Create Database

```bash
PGPASSWORD=password psql -h localhost -U postgres -c 'create database odyssey encoding 'utf8' template template1;'
```

## Running The App

### Start the venv

```bash
. .venv/bin/activate
```

### Run the DB

```bash
docker-compose -f Docker/docker-compose-dev.yaml up
```

### Run the API

```bash
python backend/app/main.py
```

### Run the frontend

```bash
cd frontend

yarn dev
```

## Linting

```bash
yarn lint
```

## Planning

TODO:

setup auth, users table
setup precommit hooks
