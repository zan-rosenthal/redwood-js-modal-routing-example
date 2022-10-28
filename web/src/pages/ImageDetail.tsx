import { useContext } from 'react'

import { ImageBox } from 'src/components/ImageBox'
import { ModalContext } from 'src/contexts/ModalContext'

export const ImageDetail = ({ image }) => {
  const { modal, isModalSet } = useContext(ModalContext)

  return (
    <div className="rw-scaffold">
      {!isModalSet && (
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
