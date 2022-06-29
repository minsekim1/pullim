import React, { Children, useEffect, useState } from "react";

import "./App.css";
import { initArgs, ZoomMtg } from "@zoomus/websdk";
import { MainPage } from "./page";

ZoomMtg.setZoomJSLib("https://source.zoom.us/2.4.5/lib", "/av");

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load("ko-KO");
ZoomMtg.i18n.reload("ko-KO");
//ZoomMtg.i18n.load("en-US");
//ZoomMtg.i18n.reload("en-US");

function App() {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [isEnter, setIsEnter] = useState(false);
  const [isHost, setIsHost] = useState("0");

  useEffect(() => {
  //   if (document) {
  //     const url = document.location.href.split("?url=")[1];
  //     if (url) setUrl(url);
  //   }
  }, []);

  const sdkKey = "xPN1ctkMLTAqaWGsE7FDSonJSEOO8B0XtQf8";
  const meetingNumber = url.slice(url.indexOf("/j/") + 3, url.indexOf("pwd=") - 1);
  const leaveUrl = "http://localhost:3000";
  const userEmail = "";
  const passWord = url.slice(url.indexOf("pwd=") + 4, url.length);
  const sdkKeySecret = "zaPNq6sYv9uKIUUI5wVCHGnqwnC8nG8F2p4U";
  const registrantToken = "";

  const generateSDKSignature = () =>
    ZoomMtg.generateSDKSignature({
      sdkKey: sdkKey,
      sdkSecret: sdkKeySecret,
      meetingNumber: meetingNumber,
      role: isHost,
      success: () => console.info("generateSDKSignature success"),
      error: (e: any) => console.info("generateSDKSignature fail", e),
    });
  
  // const onFindId = () => {
  //   //id 잡아오기
  //   const idRef = document.querySelector("#wc-container-left") as any;
  //   console.log(idRef)
  //   // idRef.style.width = '88%'
  //   // 완료!
  //   console.log(idRef)
  // };
  // onFindId()

    
  function getSignature(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    
    const root = document.getElementById("zmmtg-root");

    if (!root) return;

    root.style.display = "flex"; //줌 body.style 설정
    root.style.width = "88%";

    
    const setting: typeof initArgs = {
      leaveUrl: leaveUrl,
      showMeetingHeader: true,
      disableInvite: false,
      disableCallOut: false,
      disableRecord: false,
      disableJoinAudio: false,
      audioPanelAlwaysOpen: true,
      showPureSharingContent: true,
      isSupportAV: true,
      isSupportChat: true,
      isSupportQA: true,
      isSupportCC: true,
      isSupportPolling: true,
      isSupportBreakout: true,
      screenShare: true,
      //rwcBackup: string,
      videoDrag: true,
      //sharingMode: string,
      videoHeader: false,
      // virtualBackground: true,
      isLockBottom: false,
      isSupportNonverbal: true,
      isShowJoiningErrorDialog: true,

      inviteUrlFormat: "https://localhost:3000/?url=https://us04web.zoom.us/j/{0}?pwd={1}",

      meetingInfo: ["participant"],
      disableVoIP: false,
      disableReport: false,
      disablePreview: false,
      disableCORP: false,
      onRetryCallback: true,
      enableHD: true,
      helper: "what",
    };
    const join_data = {
      signature: generateSDKSignature(),
      meetingNumber: meetingNumber,
      userName: name,
      sdkKey: sdkKey,
      userEmail: userEmail,
      passWord: passWord,
      tk: registrantToken,
      success: (success: any) => setIsEnter(true),
      error: (error: any) => console.log(error),
    };
    ZoomMtg.init({
      ...setting,
      success: (success: any) => ZoomMtg.join(join_data),
      error: (error: any) => console.log(error),
    });
  }
  return (
    <div className="App">
      <main>
        <h1>Zoom Meeting SDK Sample React</h1>
        <br />
        <p>주소 창에 zoom url을 입력하면 해당 ZOOM으로 접근이 가능합니다.</p>
        <br />
        <p>예: https://us05web.zoom.us/j/82881994686?pwd=NktPN0hUTWFPQWZnMk9KY1ZuUHdNQT09</p>
        <br />

        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
            type="radio"
            id="트레이너"
            name="drone"
            value="1"
            checked={isHost === "1"}
            onClick={() => setIsHost("1")}
          />
          <label htmlFor="트레이너" style={{ padding: "0 0 0 4px" }}>
            트레이너(호스트)
          </label>
          <div style={{ marginRight: 8 }} />
          <input
            type="radio"
            id="참가자"
            name="drone"
            value="0"
            checked={isHost === "0"}
            onClick={() => setIsHost("0")}
          />
          <label htmlFor="참가자" style={{ padding: "0 0 0 4px" }}>
            참가자
          </label>
        </div>
        <h2>참가 링크</h2>
        <input value={url} onChange={(e: any) => setUrl(e.target.value)} />
        <br />
        <h2>참가자 이름</h2>
        <input value={name} onChange={(e: any) => setName(e.target.value)} />
        <br />
        <button onClick={getSignature}>Join Meeting</button>
      </main>

      {isEnter && (
        <div style={{ position: "absolute", top: 0, zIndex: 1, right: 0, display: "flex", wordWrap: "break-word" }}>
          <MainPage />
        </div>
      )}
    </div>
  );
}

export default App;
