const noop = () => {}

export const ImageBox = ({ image, handleClick = noop }) => {
  return (
    <div className="image-box" onClick={() => handleClick(image)}>
      <img src={`https://random.dog/${image}`} alt="doggo" />
    </div>
  )
}
