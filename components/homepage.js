import React from 'react'
import PropTypes from 'prop-types'
import {
  TextField,
  Button,
  Grid,
  Typography
} from '@material-ui/core'

import { withStyles } from '@material-ui/core/styles'
import MoneyTable from 'components/moneyTable'

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: 'calc(50vh - 166px)',

    '& .topHeader': {
      '& .title': {
        fontWeight: 600,
        marginBottom: 50,
        fontSize: 40,
        color: '#333'
      },

      '& img': {
        width: 300,
        marginBottom: 15
      }
    }
  },
  [theme.breakpoints.down('xs')]: {
    root: {
      textAlign: 'center',
      paddingTop: 'calc(50vh - 230px)',

      '& .topHeader': {
        '& .title': {
          fontSize: 40
        }
      },

      '& img': {
        width: '100%',
        maxWidth: 200
      }
    }
  }
})

class Index extends React.Component {
  state = {
    amount: '',
    amountLeft: null,
    process: false,
    error: '',
    result: []
  };

  // to change the values
  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
  };

  // detect enter button
  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.processMoney()
    }
  }

  processMoney = () => {
    this.setState({ process: true, amountLeft: null, result: [], error: '' })
    const fractions = [100000, 50000, 20000, 10000, 5000, 1000, 500, 100, 50]
    let amount = parseInt(this.state.amount)
    let temp = []
    let result = []

    const validation = this.validationAmount(this.state.amount)

    if (validation) {
      amount = validation

      // calculate the minimum number of rupiahs process
      while (amount >= 50) {
        for (var i = 0; i < fractions.length; i++) {
          if (amount >= fractions[i]) {
            temp[fractions[i]] = temp[fractions[i]] ? temp[fractions[i]] + 1 : 1
            amount = amount - fractions[i]
            break
          }
        }
      }

      // sort descending the result above
      let resultOrder = temp.length - 1
      temp.forEach((value, key) => {
        result[resultOrder] = { money: key, total: value }
        resultOrder--
      })

      this.setState({ amountLeft: amount, result: result })
    }

    this.setState({ process: false })
  }

  validationAmount = (amount) => {
    amount = amount.toLowerCase()

    // check if there is 'rp' word
    if (amount.indexOf('rp') > -1) {
      const rpSplit = amount.split('rp')

      // check if amount is only Rp
      if (rpSplit[0].replace(/\s+/g, '') === '' && rpSplit[rpSplit.length - 1].replace(' ', '') === '') {
        this.setState({ error: 'Missing value!' })
        return false
      } else if (rpSplit[rpSplit.length - 1].replace(/\s+/g, '') === '') { // check if Rp is wrong position
        this.setState({ error: 'Valid character in wrong position!' })
        return false
      } else {
        amount = rpSplit[1].replace(/\s+/g, '')
      }
    }
    if (amount.indexOf('.') > -1) {
      amount = amount.replace('.', '')
    }

    // check if there are ',' & '.' in a input and after ',' is not 00
    if (amount.indexOf(',') > -1 || amount.indexOf(' ') > -1) {
      if (amount.split(',')[1] !== '00') {
        this.setState({ error: 'Invalid separator!' })
        return false
      }
    }

    return parseInt(amount)
  }

  render () {
    const { classes } = this.props
    const { amount, result, amountLeft, error } = this.state

    return (
      <div className={classes.root}>
        <div className="topHeader">
          <Typography className="title" component="h2" variant="h1" gutterBottom>
          Denomination Rupiah
          </Typography>
        </div>
        <Grid container spacing={8}>
          <Grid item xs={9}>
            <TextField
              id="standard-name"
              label="Amount"
              className={classes.textField}
              value={amount}
              onChange={this.handleChange('amount')}
              onKeyPress={this._handleKeyPress}
              margin="normal"
              error={Boolean(error)}
              helperText={error}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              disabled={amount === ''}
              className={classes.button}
              onClick={() => this.processMoney()}
              style={{ marginTop: 30 }}
            >
              Process
            </Button>
          </Grid>
        </Grid>

        {/* display the rupiah amounts */}
        <MoneyTable data={result} amountLeft={amountLeft} />
      </div>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Index)
