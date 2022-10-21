import { useContext } from 'react'

import { ImageBox } from 'src/components/ImageBox'
import { ModalContext } from 'src/contexts/ModalContext'

export const ImageDetail = ({ image }) => {
  const { modal } = useContext(ModalContext)
  const noModalSet = !(modal.length > 0)

  return (
    <div className="rw-scaffold">
      {noModalSet && (
        <header>
          <h1>This header shows outside of modal navigation</h1>
        </header>
      )}
      <div className="image-detail">
        <ImageBox image={image} />
      </div>
    </div>
  )
}
