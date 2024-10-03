import React from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'

function Tutorial({ handleDismissTutorial }) {
  return (
    <>
      <p>Welcome to Washu&apos;s UNFCCC Flopdata database </p>
      <p>This site will allow you to query 2023&apos;s UNFCCC Flopdata </p>
      <Button
        variant='text'
        sx={{
          backgroundColor: '#971B2F',
          color: 'white',
          '&:hover': {
            backgroundColor: 'blue'
          },
          margin: '10px'
        }}
        onClick={handleDismissTutorial}
      >
        Begin searching!
      </Button>
    </>
  )
}

Tutorial.propTypes = {
  handleDismissTutorial: PropTypes.func
}

export default Tutorial
