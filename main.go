package main

import (
	"github.com/aws/aws-lambda-go/lambda"
	streamHandler "github.com/zhaoyi0113/kafka-event-sourcing/cmd"
)

func main() {
	lambda.Start(streamHandler.HandleRequest)
}
