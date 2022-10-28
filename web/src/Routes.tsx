import { useContext } from 'react'

import { Route, Router, Set } from '@redwoodjs/router'

import { ModalContext } from './contexts/ModalContext'
import { Home } from './pages/Home'
import { ImageDetail } from './pages/ImageDetail'

const Routes = () => {
  const { modal, isModalSet } = useContext(ModalContext)
  const modalProps = isModalSet ? { wrap: modal } : {}

  return (
    <Router>
      <Route path="/" page={Home} name="home" />
      <Set {...modalProps}>
        <Route path="/images/{image}" name="imageDetail" page={ImageDetail} />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
