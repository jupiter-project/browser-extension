
import { memo, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core'

import { useAccount } from 'contexts/account-context'
import TabPanel from 'components/TabPanel'
import TransactionDialog from './TransactionDialog'
import getTransactionType from 'utils/helpers/getTransactionType'
import { getDateFromTimestamp } from 'utils/helpers/getTimestamp'
import toFixedIfNecessary from 'utils/helpers/toFixedIfNecessary'
import { NQT_WEIGHT } from 'utils/constants/common'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: 0
  },
  listItem: {
    padding: theme.spacing(1.5, 2)
  }
}));

const ActivityPanel = (props) => {
  const classes = useStyles();
  const { transactions } = useAccount();
  const [openModal, setOpenModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState({})

  const transactionHandler = (transaction) => () => {
    setSelectedTransaction(transaction)
    setOpenModal(true)
  }

  return (
    <TabPanel {...props}>
      <List className={classes.root} aria-label='assets'>
        {transactions.map((transaction) => (
          <ListItem
            button
            key={transaction.transaction}
            className={classes.listItem}
            onClick={transactionHandler(transaction)}
          >
            <ListItemText
              primary={`${getTransactionType(transaction.type, transaction.subtype)}`}
              secondary={`${getDateFromTimestamp(transaction.timestamp)}`}
            />
            <Typography align='right'>
              {toFixedIfNecessary(transaction.amountNQT / NQT_WEIGHT)} JUP
              <br />
              {toFixedIfNecessary(transaction.feeNQT / NQT_WEIGHT)}(fee)
            </Typography>
          </ListItem>
        ))}
      </List>
      {openModal &&
        <TransactionDialog
          open={openModal}
          setOpen={setOpenModal}
          transaction={selectedTransaction}
        />
      }
    </TabPanel>
  )
}

export default memo(ActivityPanel)