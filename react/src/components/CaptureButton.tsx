import useCapture from "../hook/useCapture";

function CaptureButton({ setPhotoList, photoList }: any) {
  // let captureTarget = 'single-main-container__canvas';
  let captureTarget = 'grid-bg-photo';
  console.log(captureTarget);
  const {clickCapture} = useCapture(setPhotoList, photoList, {eltype: "id", elname: captureTarget});


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
