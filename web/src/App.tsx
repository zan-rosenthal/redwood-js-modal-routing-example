import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import { ImageContext } from './contexts/ImageContext'
import { ModalContext } from './contexts/ModalContext'
import { useFetchImages } from './hooks/useFetchImages'
import { useModal } from './hooks/useModal'

import './index.css'

const App = () => {
  const { modal, setModal } = useModal()
  const imageContext = useFetchImages()

  return (
    <FatalErrorBoundary page={FatalErrorPage}>
      <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
        <RedwoodApolloProvider>
          <ImageContext.Provider value={imageContext}>
            <ModalContext.Provider value={{ modal, setModal }}>
              <Routes />
            </ModalContext.Provider>
          </ImageContext.Provider>
        </RedwoodApolloProvider>
      </RedwoodProvider>
    </FatalErrorBoundary>
  )
}
export default App
