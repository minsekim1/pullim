(this["webpackJsonpmeetingsdk-sample-react"]=this["webpackJsonpmeetingsdk-sample-react"]||[]).push([[0],{287:function(e,t,n){},288:function(e,t,n){},335:function(e,t){},336:function(e,t){},344:function(e,t){},347:function(e,t){},348:function(e,t){},351:function(e,t,n){"use strict";n.r(t);var r=n(33),o=n.n(r),i=n(255),c=n.n(i),s=(n(287),n(200)),l=n(1),u=(n(288),n(97)),a=n(5),d=n(11),b=n(258),j=n.n(b),h=n(23);function p(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{Array:Array,Function:Function},t=e.photoList,n=e.setPhotoList,o=e.setIsModal,i=e.setSrc,c=Object(r.useRef)([]),s=Object(r.useRef)([]),l=function(){var e=Object(d.a)(Object(a.a)().mark((function e(){var n;return Object(a.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new FormData,t.forEach((function(e,t){var r=new Blob([e],{type:"image/png"});n.append("photos",r,"photo"+t)})),e.next=4,j.a.post("/photo",n).then((function(e){return e.data}));case 4:e.sent.success&&alert("\uc800\uc7a5 \uc644\ub8cc!");case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),u=function(e,r){var o=t.filter((function(e,t){return r!==t})),i=c.current.filter((function(e,t){return r!==t})),l=s.current.filter((function(e,t){return r!==t}));console.log("\uc0ad\uc81c\ub41c \uac83",r),n(o),c.current=i,s.current=l};return Object(r.useEffect)((function(){return void 0!==c.current&&void 0!==s.current&&t.forEach((function(e,t){var n,r;null===(n=c.current[t])||void 0===n||n.addEventListener("mouseover",(function(){s.current[t].style.display="block"})),null===(r=c.current[t])||void 0===r||r.addEventListener("mouseleave",(function(){s.current[t].style.display="none"}))})),function(){t.forEach((function(e,t){var n,r;void 0!==c.current&&void 0!==s.current&&(null===(n=c.current[t])||void 0===n||n.removeEventListener("mouseover",(function(){s.current[t].style.display="block"})),null===(r=c.current[t])||void 0===r||r.removeEventListener("mouseleave",(function(){s.current[t].style.display="none"})))}))}}),[t]),Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)("h4",{style:{color:"black"},children:"\uc800\uc7a5\ub41c \ud654\uba74\ucea1\ucc98 \ud654\uba74"}),Object(h.jsx)("div",{style:{width:"100%",height:"90vh",color:"white",display:"flex",flexDirection:"column",alignItems:"center",overflowY:"auto"},children:Object(h.jsx)("div",{style:{minHeight:"500px",width:"100%"},children:0!==t.length&&t.map((function(e,n){return Object(h.jsxs)("div",{ref:function(e){return c.current[n]=e},style:{width:"100%",height:"250px",marginBottom:"10px",position:"relative"},children:[Object(h.jsx)("img",{style:{width:"100%",height:"100%"},src:e,alt:"asa",onClick:function(){o(!0),i(t[n])}}),Object(h.jsx)("button",{ref:function(e){return s.current[n]=e},style:{position:"absolute",bottom:0,right:2,width:"30px",background:"red",borderRadius:"50px",display:"none"},onClick:function(e){return u(e,n)},children:"x"})]},n)}))})}),Object(h.jsx)("section",{style:{display:"flex",width:"100%"},children:Object(h.jsx)("button",{style:{width:"100%",height:"10vh",background:"red",borderRadius:"5px",color:"white",fontSize:"11px"},onClick:l,children:"\uc0ac\uc9c4\uc800\uc7a5"})})]})}var f=n(18),x=n(259);var O=function(e){var t=e.setPhotoList,n=e.photoList,o=Object(r.useRef)(),i=Object(r.useState)(!1),c=Object(l.a)(i,2),s=c[0],u=c[1],a=Object(x.a)({ref:o}),d=a.image,b=a.takeScreenshot;return Object(r.useEffect)((function(){s&&(b(),u(!1))}),[s]),Object(r.useEffect)((function(){console.log(d),d&&t([d].concat(Object(f.a)(n)))}),[d]),Object(h.jsx)(h.Fragment,{children:Object(h.jsx)("button",{id:"screenshot_btn",style:{width:"100px",height:"40px",background:"royalblue",borderRadius:"5px",color:"white",fontSize:"11px",margin:"3px"},onClick:function(){var e=document.querySelector(".single-main-container__canvas");o.current=e,u(!0)},children:"\ud654\uba74\ucea1\ucc98"})})};var g=function(e){var t=e.setCurrentPage,n=Object(r.useState)(0),o=Object(l.a)(n,2),i=o[0],c=o[1];return Object(h.jsx)("button",{style:{width:"100px",height:"40px",background:"royalblue",borderRadius:"5px",color:"white",fontSize:"11px",margin:"3px"},onClick:function(){var e=document.getElementById("pullim-page");e.style.display=i%2===0?"flex":"none",c(i+1),t("CheckTool")},children:"\uac80\uc0ac\ud234"})};var v=function(e){var t=e.setCurrentPage,n=Object(r.useRef)(),o=Object(r.useState)(0),i=Object(l.a)(o,2),c=i[0],s=i[1];return Object(h.jsx)("button",{ref:n,style:{width:"100px",height:"40px",background:"royalblue",borderRadius:"5px",color:"white",fontSize:"11px",margin:"3px"},onClick:function(){var e=document.getElementById("pullim-page");e.style.display=c%2===0?"flex":"none",s(c+1),t("CaptureList")},children:"\uc800\uc7a5\ub41c \ud654\uba74\ucea1\ucc98 \ud654\uba74"})};var m=function(e){var t=e.setCurrentPage,n=Object(r.useState)(0),o=Object(l.a)(n,2),i=o[0],c=o[1];return Object(h.jsx)("button",{onClick:function(){var e=document.getElementById("pullim-page");e.style.display=i%2===0?"flex":"none",c(i+1),t("RecordAndPrescription")},style:{width:"100px",height:"40px",background:"royalblue",borderRadius:"5px",color:"white",fontSize:"11px",margin:"3px"},children:"\uc9c4\ub2e8 \uae30\ub85d \ubc0f \uc6b4\ub3d9(VOD) \ucc98\ubc29"})};var y=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{Function:Function,Array:Array},t=e.setPhotoList,n=e.photoList,o=e.setCurrentPage,i=Object(r.useRef)(),c=Object(r.useRef)();return Object(r.useEffect)((function(){return void 0!==c.current&&void 0!==i.current&&(i.current.addEventListener("mouseover",(function(){c.current.style.display="flex"})),i.current.addEventListener("mouseleave",(function(){c.current.style.display="none"}))),function(){void 0!==c.current&&void 0!==i.current&&(i.current.removeEventListener("mouseover",(function(){c.current.style.display="flex"})),i.current.removeEventListener("mouseleave",(function(){c.current.style.display="none"})))}}),[]),Object(h.jsx)("div",{ref:i,style:{position:"absolute",bottom:"30%",zIndex:100,left:"1%",width:"150px",minHeight:"180px"},children:Object(h.jsxs)("div",{ref:c,style:{display:"none",flexDirection:"column",width:"300px"},children:[Object(h.jsx)(v,{setCurrentPage:o}),Object(h.jsx)(O,{setPhotoList:t,photoList:n}),Object(h.jsx)(g,{setCurrentPage:o}),Object(h.jsx)(m,{setCurrentPage:o})]})})};var w=function(){return Object(h.jsx)("div",{children:"RecordAndPrescription"})};var S=function(){return Object(h.jsx)("div",{children:"CheckTool"})},k=n(260),C=function(){var e=Object(r.useState)(!1),t=Object(l.a)(e,2),n=t[0],o=t[1],i=Object(r.useState)(!1),c=Object(l.a)(i,2),s=c[0],u=c[1];return console.log("asd"),Object(h.jsxs)("div",{children:[Object(h.jsx)("button",{style:{marginLeft:"100px"},onClick:function(){u(!s)},disabled:!!s,children:"Start"}),Object(h.jsx)("button",{style:{marginLeft:"100px",marginBottom:"100px"},onClick:function(){o(!n)},children:n?"Hide View":"Show View"}),Object(h.jsx)("br",{})," ",Object(h.jsx)("br",{}),Object(h.jsx)(k.a,{options:{showFps:!1,mediaOptions:{audio:!1}},visible:n,start:s,onEvent:function(e){if("READY"===e.event){var t=document.getElementById("remoteDisplay");null!==t&&(t.srcObject=e.stream,t.play())}}}),Object(h.jsx)("br",{}),Object(h.jsx)("div",{style:{zIndex:99999},children:"asd"})]})};u.ZoomMtg.setZoomJSLib("https://source.zoom.us/2.4.5/lib","/av"),u.ZoomMtg.preLoadWasm(),u.ZoomMtg.prepareWebSDK(),u.ZoomMtg.i18n.load("ko-KO"),u.ZoomMtg.i18n.reload("ko-KO");var L=function(){var e=Object(r.useState)("https://zoom.us/j/92062736514?pwd=Nnh0NE4zRHJMZDA1eDljZ2hVY0JMUT09"),t=Object(l.a)(e,2),n=t[0],o=t[1],i=Object(r.useState)(""),c=Object(l.a)(i,2),a=c[0],d=c[1],b=Object(r.useState)(!1),j=Object(l.a)(b,2),f=j[0],x=j[1],O=Object(r.useState)("0"),g=Object(l.a)(O,2),v=g[0],m=g[1],k=Object(r.useState)([]),L=Object(l.a)(k,2),E=L[0],P=L[1],R=Object(r.useState)(""),I=Object(l.a)(R,2),D=I[0],z=I[1],F=Object(r.useState)(!1),M=Object(l.a)(F,2),A=M[0],B=M[1],Z=Object(r.useState)(""),K=Object(l.a)(Z,2),H=K[0],J=K[1],N=Object(r.useState)(!1),T=Object(l.a)(N,2),V=T[0],U=T[1];Object(r.useEffect)((function(){if(document){var e=document.location.href.split("?url=")[1];e&&o(e)}}),[]);var q="xPN1ctkMLTAqaWGsE7FDSonJSEOO8B0XtQf8",W=n.slice(n.indexOf("/j/")+3,n.indexOf("pwd=")-1),Y=n.slice(n.indexOf("pwd=")+4,n.length);return Object(h.jsxs)("div",{className:"App",children:[Object(h.jsxs)("main",{children:[Object(h.jsx)("h1",{children:"Zoom Meeting SDK Sample React"}),Object(h.jsx)("br",{}),Object(h.jsx)("p",{children:"\uc8fc\uc18c \ucc3d\uc5d0 zoom url\uc744 \uc785\ub825\ud558\uba74 \ud574\ub2f9 ZOOM\uc73c\ub85c \uc811\uadfc\uc774 \uac00\ub2a5\ud569\ub2c8\ub2e4."}),Object(h.jsx)("br",{}),Object(h.jsxs)("p",{children:["\uc608: http://localhost:3000/?url=",n]}),Object(h.jsx)("br",{}),Object(h.jsxs)("div",{style:{display:"flex",justifyContent:"center"},children:[Object(h.jsx)("input",{type:"radio",id:"\ud2b8\ub808\uc774\ub108",name:"drone",value:"1",checked:"1"==v,onClick:function(){return m("1")}}),Object(h.jsx)("label",{htmlFor:"\ud2b8\ub808\uc774\ub108",style:{padding:"0 0 0 4px"},children:"\ud2b8\ub808\uc774\ub108(\ud638\uc2a4\ud2b8)"}),Object(h.jsx)("div",{style:{marginRight:8}}),Object(h.jsx)("input",{type:"radio",id:"\ucc38\uac00\uc790",name:"drone",value:"0",checked:"0"==v,onClick:function(){return m("0")}}),Object(h.jsx)("label",{htmlFor:"\ucc38\uac00\uc790",style:{padding:"0 0 0 4px"},children:"\ucc38\uac00\uc790"})]}),Object(h.jsx)("h2",{children:"\ucc38\uac00\uc790 \uc774\ub984"}),Object(h.jsx)("input",{value:a,onChange:function(e){return d(e.target.value)}}),Object(h.jsx)("br",{}),Object(h.jsx)("button",{onClick:function(e){e.preventDefault();var t=document.getElementById("zmmtg-root");if(t){t.style.display="block";var n={leaveUrl:"http://localhost:3000",showMeetingHeader:!0,disableInvite:!1,disableCallOut:!1,disableRecord:!1,disableJoinAudio:!1,audioPanelAlwaysOpen:!0,showPureSharingContent:!0,isSupportAV:!0,isSupportChat:!0,isSupportQA:!0,isSupportCC:!0,isSupportPolling:!0,isSupportBreakout:!0,screenShare:!0,videoDrag:!0,videoHeader:!1,isLockBottom:!1,isSupportNonverbal:!0,isShowJoiningErrorDialog:!0,inviteUrlFormat:"https://localhost:3000/?url=https://us04web.zoom.us/j/{0}?pwd={1}",meetingInfo:["participant"],disableVoIP:!1,disableReport:!1,disablePreview:!1,disableCORP:!1,onRetryCallback:!0,enableHD:!0,helper:"what"},r={signature:u.ZoomMtg.generateSDKSignature({sdkKey:q,sdkSecret:"zaPNq6sYv9uKIUUI5wVCHGnqwnC8nG8F2p4U",meetingNumber:W,role:v,success:function(){return console.info("generateSDKSignature success")},error:function(e){return console.info("generateSDKSignature fail",e)}}),meetingNumber:W,userName:a,sdkKey:q,userEmail:"",passWord:Y,tk:"",success:function(e){console.log("\uc131\uacf5"),x(!0)},error:function(e){return console.log(e)}};u.ZoomMtg.init(Object(s.a)(Object(s.a)({},n),{},{success:function(e){return u.ZoomMtg.join(r)},error:function(e){return console.log(e)}}))}},children:"Join Meeting"})]}),f&&Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)("div",{id:"pullim-page",style:{width:"400px",position:"absolute",top:0,zIndex:1,right:0,display:"none",height:"100vh",backgroundColor:"rgba(255,255,255)",color:"white",flexDirection:"column",alignItems:"center",borderRadius:"1% 0 0 1%",overflow:"hidden"},children:["CaptureList"===D&&Object(h.jsx)(p,{photoList:E,setPhotoList:P,setIsModal:B,setSrc:J}),"RecordAndPrescription"===D&&Object(h.jsx)(w,{}),"CheckTool"===D&&Object(h.jsx)(S,{})]}),Object(h.jsx)(y,{setPhotoList:P,photoList:E,setCurrentPage:z}),Object(h.jsx)("div",{style:{position:"absolute",zIndex:99999,top:400,left:0},children:Object(h.jsx)("button",{onClick:function(){return U((function(e){return!e}))},style:{color:"white"},children:"\uadf8\ub9ac\ub4dc\uc804\ud658"})}),V&&Object(h.jsx)("div",{style:{position:"absolute",left:0,zIndex:99999999999,top:0,width:300,height:"60vh",backgroundColor:"rgba(0,0,0,0.4)",color:"white",display:"flex",flexDirection:"column",alignItems:"center",overflow:"scroll"},children:Object(h.jsx)("div",{style:{minHeight:"1000px"},children:Object(h.jsx)(C,{})})}),A&&Object(h.jsx)("div",{style:{zIndex:1,position:"absolute",width:"1100px",top:"10%",left:"10%"},children:Object(h.jsx)("img",{style:{width:"100%"},onClick:function(){B(!1)},src:H,alt:"aa"})})]})]})},E=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,352)).then((function(t){var n=t.getCLS,r=t.getFID,o=t.getFCP,i=t.getLCP,c=t.getTTFB;n(e),r(e),o(e),i(e),c(e)}))};c.a.render(Object(h.jsx)(o.a.StrictMode,{children:Object(h.jsx)(L,{})}),document.getElementById("root")),E()}},[[351,1,2]]]);
//# sourceMappingURL=main.4733184d.chunk.js.map