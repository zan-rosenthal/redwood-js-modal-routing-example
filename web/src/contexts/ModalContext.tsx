import { createContext } from 'react'

export const ModalContext = createContext({
  modal: [],
  setModal: () => {},
  isModalSet: false,
})
