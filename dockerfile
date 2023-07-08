FROM golang:1.19

# Install PostgreSQL
RUN apt-get update && apt-get install -y postgresql

CMD sudo service postgresql start

WORKDIR /app

COPY ./ ./

RUN go get
RUN go build -o bin .

# Expose the default PostgreSQL port
# EXPOSE 5432
# EXPOSE 8080

# CMD service postgresql start
# CMD ["sh", "-c", "postgres & while ! pg_isready -- U -q -h localhost -p 5432 -U $POSTGRES_USER; do sleep 1; done && bin"]

ENTRYPOINT [ "/app/bin" ]