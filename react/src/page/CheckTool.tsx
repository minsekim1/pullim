import React from 'react'
import useCapture from '../hook/useCapture';
import { PhotoType } from '../types/PrescriptionType';

interface CheckToolPropsType {
  checkedPhotoList: PhotoType[];
  setCheckedPhotoList: Function;
}

function CheckTool({checkedPhotoList, setCheckedPhotoList}:CheckToolPropsType) {
  const clickCapture = useCapture(setCheckedPhotoList, checkedPhotoList, {eltype: "id", elname: "grid-bg-photo"});
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