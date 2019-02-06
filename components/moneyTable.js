import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 500,
    margin: '0 auto',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    maxWidth: 500
  }
})

function SimpleTable (props) {
  const { classes } = props
  let no = 0

  return (
    <div>
      { props.data && props.data.length > 0 &&
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell width="10%" align="center">No. </TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Cash</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((data, i) => (
              <TableRow key={i}>
                <TableCell component="th" scope="row" align="center">
                  {no++}
                </TableCell>
                <TableCell align="right">{data.total}</TableCell>
                <TableCell align="right">Rp. {data.money}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      }
      { props.amountLeft > 0 &&
        <Paper className={classes.root} style={{ marginTop: 15 }}>
          <Table className={classes.table}>
            <TableBody>

              {/* display the amount left if there is a amount left */}
              <TableRow>
                <TableCell colSpan={2} align="left">Amount Left</TableCell>
                <TableCell align="right">Rp. {props.amountLeft}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      }
    </div>
  )
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array,
  amountLeft: PropTypes.number
}

export default withStyles(styles)(SimpleTable)
