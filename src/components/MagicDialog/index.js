import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import ContainedButton from 'components/UI/Buttons/ContainedButton'

const useStyles = makeStyles((theme) => ({
  paper: {
    minWidth: 'unset',
    borderRadius: 10,
    backgroundColor: theme.palette.background.default
  },
  dialogTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 68,
    lineHeight: 'initial',
    padding: theme.spacing(0, 6),
    background: `linear-gradient(90deg, ${theme.custom.palette.darkGreen}, ${theme.custom.palette.black})`
  },
  title: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: theme.custom.palette.white
  },
  closeIcon: {
    position: 'absolute',
    top: theme.spacing(1.5),
    right: theme.spacing(2),
    color: theme.custom.palette.white
  },
  dialogContent: {
    width: '100%',
    minWidth: 'unset',
    minHeight: 130,
    padding: theme.spacing(2, 1)
  },
  dialogActions: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(0, 1.5, 1),
  },
  button: {
    margin: theme.spacing(1, 0)
  }
}));

const MagicDialog = ({
  open,
  title,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
  onClose,
  confirmDisable = false,
  children
}) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      classes={{
        paper: classes.paper
      }}
      aria-labelledby='customized-dialog-title'
    >
      {title &&
        <DialogTitle
          id='customized-dialog-title'
          disableTypography
          align='center'
          className={classes.dialogTitle}
        >
          <Typography
            variant='h6'
            className={classes.title}
          >
            {title}
          </Typography>
          <IconButton
            edge='end'
            aria-label='close'
            className={classes.closeIcon}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      }
      <DialogContent className={classes.dialogContent}>
        {children}
      </DialogContent>
      {
        (!!cancelLabel || !!confirmLabel) &&
        <DialogActions
          disableSpacing
          className={classes.dialogActions}
        >
          {
            !!cancelLabel &&
            <ContainedButton
              autoFocus
              onClick={onCancel}
              className={classes.button}
            >
              {cancelLabel}
            </ContainedButton>
          }
          {
            !!confirmLabel &&
            <ContainedButton
              disabled={confirmDisable}
              onClick={onConfirm}
              className={classes.button}
            >
              {confirmLabel}
            </ContainedButton>
          }
        </DialogActions>
      }
    </Dialog>
  );
}

export default memo(MagicDialog)