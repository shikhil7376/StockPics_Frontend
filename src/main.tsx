import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {NextUIProvider} from '@nextui-org/react'
import './index.css'
import App from './App.tsx'
import { persistor,store } from './redux/store.ts'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'



createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
  <StrictMode>
  <NextUIProvider>
      <App />
    </NextUIProvider>
  </StrictMode>,
  </PersistGate>
  </Provider>
)
