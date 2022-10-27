import { useEffect, useState } from 'react'

import axios from 'axios'

export const useFetchImages = () => {
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchImages = async () => {
      const data = await axios.get('https://random.dog/doggos')
      const images = data.data.slice(0, 10)
      setImages(images)
      setLoading(false)
    }

    fetchImages()
  })

  return { images, loading }
}
