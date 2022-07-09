import React, { useEffect, useRef } from "react";

export default function CaptureList(
  { photoList, setPhotoList, setIsModal, setSrc }: any = { Array, Function }
) {
  const photoRef = useRef([]) as any;
  const buttonRef = useRef([]) as any;

  const onDeleteHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    i: number
  ) => {
    const array = photoList.filter(
      (photo: string, photoIndex: number) => i !== photoIndex
    );
    const photoRefArray = photoRef.current.filter(
      (el: HTMLElement, elIndex: number) => i !== elIndex
    );
    const buttonRefArray = buttonRef.current.filter(
      (el: HTMLElement, elIndex: number) => i !== elIndex
    );
    console.log("삭제된 것", i);
    setPhotoList(array);
    photoRef.current = photoRefArray;
    buttonRef.current = buttonRefArray;
  };
  useEffect(() => {
    if (photoRef!.current !== undefined && buttonRef.current !== undefined) {
      photoList.forEach((item: string, i: number) => {
        photoRef.current[i]?.addEventListener("mouseover", () => {
          buttonRef.current[i]!.style.display = "block";
        });
        photoRef.current[i]?.addEventListener("mouseleave", () => {
          buttonRef.current[i].style.display = "none";
        });
      });
    }
    return () => {
      photoList.forEach((item: string, i: number) => {
        if (
          photoRef!.current !== undefined &&
          buttonRef.current !== undefined
        ) {
          photoRef.current[i]?.removeEventListener("mouseover", () => {
            buttonRef.current[i]!.style.display = "block";
          });
          photoRef.current[i]?.removeEventListener("mouseleave", () => {
            buttonRef.current[i]!.style.display = "none";
          });
        }
      });
    };
  }, [photoList]);
  return (
    <>
      <h4 style={{color: "black"}}>저장된 화면캡처 화면</h4>
      <div
        style={{
          width: "90%",
          padding: "10px",
          height: "90vh",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflowY: "auto",
        }}
      >
        <div style={{ minHeight: "500px", width: "100%" }}>
          {photoList.length !== 0 &&
            photoList.map((photo: {image: string}, i: number) => (
              <div
                key={i}
                ref={(el) => (photoRef.current[i] = el)}
                style={{
                  width: "100%",
                  height: "250px",
                  marginBottom: "10px",
                  position: "relative",
                }}
              >
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={photo.image}
                  alt="asa"
                  onClick={() =>{
                    setIsModal(true);
                    setSrc(photoList[i].image);
                  }}
                />
                <button
                  ref={(el) => (buttonRef.current[i] = el)}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 2,
                    width: "30px",
                    background: "red",
                    borderRadius: "50px",
                    display: "none",
                  }}
                  onClick={(e) => onDeleteHandler(e, i)}
                >
                  x
                </button>
              </div>
            ))}
        </div>
      </div>
      <section style={{display: "flex", width: "100%"}}>
        {/* {data && <div style={{width: "300px"}}><img src={`http://localhost:5001/images/202275/${data.filename}`} style={{width: "100%"}}/></div>} */}
        {/* <button
          onClick={savePhotoToLocal}
          style={{
            width: "100%",
            height: "10vh",
            background: "royalblue",
            borderRadius: "5px",
            color: "white",
            fontSize: "11px",
          }}>
          내컴퓨터에 저장
        </button> */}
      </section>
    </>
  );
}
