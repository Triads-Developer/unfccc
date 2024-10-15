import React from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'

function Tutorial({ handleDismissTutorial }) {
  return (
    <>
      <div className='tutorial-box'>
        <p>Welcome to Washington University in St. Louis&apos; UNFCCC COP FLOP database.</p>
        <p>
          This site will allow you to view, query and export data from the UNFCCC COP 29 Final List of Participants data set (FLOP data) for
          on-site delegates.
        </p>
        <p>
          The underlying data can be found on the <Link href='https://unfccc.int/documents/636676'>United Nations Climate Change site</Link>{' '}
        </p>

        <Button variant='text' id='tutorial-button' onClick={handleDismissTutorial}>
          Begin searching
        </Button>
      </div>
    </>
  )
}

Tutorial.propTypes = {
  handleDismissTutorial: PropTypes.func
}

export default Tutorial
