import { ImageBox } from 'src/components/ImageBox'

export const ImageDetail = ({ image }) => {
  console.log('image', image)
  return (
    <div className="rw-scaffold">
      <div className="image-detail">
        <ImageBox image={image} />
      </div>
    </div>
  )
}
