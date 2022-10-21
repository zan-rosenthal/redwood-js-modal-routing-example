export const ImageBox = ({ image, onClick }) => {
  return (
    <div className="image-box" onClick={() => onClick(image)}>
      <img src={`https://random.dog/${image}`} alt="doggo" />
    </div>
  )
}
