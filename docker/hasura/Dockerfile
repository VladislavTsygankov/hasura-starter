FROM hasura/graphql-engine:v2.11.1.cli-migrations-v3
WORKDIR /hasura-starter
ENV HASURA_GRAPHQL_METADATA_DATABASE_URL=postgres://postgres:postgrespassword@postgres:5432/postgres
ENV PG_DATABASE_URL=postgres://postgres:postgrespassword@postgres:5432/postgres
ENV HASURA_GRAPHQL_ENABLE_CONSOLE="true"
ENV HASURA_GRAPHQL_DEV_MODE: "true"
ENV HASURA_GRAPHQL_ENABLED_LOG_TYPES: startup, http-log, webhook-log, websocket-log, query-log
ENV HASURA_GRAPHQL_MIGRATIONS_SERVER_TIMEOUT: 10
ENV HASURA_GRAPHQL_ADMIN_SECRET=myadminsecretkey
COPY /metadata /hasura-metadata