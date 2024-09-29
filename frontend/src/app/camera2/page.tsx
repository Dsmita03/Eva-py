import QuestionBox2 from "@/components/QuestionBox2";
import WebcamComponent from "@/components/Webcam";
import React from "react";

function CameraTest() {
    return (
        <div className="flex place-content-center p-12 gap-12">
            <WebcamComponent />
            <div className="w-96">
                <QuestionBox2 />
            </div>
        </div>
    );
}

export default CameraTest;
