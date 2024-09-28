"use client";
import React, { useState, useEffect } from "react";

// Define the WebSocketClient component
const QuestionBox: React.FC = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    // const [questions, setQuestions] = useState<string[]>([
    //     "What is the capital of france ?",
    // ]);
    const question = "What is the capital of france ?";
    const [responses, setResponses] = useState<string[]>([]);

    // Initialize WebSocket connection when component mounts
    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8000/ws");

        ws.onopen = () => {
            console.log("WebSocket connection established");
        };

        ws.onmessage = (event: MessageEvent) => {
            setResponses((prevResponses) => [...prevResponses, event.data]);
        };

        setSocket(ws);

        // Cleanup the WebSocket connection on component unmount
        return () => {
            ws.close();
        };
    }, []);

    // Send the array of questions to the backend WebSocket
    const sendQuestions = () => {
        if (socket) {
            const nonEmptyQuestions = question.trim();
            if (nonEmptyQuestions.length > 0) {
                socket.send(JSON.stringify(nonEmptyQuestions));
            }
        }
    };

    return (
        <div className="p-2 space-y-4">
            <h1 className="">Evalyon Prototype</h1>
            <div id="questions">
                <div className="">
                    <p className="font-bold text-xl">{question}</p>
                </div>
            </div>
            <button
                onClick={sendQuestions}
                className="bg-red-500 p-2 rounded-lg font-bold"
            >
                Record Response
            </button>

            <div id="response">
                <h2 className="text-xl font-bold">Responses:</h2>
                {responses.map((response, index) => (
                    <p key={index}>{response}</p>
                ))}
            </div>
        </div>
    );
};

export default QuestionBox;
