import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    paddingRight: 15,
    paddingLeft: 15,
    marginRight: 'auto',
    marginLeft: 'auto',
    maxWidth: 600
  }
})

class Container extends Component {
  render () {
    const { classes, children, style } = this.props
    return (
      <div className={classes.root} style={style}>
        {children}
      </div>
    )
  }
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  style: PropTypes.any
}

export default withStyles(styles)(Container)
