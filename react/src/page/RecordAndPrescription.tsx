import React, { ChangeEvent, useState } from 'react'
import { photoType } from '../types/photoType';

function RecordAndPrescription({photoList}: {photoList: Object[]}) {
  const [uploadedPhotoList, setUploadedPhotoList] = useState(Array<photoType>);

  function readImage(photo:any) {
    console.log(photo);
    // 이미지인지 체크
    if (photo.type && !photo.type.startsWith("image/")) {
      console.log("File is not an image.", photo.type, photo);
      return;
    }
    console.log(photo);
    const reader = new FileReader();
    reader.addEventListener("load", (event: any) => {
      const now = new Date();
      const fileName = `photo_${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}.png`;
      const base64Data = event.target.result;
      const obj = {
        image: base64Data,
        name: fileName,
        file: photo
      }
      console.log(uploadedPhotoList);
      setUploadedPhotoList([obj, ...uploadedPhotoList]);
    });
    reader.readAsDataURL(photo);
  }

  const photoUploadHandler = (event: React.ChangeEvent<HTMLInputElement>) =>{
    if(event.target.files){
      Array.from(event.target.files).forEach((photo)=>{
        console.log(photo);
        readImage(photo);
      })
    }
  }

  const videoUploadHandler = (event: React.ChangeEvent<HTMLInputElement>) =>{
    if(event.target.files){
      console.log(event.target.files);
    }
  }

  return (
    <>
      <h4 style={{color: "black"}}>진단 기록 및 운동(VOD) 처방</h4>
      <div style={{margin: "5px", width: "80%"}}>
        <h4>1. 메모</h4>
        <textarea style={{minWidth: "100%", minHeight: "500px", fontSize: "16px", padding: "10px", borderRadius: "3%"}}></textarea>
        <h4>2. 사진 업로드</h4>
        <input type="file" id='photoSelector' onChange={photoUploadHandler} multiple/>
        <h5>- 업로드한 사진</h5>
        <div className='photosContainer' style={{width: "100%"}}>
          {uploadedPhotoList.length !== 0 && uploadedPhotoList.map((photo: any, i: number) =>(<div key={i} className="photo" style={{width: "100%"}}>
            <img style={{width: "100%"}} src={photo.image}/>
            </div>))}
        </div>
        <h5>- 캡처한 사진</h5>
        <div className='photosContainer' style={{width: "100%"}}>
          {photoList.length !== 0 && photoList.map((photo: any, i: number) =>(<div key={i} className="photo" style={{width: "100%"}}>
            <img style={{width: "100%"}} src={photo.image}/>
            </div>))}
        </div>
        <h4>3. 운동 VOD처방하기</h4>
        <input type="file" id='videoSelector' onChange={videoUploadHandler} multiple/>
        <div></div>
      </div>
    </>
  )
}

export default RecordAndPrescription;