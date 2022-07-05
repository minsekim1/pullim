import React, { useState } from "react";

function RecordAndPrescriptionButton({onClickHandler}: any) {

  return (
      <button
        onClick={onClickHandler('RecordAndPrescription')}
        style={{
          width: "100px",
          height: "40px",
          background: "royalblue",
          borderRadius: "5px",
          color: "white",
          fontSize: "11px",
          margin: "3px"
        }}
      >
        진단 기록 및 운동(VOD) 처방
      </button>
  );
}

export default RecordAndPrescriptionButton;
