"use client";
import React, { useState, useEffect } from "react";

// Define the WebSocketClient component
const QuestionBox2: React.FC = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [question, setQuestion] = useState<string>(""); // State for the user input
    const [responses, setResponses] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    // Initialize WebSocket connection when component mounts
    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8000/ws");

        ws.onopen = () => {
            console.log("WebSocket connection established");
        };

        ws.onmessage = (event: MessageEvent) => {
            setResponses((prevResponses) => [...prevResponses, event.data]);
            setLoading(false);
            setQuestion("");
        };

        setSocket(ws);

        // Cleanup the WebSocket connection on component unmount
        return () => {
            ws.close();
        };
    }, []);

    // Send the user input question to the backend WebSocket
    const sendQuestion = () => {
        if (socket && question.trim()) {
            setLoading(true);
            socket.send(JSON.stringify(question.trim()));
            // setQuestion("");
        }
    };

    return (
        <div className="p-2 space-y-4">
            <h1 className="">Evalyon Prototype</h1>

            {/* Input field to take user question */}
            <div className="space-y-2">
                <input
                    type="text"
                    placeholder="Enter your question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="border text-black p-2 w-full rounded"
                />
                <button
                    onClick={sendQuestion}
                    className="bg-red-500 text-white p-2 rounded-lg font-bold disabled:bg-red-400 disabled:cursor-progress"
                    disabled={loading}
                >
                    Submit Question
                </button>
            </div>

            {/* Displaying the responses from WebSocket */}
            <div id="response" className="mt-4">
                <h2 className="text-xl font-bold">Responses:</h2>
                {responses.length > 0 ? (
                    responses.map((response, index) => (
                        <p key={index}>{response}</p>
                    ))
                ) : (
                    <p>No responses yet.</p>
                )}
            </div>
        </div>
    );
};

export default QuestionBox2;
