
import { makeStyles } from '@material-ui/core/styles'

const useCommonStyles = makeStyles(theme => ({
  containerWidth: {
    width: '100%',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  breakWords: {
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
    overflowWrap: 'break-word',
  }
}));

export {
  useCommonStyles
};
