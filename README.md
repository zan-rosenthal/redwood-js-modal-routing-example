## The Problem
Modal routing isn't possible out of the box with Redwood Router, because it does not allow for nested routes. Modal routing is when a page can open within the context of another page or as an independent route. To see an example, visit https://nomadlist.com/ and click on a city.
## Solution
The router's `<Set>` component allows for multiple parent layouts to wrap the page component for a given route. Using `<Set>` and React Context, we can set a parent page and modal layout around a route when navigating to it from the parent page. When the user visits the same route directly, and no modal context has been set, the `wrap` prop passed to `<Set>` will be empty, and the page component for the route will render without a parent layout.

## Code

This code renders an image gallery. When an image is clicked on from the home page, some details about that image are rendered in a modal format. If the url for that image is loaded directly, the image detail fills the full page.

Create modal context:

```javascript
// contexts/ModalContext.tsx

export const ModalContext = createContext({
  modal: [],
  setModal: () => {},
  isModalSet: false,
})

```

Wrap App in the provider:

```javascript
//src/App.tsx

import { ModalContext } from './contexts/ModalContext'
import { useModal } from './hooks/useModal'

const App = () => {
  const { modal, setModal } = useModal()

  return (
    <FatalErrorBoundary page={FatalErrorPage}>
      <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
        <RedwoodApolloProvider>
          <ModalContext.Provider
            value={{ modal, setModal }}
          >
            <Routes />
          </ModalContext.Provider>
        </RedwoodApolloProvider>
      </RedwoodProvider>
    </FatalErrorBoundary>
  )
}

...
```

In our routes file we have two routes, a home page that renders the image gallery and a page for showing detail about a single image. The route for the image detail is wrapped in Redwood Router's Set component. The Set component is passed some optional modal props which can affect what layouts the ImageDetail route gets wrapped in.

```javascript
// src/Routes.tsx

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
```

In our Home page, we fetch some images and render a gallery. If an image is clicked, it sets the modal context, which will get picked up in our routes, and navigates to the image detail page. Because the modal context is set, the image detail will render with the Home and ModalLayout components wrapping it.

```javascript

//src/pages/Home.tsx

export const Home = ({ children }) => {
  const { loading, images } = useFetchImages()

  if(loading) return <div>Loading... </div>

  const handleClick = (image) => {
    setModal([Home, ModalLayout])
    navigate(routes.imageDetail({ image }))
  }

  return (
    <BaseLayout>
      <div id="Home">
        <div className="image-container">
          {images.map((image, index) => (
            <ImageBox key={index} image={image} handleClick={handleClick} />
          ))}
        </div>
        {children}
      </div>
    </BaseLayout>
  )
}
```

If we stop here, there is one issue for users though. The hook we are using to load images will re-render when we open the image detail in the modal. This is because, it is re-rendering the Home page as part of the route transition. To remedy this, we can move the image fetching logic into its own context independent of the current rout.

```javascript
// src/contexts/ImageContext

import { Context, createContext } from 'react'

export const ImageContext: Context<{
  images: string[]
  loading: boolean
}> = createContext({
  images: [],
  loading: true,
})

```

And then, wrap our App with the ImageContext.Provider and move the hook to fetch the images up to App.tsx:

```javascript
// src/App.tsx

const App = () => {
  const modalContext = useModal()
  const imageContext = useFetchImages()

  return (
    <FatalErrorBoundary page={FatalErrorPage}>
      <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
        <RedwoodApolloProvider>
          <ImageContext.Provider value={imageContext}>
            <ModalContext.Provider
              value={{ modal, setModal, isModalSet: modal.length > 1 }}
            >
              <Routes />
            </ModalContext.Provider>
          </ImageContext.Provider>
        </RedwoodApolloProvider>
      </RedwoodProvider>
    </FatalErrorBoundary>
  )
}

```


This will allow to access the ImageDetail as both a modal page within a page and as an independent route filling the page. There are two downsides here.

1. The component wrapping the modal, in this case Home, needs to be built to render children when it is beign used as part of the layout.
2. Any application state that could cause the component wrapping the modal to re-render needs to exist independently above the router.

