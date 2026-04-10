import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from '~/theme'

import { ToastContainer } from 'react-toastify'
import { ConfirmProvider } from 'material-ui-confirm'
import 'react-toastify/dist/ReactToastify.css'

// Cấu hình Redux
import { Provider } from 'react-redux'
import { store } from './redux/strore'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <CssVarsProvider theme={theme}>
      <ConfirmProvider defaultOptions={{
        allowClose: true,
        buttonOrder: ['confirm', 'cancel'],
        dialogProps: {
          maxWidth: 'xs'
        }
      }}>
        <CssBaseline />
        <App />
        <ToastContainer theme='colored' position='bottom-left' />
      </ConfirmProvider>
    </CssVarsProvider>
  </Provider>
)
