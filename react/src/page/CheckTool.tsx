import React, { useState } from 'react'
import { SourcePlayback } from '../core/helpers/sourceHelper';
import useCapture from '../hook/useCapture';
import { PhotoType } from '../types/PrescriptionType';

interface CheckToolPropsType {
  checkedPhotoList: PhotoType[];
  setCheckedPhotoList: Function;
}

function CheckTool({checkedPhotoList, setCheckedPhotoList}:CheckToolPropsType) {
  const [sourcePlayback, setSourcePlayback] = useState<SourcePlayback>();
  const createImage = (iamge: string) =>{
    const imageEl = document.createElement('img');
    imageEl.src = iamge;
    imageEl.style.width = "500px";
    console.log(imageEl);
    setSourcePlayback({
      htmlElement: imageEl,
      width: imageEl.naturalWidth,
      height: imageEl.naturalHeight
    });
    return 
  }
  
  const clickCapture = useCapture(setCheckedPhotoList, checkedPhotoList, {eltype: "id", elname: "grid-bg-photo"}, createImage);


  const clickCheck =  () => {
  }
  return (
    <>
      <h4 style={{color: "black"}}>검사툴</h4>
      <div id='image-container'>
        {checkedPhotoList.length !==0 && checkedPhotoList.map((checkedPhoto, i) => (
          <div
          key={i}
          style={{
            width: "100%",
            height: "250px",
            marginBottom: "10px",
            position: "relative",
          }}
        >
          <img
            style={{ width: "100%", height: "100%" }}
            src={checkedPhoto.image}
            alt={`그리드배경이 들어간 사진 ${i}`}
          />
          </div>
        ))}
      </div>
      <label>타이머</label><input type="text" placeholder='5초'/>
      <button onClick={clickCapture}>검사하기</button>
    </>
  )
}

export default CheckTool;