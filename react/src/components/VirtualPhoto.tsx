import { BodyPix } from "@tensorflow-models/body-pix";
import React, { useCallback, useEffect } from "react";
import { BackgroundConfig } from "../core/helpers/backgroundHelper";
import { PostProcessingConfig } from "../core/helpers/postProcessingHelper";
import { SegmentationConfig } from "../core/helpers/segmentationHelper";
import { SourcePlayback } from "../core/helpers/sourceHelper";
import useRenderingPipeline from "../core/hooks/useRenderingPipeline";
import { TFLite } from "../core/hooks/useTFLite";
import { PhotoType } from "../types/PrescriptionType";

interface VirtualPhotoPropsType {
  sourcePlayback: SourcePlayback;
  backgroundConfig: BackgroundConfig;
  segmentationConfig: SegmentationConfig;
  postProcessingConfig: PostProcessingConfig;
  bodyPix: BodyPix;
  tflite: TFLite;
  setCheckedPhotoList: Function;
  checkedPhotoList: PhotoType[];
  isClick: Boolean;
  setIsClick: Function;
}

function VirtualPhoto(props: VirtualPhotoPropsType) {
  const {
    pipeline,
    backgroundImageRef,
    canvasRef,
    // fps,
    // durations: [resizingDuration, inferenceDuration, postProcessingDuration],
  } = useRenderingPipeline(
    props.sourcePlayback,
    props.backgroundConfig,
    props.segmentationConfig,
    props.bodyPix,
    props.tflite
  );

  // const bringImage = useCallback(() => {
  //   if (canvasRef.current) {
  //     const canvas = canvasRef.current;
  //     const img = canvas.toDataURL("image/png");
  //     return img;
  //   }
  // },[canvasRef]);

  // const setImage = useCallback(
  //   async (image: string | undefined) => {
  //     if (!image) {
  //       return;
  //     }

  //     const now = new Date();
  //     const fileName = `checked_photo_${now.getFullYear()}${
  //       now.getMonth() + 1
  //     }${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}.png`;

  //     await fetch(image)
  //       .then((res) => res.blob())
  //       .then((blob) => {
  //         const file = new File([blob], fileName, { type: "image/png" });
  //         const obj: PhotoType = {
  //           image: image,
  //           name: fileName,
  //           file: file,
  //         };
  //         props.setCheckedPhotoList([obj, ...props.checkedPhotoList]);
  //       });
  //   },
  //   [props]
  // );

  useEffect(() => {
    if (pipeline) {
      pipeline.updatePostProcessingConfig(props.postProcessingConfig);
    }
  }, [pipeline, props.postProcessingConfig]);

  // useEffect(() => {
  //   if (props.isClick) {
  //     const image = bringImage();
  //     console.log(image);
  //     setImage(image);
  //     console.log("이미지 저장2");
  //     // props.setIsClick(false);
  //   }
  // }, [bringImage, props, setImage, pipeline]);

  return (
    <>
      <div style={{ width: "400px", height: "250px", position: "absolute", right: "-100%"}}>
        {props.backgroundConfig.type === "image" && (
          <img
            ref={backgroundImageRef}
            src={props.backgroundConfig.url}
            alt=""
            hidden={props.segmentationConfig.pipeline === "webgl2"}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            />
            )}
        <canvas
          id="grid-bg-photo"
          // The key attribute is required to create a new canvas when switching
          // context mode
          key={props.segmentationConfig.pipeline}
          ref={canvasRef}
          width={props.sourcePlayback.width}
          height={props.sourcePlayback.height}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          />
      </div>
    </>
  );
}

export default VirtualPhoto;
