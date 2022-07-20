import { BodyPix } from "@tensorflow-models/body-pix";
import React, { useState } from "react";
import VirtualPhoto from "../components/VirtualPhoto";

import {
  BackgroundConfig,
} from "../core/helpers/backgroundHelper";
import { PostProcessingConfig } from "../core/helpers/postProcessingHelper";
import { SegmentationConfig } from "../core/helpers/segmentationHelper";
import { SourcePlayback } from "../core/helpers/sourceHelper";
import { TFLite } from "../core/hooks/useTFLite";

interface CheckToolPropsType {
  sourcePlayback: SourcePlayback;
  backgroundConfig: BackgroundConfig;
  segmentationConfig: SegmentationConfig;
  postProcessingConfig: PostProcessingConfig;
  bodyPix: BodyPix;
  tflite: TFLite;
}

function CheckTool({
  sourcePlayback,
  backgroundConfig,
  segmentationConfig,
  bodyPix,
  tflite,
  postProcessingConfig
}: CheckToolPropsType) {

  return (
    <div
      style={{
        zIndex: "99",
        position: "absolute",
        top: 0,
        width: "100%",
        height: "100%",
        background: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {sourcePlayback && tflite && bodyPix && (
        <VirtualPhoto
          sourcePlayback={sourcePlayback}
          backgroundConfig={backgroundConfig}
          segmentationConfig={segmentationConfig}
          postProcessingConfig={postProcessingConfig}
          bodyPix={bodyPix}
          tflite={tflite}
        />
      )}
    </div>
  );
}

export default CheckTool;
