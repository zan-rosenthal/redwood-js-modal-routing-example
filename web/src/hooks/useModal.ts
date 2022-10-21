import { useState } from 'react'

export const useModal = () => {
  const [modal, setModal] = useState([])

  return { modal, setModal }
}
