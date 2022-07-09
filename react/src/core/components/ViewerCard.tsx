import { BodyPix } from '@tensorflow-models/body-pix'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useScreenshot } from "use-screenshot-hook"
import { UseScreenshotProps } from "use-screenshot-hook/dist/types"
import { PhotoType } from '../../types/PrescriptionType'
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
  const vedioRef = useRef();
  const [sourcePlayback, setSourcePlayback] = useState<SourcePlayback>();
  const [photoList, setPhotoList] = useState<PhotoType[]>([]);
  const { image, takeScreenshot } = useScreenshot({
    ref: vedioRef,
  } as UseScreenshotProps);
  const [isClick, setIsClick] = useState(false as any);

  useEffect(() => {
    setSourcePlayback(undefined)
  }, [props.sourceConfig])

  const onClickHandler = () => {
    //비디오 켰을 때 캡쳐 가능
    const canvasRef = document.querySelector("#gunbro");
    vedioRef.current = canvasRef as any;
    console.log(canvasRef);
    //클릭 완료!
    setIsClick(true);
  };

  const setImage = useCallback(async(image: string) =>{
    const now = new Date();
    const fileName = `photo_${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}.png`;

    await fetch(image)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], fileName,{ type: "image/png" });
        const obj = {
          image: image,
          name: fileName,
          file: file
        }
        console.log(obj);
        setPhotoList([obj, ...photoList]);
      });
  },[photoList, setPhotoList])

  //클릭했을 때 반응
  useEffect(() => {
    if (isClick) {
      takeScreenshot();
      setIsClick(false);
    }
  }, [isClick, takeScreenshot]);

  useEffect(() => {
    if (isClick && image) {
      setImage(image);
    }
  }, [isClick, image, setImage]);

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
      <button onClick={onClickHandler}>버튼입니다!!!!!!!!!!</button>
      {photoList.length !== 0 && photoList.map((el, i) => (<div key={i} style={{width: "200px"}}><img style={{width: "100%"}} src={el.image}/></div>))}
    </div>
  )
}

export default ViewerCard
