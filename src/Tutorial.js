import React from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'

function Tutorial({ handleDismissTutorial }) {
  return (
    <>
      <div className='tutorial-box'>
        <p>Welcome to Washu&apos;s UNFCCC Flopdata database </p>
        <p>This site will allow you to query 2023&apos;s UNFCCC Flopdata </p>
        <Button variant='text' id='tutorial-button' onClick={handleDismissTutorial}>
          Begin searching!
        </Button>
      </div>
    </>
  )
}

Tutorial.propTypes = {
  handleDismissTutorial: PropTypes.func
}

export default Tutorial
