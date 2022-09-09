FROM postgres:12
WORKDIR /hasura-starter
ENV POSTGRES_PASSWORD=postgrespassword
ADD ./sql/create_tables.sql /docker-entrypoint-initdb.d/