import { useContext } from 'react'

import { navigate, routes } from '@redwoodjs/router'

import { ImageBox } from 'src/components/ImageBox'
import { ImageContext } from 'src/contexts/ImageContext'
import { ModalContext } from 'src/contexts/ModalContext'
import { BaseLayout } from 'src/layouts/BaseLayout'
import { ModalLayout } from 'src/layouts/ModalLayout'

export const Home = ({ children }) => {
  const { setModal } = useContext(ModalContext)
  const { images, loading } = useContext(ImageContext)

  if (loading) return <div>Loading...</div>

  const setModalContext = (image) => {
    console.log('setting', image)
    setModal([Home, ModalLayout])
    navigate(routes.imageDetail({ image }))
  }

  return (
    <BaseLayout>
      <div id="Home">
        <div className="image-container">
          {images.map((image, index) => (
            <ImageBox key={index} image={image} handleClick={setModalContext} />
          ))}
        </div>
        {children}
      </div>
    </BaseLayout>
  )
}
