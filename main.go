package main

import (
	"github.com/aws/aws-lambda-go/lambda"
	streamHandler "github.com/zhaoyi0113/kafka-event-sourcing/cmd/stream"
)

func main() {
	lambda.Start(streamHandler.HandleRequest)
}
