# Opportunity Job

This project is divided into [API/](/opportunity_job_api/README.md)
and `app`.
[API directory](opportunity_job_api) contains
[Django](https://www.djangoproject.com/) application,
and the [APP directory](TODO) contains
[Next.js](https://nextjs.org/) application.

Table of Contents
=================

* [Start project](#start-project)
* [Prerequisites](#prerequisites)

## Prerequisites

- [Docker](https://docs.docker.com/engine/install/) and
  [Docker Compose](https://docs.docker.com/compose/install/)

## Start project

1. Move to project root directory

2. Create `.env` using `example.com`:

   `cp example.com .env`

3. (Optional) change the values of environment variables in `.env` file

4. Start the containers:
    - development mode:
      ```shell
      docker compose up -d
      ```
    - production mode:
      ```shell
      docker compose \
      -f docker-compose.yml \
      -f docker-compose.production.yml \
      up -d
      ```
