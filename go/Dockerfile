FROM golang:1.18.5-bullseye
WORKDIR /app
COPY . .
RUN go mod init api
CMD ["go", "run", "."]