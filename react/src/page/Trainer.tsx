import React, { useState } from "react";
import { Socket } from "socket.io-client";
import ButtonGroup from "../components/ButtonGroup";
import { PhotoType } from "../types/PrescriptionType";
import CaptureList from "./CaptureList";
import CheckTool from "./CheckTool";
import DiagnosticHistory from "./DiagnosticHistory";
import RecordAndPrescription from "./RecordAndPrescription";

interface TrainerPropsType {
  socketData: Socket;
  myId: string;
  meetingNumber: string;
}

function Trainer({ socketData, myId, meetingNumber }: TrainerPropsType) {
  const [memo, setMemo] = useState<string>("");
  const [photoList, setPhotoList] = useState<PhotoType[]>([]);
  const [uploadedPhotoList, setUploadedPhotoList] = useState<PhotoType[]>([]);
  const [videoList, setVideoList] = useState<PhotoType[]>([]);
  const [isCheckTool, setCheckTool] = useState(false);

  const [isModal, setIsModal] = useState(false);
  const [src, setSrc] = useState("");

  const [currentPage, setCurrentPage] = useState("");
  return (
    <>
      <div
        id="pullim-page"
        style={{
          width: "400px",
          position: "absolute",
          top: 0,
          zIndex: 1,
          right: 0,
          display: "none",
          height: "100vh",
          backgroundColor: "rgba(255,255,255)",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "1% 0 0 1%",
          overflow: "hidden",
        }}
      >
        {currentPage === "CaptureList" && (
          <CaptureList
            photoList={photoList}
            setPhotoList={setPhotoList}
            setIsModal={setIsModal}
            setSrc={setSrc}
          />
        )}
        {currentPage === "RecordAndPrescription" && (
          <RecordAndPrescription
            photoList={photoList}
            uploadedPhotoList={uploadedPhotoList}
            setUploadedPhotoList={setUploadedPhotoList}
            videoList={videoList}
            setVideoList={setVideoList}
            memo={memo}
            setMemo={setMemo}
          />
        )}
        {currentPage === "DiagnosticHistory" && <DiagnosticHistory />}
      </div>
      {isCheckTool && (
        <CheckTool
          socketData={socketData}
          myId={myId}
          meetingNumber={meetingNumber}
        />
      )}
      <ButtonGroup
        setPhotoList={setPhotoList}
        photoList={photoList}
        setCurrentPage={setCurrentPage}
        setCheckTool={setCheckTool}
      />
      {isModal && (
        <div
          style={{
            zIndex: 1,
            position: "absolute",
            width: "1100px",
            top: "10%",
            left: "10%",
            border: "2.5px solid orange",
          }}
        >
          <img
            style={{ width: "100%" }}
            onClick={() => {
              setIsModal(false);
            }}
            src={src}
            alt="큰 이미지"
          />
        </div>
      )}
    </>
  );
}

export default Trainer;
