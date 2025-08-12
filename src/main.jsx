import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'


import GlobalStyle from './styles/globalStyles'

import { ToastContainer } from 'react-toastify'

import AppProvider from './hooks'
import { Elements } from '@stripe/react-stripe-js'
import stripePromise from './config/stripeConfig'
import { ThemeProvider } from 'styled-components'
import { standardTheme } from './styles/themes/standard'

import { BrowserRouter } from 'react-router-dom'
import { RouterApp } from './routes'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={standardTheme}>
      <AppProvider>
        <Elements stripe={stripePromise} >
          <BrowserRouter>
            <RouterApp/>
          </BrowserRouter>
        </Elements>
        <GlobalStyle />

        <ToastContainer autoClose={2000} theme='colored' />
      </AppProvider>
    </ThemeProvider>
  </StrictMode>,
)
