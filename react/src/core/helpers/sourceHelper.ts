export type SourceConfig = {
  type: 'image'
  url?: string
}

export type SourcePlayback = {
  htmlElement: HTMLImageElement | HTMLVideoElement
  width: number
  height: number
}

export const sourceImageUrls = [
  'duckju',
].map((imageName) => `${process.env.PUBLIC_URL}/images/${imageName}.png`)

export const sourceVideoUrls = [
  'Dance - 32938',
  'Doctor - 26732',
  'Thoughtful - 35590',
].map((videoName) => `${process.env.PUBLIC_URL}/videos/${videoName}.mp4`)
