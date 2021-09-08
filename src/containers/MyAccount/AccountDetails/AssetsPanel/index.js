
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from '@material-ui/core'
import NextIcon from '@material-ui/icons/NavigateNext';

import { useAccount } from 'contexts/account-context'
import TabPanel from 'components/TabPanel'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: 0
  },
  listItem: {
    padding: theme.spacing(1.5, 2)
  }
}));

const AssetsPanel = (props) => {
  const classes = useStyles();
  const { assets } = useAccount();

  return (
    <TabPanel {...props}>
      <List className={classes.root} aria-label='assets'>
        {assets.map((asset) => (
          <ListItem button key={asset.asset} className={classes.listItem}>
            <ListItemText primary={`${asset.quantityQNT / (10 ** asset.decimals)} ${asset.name}`} />
            <ListItemSecondaryAction>
              <NextIcon />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </TabPanel>
  )
}

export default memo(AssetsPanel)