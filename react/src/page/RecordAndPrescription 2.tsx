import axios from "axios";
import React from "react";
import { PhotoType, FileType } from "../types/PrescriptionType";

interface RecordAndPrescriptionPropsType {
  photoList: PhotoType[];
  uploadedPhotoList: PhotoType[];
  setUploadedPhotoList: Function;
  videoList: FileType[];
  setVideoList: Function;
  memo: string;
  setMemo: Function
}

function RecordAndPrescription({
  photoList,
  uploadedPhotoList,
  setUploadedPhotoList,
  videoList,
  setVideoList,
  memo,
  setMemo
}: RecordAndPrescriptionPropsType) {

  const changeMemo = (e: React.ChangeEvent<HTMLTextAreaElement>) =>{
    setMemo(e.target.value);
  }
  
  const readUploadedFileAsImage = (inputFile: File, i: number) => {
    const fileReader = new FileReader();

    return new Promise((resolve, reject) => {
      // 에러날 시
      fileReader.onerror = () => {
        fileReader.abort();
        reject(new DOMException("Problem parsing input file."));
      };
      // 사진 잘 올라갈 시
      fileReader.onload = () => {
        const base64Data = fileReader.result;
        const fileName = inputFile.name;

        const obj = {
          image: base64Data,
          name: fileName,
          file: inputFile,
        };
        resolve(obj);
      };
      fileReader.readAsDataURL(inputFile);
    });
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files!;
    try {
      const fileContents = await Promise.all(
        Array.from(files).map((file, i) => readUploadedFileAsImage(file, i))
      );
      setUploadedPhotoList(fileContents, ...uploadedPhotoList);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const savePrescription = async () => {
    let formData = new FormData();
    const entirePhotos = photoList.concat(uploadedPhotoList);
    if(memo===''){
      return alert('메모를 입력해주세요.');
    }
    formData.append('memo', memo);
    entirePhotos.forEach((photo: { file: File }, i: number) => {
      const { file } = photo;
      // const data = new Blob([photo], { type: "image/png" });
      // formData.append("photos", data, "photo" + i);
      formData.append("photos", file);
    });
    videoList.forEach((videoFile:{ file: File}) =>{
      const {file} = videoFile;
      formData.append("videos", file);
    });
    const response = await axios
      .post("/photo", formData)
      .then((res) => res.data);
    if (response.success) {
      alert("저장 완료!");
    }
    // setData(response.photo);
  };

  const videoUploadHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const videoFiles = event.target.files;
      const videos = Array.from(videoFiles).map((videoFile): FileType => ({name: videoFile.name, file: videoFile}));
      setVideoList(videos);
    }
  };
  return (
    <>
      <h4 style={{ color: "black" }}>진단 기록 및 운동(VOD) 처방</h4>
      <div
        style={{
          margin: "5px",
          padding: "0px 10px 0px 10px",
          width: "90%",
          height: "90vh",
          overflowY: "auto",
        }}
      >
        <h4>1. 메모</h4>
        <textarea
          onChange={changeMemo}
          value={memo}
          style={{
            minWidth: "100%",
            minHeight: "200px",
            fontSize: "16px",
            padding: "10px",
            borderRadius: "3%",
          }}
        ></textarea>
        <h4>2. 사진 업로드</h4>
        <input
          type="file"
          id="photoSelector"
          onChange={handleUpload}
          multiple
          style={{ width: "100%" }}
        />
        <h5>- 업로드한 사진(여러 사진 업로드 가능)</h5>
        <div className="photosContainer" style={{ width: "100%" }}>
          {uploadedPhotoList.length !== 0 &&
            uploadedPhotoList.map((photo: any, i: number) => (
              <div key={i} className="photo" style={{ width: "100%" }}>
                <img
                  style={{ width: "100%" }}
                  src={photo.image}
                  alt={photo.name}
                />
              </div>
            ))}
        </div>
        <h5>- 캡처한 사진</h5>
        <div className="photosContainer" style={{ width: "100%" }}>
          {photoList.length !== 0 &&
            photoList.map((photo: any, i: number) => (
              <div key={i} className="photo" style={{ width: "100%" }}>
                <img
                  style={{ width: "100%" }}
                  src={photo.image}
                  alt={photo.name}
                />
              </div>
            ))}
        </div>
        <h4>3. 운동 VOD처방하기</h4>
        <input
          type="file"
          id="videoSelector"
          onChange={videoUploadHandler}
          multiple
          style={{ width: "100%" }}
        />
        <div></div>
      </div>
      <button
        style={{
          width: "100%",
          height: "10vh",
          background: "red",
          borderRadius: "5px",
          color: "white",
          fontSize: "11px",
        }}
        onClick={savePrescription}
      >
        처방전 저장
      </button>
    </>
  );
}

export default RecordAndPrescription;
