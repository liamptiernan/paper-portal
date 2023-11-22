FROM node:18-alpine as frontend

WORKDIR /frontend
ADD frontend/package.json frontend/yarn.lock ./
RUN yarn install
ADD frontend ./
RUN yarn run build

FROM python:3.11.1-bullseye as builder


RUN apt-get update && apt-get install -y locales && \
    localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8
ENV LANG=en_US.utf8 DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y curl git g++ make build-essential

# Configure Poetry
ENV POETRY_VERSION=1.5.1
ENV POETRY_HOME=/opt/poetry
ENV POETRY_VENV=.venv
ENV POETRY_CACHE_DIR=/opt/.cache

WORKDIR ${HOME_DIR}/backend
# Install poetry separated from system interpreter
RUN python3 -m venv $POETRY_VENV \
    && $POETRY_VENV/bin/pip install -U pip setuptools \
    && $POETRY_VENV/bin/pip install poetry==${POETRY_VERSION}

# Add `poetry` to PATH
ENV PATH="${PATH}:${POETRY_VENV}/bin"


ARG UNAME=user
ARG HOME_DIR=/home/${UNAME}
ADD pyproject.toml poetry.lock ./

RUN . .venv/bin/activate && \
    poetry install

ADD backend ./

RUN echo ". ${HOME_DIR}/backend/.venv/bin/activate" >> ~/.bashrc