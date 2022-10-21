import { createContext } from 'react'

// type ModalContextType = {
//   modal: FunctionComponent[]
//   setModal: Dispatch<SetStateAction<FunctionComponent[]>>
// }

export const ModalContext = createContext({
  modal: [],
  setModal: () => {},
})
