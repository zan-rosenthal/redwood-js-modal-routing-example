import { useContext, useEffect, useState } from 'react'

import axios from 'axios'

import { navigate, routes } from '@redwoodjs/router'

import { ImageBox } from 'src/components/ImageBox'
import { ModalContext } from 'src/contexts/ModalContext'
import { BaseLayout } from 'src/layouts/BaseLayout'
import { ModalLayout } from 'src/layouts/ModalLayout'

export const Home = ({ children }) => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const { setModal } = useContext(ModalContext)

  useEffect(() => {
    const fetchImages = async () => {
      const data = await axios.get('https://random.dog/doggos')
      const images = data.data.slice(0, 10)
      setImages(images)
      setLoading(false)
    }

    fetchImages()
  })

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
            <ImageBox key={index} image={image} onClick={setModalContext} />
          ))}
        </div>
        {children}
      </div>
    </BaseLayout>
  )
}
