import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss'
import AnimatedRoutes from './components/AnimatedRoutes';
import { Provider } from 'react-redux'
import { store } from './store';

function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <AnimatedRoutes />
        </Router>
      </Provider>
    </div>
  )
}

export default App
