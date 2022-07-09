export type BackgroundConfig = {
  type: 'none' | 'blur' | 'image'
  url?: string
}

export const backgroundImageUrls = [
  'grid_background',
].map((imageName) => `${process.env.PUBLIC_URL}/backgrounds/${imageName}.png`)
