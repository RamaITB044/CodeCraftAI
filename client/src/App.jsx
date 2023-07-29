import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss'
import AnimatedRoutes from './components/AnimatedRoutes';

function App() {

  return (
    <div className="App">
      <Router>
        <AnimatedRoutes />
      </Router>
    </div>
  )
}

export default App
