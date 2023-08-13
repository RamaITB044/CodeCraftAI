import { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import './App.scss'
import AnimatedRoutes from './components/AnimatedRoutes';
import { Provider } from 'react-redux'
import { store } from './store';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { metaData } from './slices/authSlice';

function App() {

  return (
    <div className="App">
      <Toaster toastOptions={{
        style: {
          minWidth: '250px',
          borderRadius: '5px',
          border: '1px solid #306BFF',
          background: '#333',
          color: '#BFBFBF',
        },
        success: {
          iconTheme: {
            primary: 'white',
            secondary: 'black',
          },
        },
      }} />
      <Provider store={store}>
        <Router>
          <MantineProvider theme={{ colorScheme: 'dark', fontFamily: 'Lexend, sans-serif' }} withGlobalStyles withNormalizeCSS>
            <AnimatedRoutes />
          </MantineProvider>
        </Router>
      </Provider>
    </div>
  )
}

export default App
