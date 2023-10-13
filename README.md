# Opportunity Job

Table of Contents
=================

* [Start project](#start-project)
* [API](./opportunity_job_api/README.md)

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
