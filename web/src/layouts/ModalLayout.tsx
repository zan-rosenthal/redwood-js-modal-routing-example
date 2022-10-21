import { back } from '@redwoodjs/router'

export const ModalLayout = ({ children }) => {
  return (
    <div id="modal" className="modal-overlay" onClick={back}>
      {children}
    </div>
  )
}
