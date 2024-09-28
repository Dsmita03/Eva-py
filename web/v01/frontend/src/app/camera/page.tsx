import QuestionBox from "@/components/QuestionBox";
import WebcamComponent from "@/components/Webcam";
import React from "react";

function CameraTest() {
    return (
        <div className="flex place-content-center p-12 gap-12">
            <WebcamComponent />
            <div className="w-96">
                <QuestionBox />
            </div>
        </div>
    );
}

export default CameraTest;
