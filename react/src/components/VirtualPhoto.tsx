import { BodyPix } from "@tensorflow-models/body-pix";
import React, { useEffect } from "react";
import { BackgroundConfig } from "../core/helpers/backgroundHelper";
import { PostProcessingConfig } from "../core/helpers/postProcessingHelper";
import { SegmentationConfig } from "../core/helpers/segmentationHelper";
import { SourcePlayback } from "../core/helpers/sourceHelper";
import useRenderingPipeline from "../core/hooks/useRenderingPipeline";
import { TFLite } from "../core/hooks/useTFLite";

interface VirtualPhotoPropsType {
  sourcePlayback: SourcePlayback;
  backgroundConfig: BackgroundConfig;
  segmentationConfig: SegmentationConfig;
  postProcessingConfig: PostProcessingConfig;
  bodyPix: BodyPix;
  tflite: TFLite;
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

  useEffect(() => {
    if (pipeline) {
      pipeline.updatePostProcessingConfig(props.postProcessingConfig);
    }
  }, [pipeline, props.postProcessingConfig]);


  return (
    <>
      <div style={{ width: "400px", height: "250px", position: "absolute", right: "0"}}>
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
