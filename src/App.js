import React from 'react'
import './App.css'
import Controls from './Controls.js'
import Tutorial from './Tutorial.js'

/*
 * This app will contain two components, a toggle and a button
 * When the toggle is off, the button will be disabled
 * When the toggle is on, the button will be enabled
 *
 * When the toggle is flipped, a note will be sent to the console (to emulate
 * hitting the database)
 * When the button is pressed, a note will be sent to the console
 */

function App() {
  const [showIntro, setShowIntro] = React.useState(true)

  const handleDismissTutorial = (event) => {
    if (event) {
      setShowIntro(false)
    }
  }

  return (
    <div className='App'>
      <header className='App-header'>
        {showIntro && <Tutorial handleDismissTutorial={handleDismissTutorial} />}
        {!showIntro && <Controls />}
      </header>
    </div>
  )
}

export default App
