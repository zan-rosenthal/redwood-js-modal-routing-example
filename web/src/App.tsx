import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import { ModalContext } from './contexts/ModalContext'
import { useModal } from './hooks/useModal'

import './index.css'

const App = () => {
  const { modal, setModal } = useModal()

  return (
    <FatalErrorBoundary page={FatalErrorPage}>
      <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
        <RedwoodApolloProvider>
          <ModalContext.Provider value={{ modal, setModal }}>
            <Routes />
          </ModalContext.Provider>
        </RedwoodApolloProvider>
      </RedwoodProvider>
    </FatalErrorBoundary>
  )
}
export default App
