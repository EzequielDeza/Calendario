import './App.css'
import React from 'react';
import Calendario from './components/Calendario.jsx'
import Aside from './components/Aside.jsx';

function App() {
  return (
    <>
      <div className="flex h-screen">
        <Aside />
        <Calendario />
      </div>
    </>
  )
}

export default App
