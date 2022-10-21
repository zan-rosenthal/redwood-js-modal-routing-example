// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { useContext } from 'react'

import { Route, Router, Set } from '@redwoodjs/router'

import { ModalContext } from './contexts/ModalContext'
import { Home } from './pages/Home'
import { ImageDetail } from './pages/ImageDetail'

const Routes = () => {
  const { modal } = useContext(ModalContext)

  return (
    <Router>
      <Route path="/" page={Home} name="home" />
      <Set wrap={modal}>
        <Route path="/images/{image}" name="imageDetail" page={ImageDetail} />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
