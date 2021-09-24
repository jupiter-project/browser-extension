
import { memo, useCallback } from 'react'

import MagicDialog from 'components/MagicDialog'
import ValueItem from 'parts/ValueItem'
import getTransactionType from 'utils/helpers/getTransactionType'
import { getDateFromTimestamp } from 'utils/helpers/getTimestamp'
import { NQT_WEIGHT } from 'utils/constants/common'

const TransactionDialog = ({
  open,
  setOpen,
  transaction,
}) => {

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <MagicDialog
      open={open}
      onClose={handleClose}
    >
      <ValueItem
        label='Type'
        value={getTransactionType(transaction.type, transaction.subtype)}
      />
      <ValueItem
        label='Sender'
        value={transaction.senderRS}
      />
        <ValueItem
        label='Recipient'
        value={transaction.recipientRS}
      />
      <ValueItem
        label='Amount'
        value={`${transaction.amountNQT / NQT_WEIGHT} JUP`}
      />
      <ValueItem
        label='Fee'
        value={`${transaction.feeNQT / NQT_WEIGHT} JUP`}
      />
      {transaction?.attachment?.asset &&
        <ValueItem
          label='Attachment Asset'
          value={transaction.attachment.asset}
        />
      }
      {transaction?.attachment?.priceNQT &&
        <ValueItem
          label='Attachment Price'
          value={`${transaction.attachment.priceNQT / NQT_WEIGHT} JUP`}
        />
      }
      {transaction?.attachment?.quantityQNT &&
        <ValueItem
          label='Attachment Quantity'
          value={transaction.attachment.quantityQNT}
        />
      }
      <ValueItem
        label='Transaction Timestamp'
        value={getDateFromTimestamp(transaction.timestamp)}
      />
    </MagicDialog>
  );
}

export default memo(TransactionDialog)