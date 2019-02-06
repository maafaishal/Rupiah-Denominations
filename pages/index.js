import React from 'react'
import Head from 'next/head'
// import PropTypes from 'prop-types';

import Homepage from 'components/homepage'
import Container from 'components/container'

class Index extends React.Component {
  render () {
    return (
      <div>
        <Head>
          <title>Denomination Rupiah</title>
        </Head>
        <Container>
          <Homepage />
        </Container>
      </div>
    )
  }
}

Index.propTypes = {
}

export default Index
