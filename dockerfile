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

# CMD service postgresql start


ENTRYPOINT [ "/app/bin" ]