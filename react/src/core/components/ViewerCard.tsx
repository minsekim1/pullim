import { BodyPix } from '@tensorflow-models/body-pix'
import { useCallback, useEffect, useRef, useState } from 'react'
import { BackgroundConfig } from '../helpers/backgroundHelper'
import { PostProcessingConfig } from '../helpers/postProcessingHelper'
import { SegmentationConfig } from '../helpers/segmentationHelper'
import { SourceConfig, SourcePlayback } from '../helpers/sourceHelper'
import { TFLite } from '../hooks/useTFLite'
import OutputViewer from './OutputViewer'
import SourceViewer from './SourceViewer'


type ViewerCardProps = {
  sourceConfig: SourceConfig
  backgroundConfig: BackgroundConfig
  segmentationConfig: SegmentationConfig
  postProcessingConfig: PostProcessingConfig
  bodyPix?: BodyPix
  tflite?: TFLite
}

function ViewerCard(props: ViewerCardProps) {
  const [sourcePlayback, setSourcePlayback] = useState<SourcePlayback>();

  useEffect(() => {
    setSourcePlayback(undefined)
  }, [props.sourceConfig])


  return (
    <div>
      <SourceViewer
        sourceConfig={props.sourceConfig}
        onLoad={setSourcePlayback}
      />
      {sourcePlayback && props.bodyPix && props.tflite ? (
        <OutputViewer
          sourcePlayback={sourcePlayback}
          backgroundConfig={props.backgroundConfig}
          segmentationConfig={props.segmentationConfig}
          postProcessingConfig={props.postProcessingConfig}
          bodyPix={props.bodyPix}
          tflite={props.tflite}
        />
      ) : (
        <div>
          대기중
        </div>
      )}
    </div>
  )
}

export default ViewerCard
