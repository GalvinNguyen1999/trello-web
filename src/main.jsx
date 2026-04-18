import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from '~/theme'

import { ToastContainer } from 'react-toastify'
import { ConfirmProvider } from 'material-ui-confirm'
import 'react-toastify/dist/ReactToastify.css'

// Cấu hình Redux
import { Provider } from 'react-redux'
import { store } from './redux/strore'

// Cau hinh Redux Persist
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
const persistor = persistStore(store)

// Ky thuat inject store: là kỹ thuật cho phép store có thể truy cập được từ các file khác ngoài component
import { injectStore } from './utils/authorizeAxios'
injectStore(store)

// Cấu hình react-router-dom với browser router
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter basename='/'>
        <CssVarsProvider theme={theme}>
          <ConfirmProvider defaultOptions={{
            allowClose: true,
            buttonOrder: ['confirm', 'cancel'],
            dialogProps: {
              maxWidth: 'xs'
            }
          }}>
            <GlobalStyles styles={{ a: { textDecoration: 'none', color: 'inherit' } }} />
            <CssBaseline />
            <App />
            <ToastContainer theme='colored' position='bottom-left' />
          </ConfirmProvider>
        </CssVarsProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
)
