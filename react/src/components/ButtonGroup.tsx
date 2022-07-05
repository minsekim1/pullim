import React, { useEffect, useRef } from "react";
import CaptureButton from "./CaptureButton";
import CheckToolButton from "./CheckToolButton";
import CaptureListButton from "./CaptureListButton";
import RecordAndPrescriptionButton from "./RecordAndPrescriptionButton";

function ButtonGroup(
  { setPhotoList, photoList, setCurrentPage }: any = { Function, Array }
) {
  const Container = useRef<any>();
  const buttonGroupRef = useRef<any>();

  useEffect(() => {
    if (buttonGroupRef.current !==undefined && Container.current !== undefined){
      Container.current.addEventListener("mouseover", () => {
        buttonGroupRef.current.style.display = "flex";
      });
      Container.current.addEventListener("mouseleave", () => {
        buttonGroupRef.current.style.display = "none";
      });
    }
    return () => {
      if(buttonGroupRef!.current !==undefined && Container!.current !== undefined){
        Container!.current.removeEventListener("mouseover", () => {
          buttonGroupRef!.current.style.display = "flex";
        });
        Container!.current.removeEventListener("mouseleave", () => {
          buttonGroupRef!.current.style.display = "none";
        });
      }
    };
  }, []);

  return (
    <div
      ref={Container}
      style={{
        position: "absolute",
        bottom: "15%",
        zIndex: 100,
        left: "1%",
        width: "150px",
        height: "70%",
        minHeight: "180px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        ref={buttonGroupRef}
        style={{
          display: "none",
          flexDirection: "column",
          width: "300px"
        }}
      >
        <CaptureListButton setCurrentPage={setCurrentPage} />
        <CaptureButton setPhotoList={setPhotoList} photoList={photoList} />
        <CheckToolButton setCurrentPage={setCurrentPage} />
        <RecordAndPrescriptionButton setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
}

export default ButtonGroup;
