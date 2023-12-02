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
PGPASSWORD=password psql -h localhost -U postgres -c 'create database paperportal encoding 'utf8' template template1;'
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

## Docker

```bash
docker build -f Docker/app.Dockerfile -t paper-test .

# with arm

docker buildx build -f Docker/app.Dockerfile --platform=linux/amd64 -t paper-test .
```

## AWS

CLI: cli profile name paper-dev-profile

### Cloudshell command to access task

aws ecs execute-command \
--region "us-east-1" \
--cluster "paper-dev" \
--task arn:aws:ecs:us-east-1:440551823509:task/paper-dev/263680c184a74e36897b3a6c91f0e125 \
--container "paper-portal-dev" \
--command "/bin/bash" \
--interactive

**TODO:**

Create a task definition that will alembic upgrade head
Create the service and run it

Get execute-command working to get on the box
