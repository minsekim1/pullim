import React, { useEffect, useRef } from "react";

export function MainPage({ photoList, setPhotoList }: any={Array, Function}) {
  const photoRef = useRef([]) as any;
  const buttonRef = useRef([]) as any;
  const onDeleteHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, i:number) => {
    const array = photoList.filter((photo:string, photoIndex:number) => i!==photoIndex);
    const photoRefArray = photoRef.current.filter((el: HTMLElement, elIndex:number) => i!==elIndex);
    const buttonRefArray = buttonRef.current.filter((el: HTMLElement, elIndex:number) => i!==elIndex);
    console.log(photoRef);
    console.log('삭제된 것', i);
    setPhotoList(array);
    photoRef.current = photoRefArray;
    buttonRef.current = buttonRefArray;

  }
  useEffect(()=>{
    if(photoRef!.current !== undefined && buttonRef.current !== undefined){
      console.log(photoRef);
      photoList.forEach((item: string, i: number) => {
        photoRef.current[i]?.addEventListener('mouseover', ()=>{
          buttonRef.current[i]!.style.display = "block"
        });
        photoRef.current[i]?.addEventListener('mouseleave', ()=>{
          buttonRef.current[i].style.display = "none"
        });
      });
    }
    return () =>{
      photoList.forEach((item: string, i: number) => {
        if(photoRef!.current !== undefined && buttonRef.current !== undefined){
          photoRef.current[i]?.removeEventListener('mouseover', ()=>{
            buttonRef.current[i]!.style.display = "block"
          });
          photoRef.current[i]?.removeEventListener('mouseleave', ()=>{
            buttonRef.current[i]!.style.display = "none"
          });
        }
      });
    }
  },[photoList]);
  return (
    <div
      style={{
        width: 300,
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.4)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "scroll",
      }}
    >
      <div style={{ minHeight: "1000px" }}>
        {photoList.length !== 0 &&
          photoList.map((photo: string, i: number) => (
            <div
              key={i}
              ref={el => (photoRef.current[i] = el)}
              style={{
                width: "250px",
                height: "250px",
                marginBottom: "10px",
                border: "1px solid white",
                position: "relative"
              }}
            >
              <img
                style={{ width: "100%", height: "100%" }}
                src={photo}
                alt="asa"
              />
              <button ref={el => (buttonRef.current[i] = el)} style={{position: "absolute", bottom: 0, right:0, width: "30px", background: "red", borderRadius: "50px", display: "none"}} onClick={(e) =>(onDeleteHandler(e, i))}>x</button>
            </div>
          ))}
      </div>
    </div>
  );
}
