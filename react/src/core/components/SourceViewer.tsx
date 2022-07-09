import { SyntheticEvent, useEffect, useRef, useState } from 'react'
import { SourceConfig, SourcePlayback } from '../helpers/sourceHelper'

type SourceViewerProps = {
  sourceConfig: SourceConfig
  onLoad: (sourcePlayback: SourcePlayback) => void
}

function SourceViewer(props: SourceViewerProps) {
  const [sourceUrl, setSourceUrl] = useState<string>()
  const [isLoading, setLoading] = useState(false)
  const [isCameraError, setCameraError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setSourceUrl(undefined)
    setLoading(true)
    setCameraError(false)

    // Enforces reloading the resource, otherwise
    // onLoad event is not always dispatched and the
    // progress indicator never disappears
    setTimeout(() => setSourceUrl(props.sourceConfig.url))
  }, [props.sourceConfig])

  useEffect(() => {
    async function getCameraStream() {
      try {
        const constraint = { video: true }
        const stream = await navigator.mediaDevices.getUserMedia(constraint)
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          return
        }
      } catch (error) {
        console.error('Error opening video camera.', error)
      }
      setLoading(false)
      setCameraError(true)
    }

    // if (props.sourceConfig.type === 'camera') {
    //   getCameraStream()
    // } else if (videoRef.current) {
    //   videoRef.current.srcObject = null
    // }
  }, [props.sourceConfig])

  function handleImageLoad(event: SyntheticEvent) {
    const image = event.target as HTMLImageElement
    props.onLoad({
      htmlElement: image,
      width: image.naturalWidth,
      height: image.naturalHeight,
    })
    setLoading(false)
  }

  function handleVideoLoad(event: SyntheticEvent) {
    const video = event.target as HTMLVideoElement
    props.onLoad({
      htmlElement: video,
      width: video.videoWidth,
      height: video.videoHeight,
    })
    setLoading(false)
  }

  return (
    <div>
      {isLoading && <div>도는 중</div>}
      {props.sourceConfig.type === 'image' ? (
        <img
          src={sourceUrl}
          hidden={isLoading}
          alt=""
          onLoad={handleImageLoad}
        />
      ) : isCameraError ? (
        <div>video error</div>
      ) : (
        <video
          ref={videoRef}
          src={sourceUrl}
          hidden={isLoading}
          autoPlay
          playsInline
          controls={false}
          muted
          loop
          onLoadedData={handleVideoLoad}
        />
      )}
    </div>
  )
}

export default SourceViewer
