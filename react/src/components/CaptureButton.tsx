import React, { useEffect, useRef, useState } from "react";
import { useCallback } from "react";
import { useScreenshot } from "use-screenshot-hook";
import { UseScreenshotProps } from "use-screenshot-hook/dist/types";
import useCapture from "../hook/useCapture";
import { PhotoType } from "../types/PrescriptionType";


function CaptureButton({ setPhotoList, photoList }: any) {
  const clickCapture = useCapture(setPhotoList, photoList, {eltype: "className", elname: 'single-main-container__canvas'});

  return (
    <>
      <button
        id="screenshot_btn"
        style={{
          width: "100px",
          height: "40px",
          background: "royalblue",
          borderRadius: "5px",
          color: "white",
          fontSize: "11px",
          margin: "3px"
        }}
        onClick={clickCapture}
      >
        화면캡처
      </button>
    </>
  );
}

export default CaptureButton;
