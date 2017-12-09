FROM golang:1.9

COPY entrypoint.sh /entrypoint.sh
COPY main.go main.go
RUN go build -o main main.go
RUN chmod +x /entrypoint.sh

EXPOSE 8080
ENTRYPOINT ["/entrypoint.sh"]
CMD ["./main"]
Raw
