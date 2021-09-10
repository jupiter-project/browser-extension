
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
        label='Transaction Index'
        value={transaction.transactionIndex}
      />
      <ValueItem
        label='Type'
        value={getTransactionType(transaction.type, transaction.subtype)}
      />
      <ValueItem
        label='Version'
        value={transaction.version}
      />
      <ValueItem
        label='Deadline'
        value={transaction.deadline}
      />
      <ValueItem
        label='Height'
        value={`${transaction.height} / ${transaction.confirmations} confirmation(s)`}
      />
      <ValueItem
        label='Transaction Timestamp'
        value={getDateFromTimestamp(transaction.timestamp)}
      />
      <ValueItem
        label='Phased'
        value={transaction.phased ? 'True' : 'False'}
      />
      <ValueItem
        label='Amt + Fee'
        value={`${transaction.amountNQT / NQT_WEIGHT} + ${transaction.feeNQT / NQT_WEIGHT} JUP`}
      />
      {transaction?.attachment?.message &&
        <ValueItem
          label='Attachment Message'
          value={transaction.attachment.message}
        />
      }
      {transaction?.attachment?.messageIsText &&
        <ValueItem
          label='Attachment Message Is Text'
          value={transaction.attachment.messageIsText ? 'True' : 'False'}
        />
      }
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
        label='Block ID'
        value={transaction.block}
      />
      <ValueItem
        label='Block Timestamp'
        value={getDateFromTimestamp(transaction.blockTimestamp)}
      />
      <ValueItem
        label='Full Hash'
        value={transaction.fullHash}
      />
      <ValueItem
        label='Signature'
        value={transaction.signature}
      />
      <ValueItem
        label='Signature Hash'
        value={transaction.signatureHash}
      />
      <ValueItem
        label='Sender'
        value={transaction.senderRS}
      />
      <ValueItem
        label='Sender Public Key'
        value={transaction.senderPublicKey}
      />
    </MagicDialog>
  );
}

export default memo(TransactionDialog)