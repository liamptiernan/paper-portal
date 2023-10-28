# paper-portal

## Setup

```bash
cd frontend

yarn install

yarn dev
```

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

### Run the API

```bash
python backend/app/main.py
```

## Linting

```bash
yarn lint
```

## Form Planning

TODO:

Create database in postgres
setup sqlalchemy base
setup alembic
