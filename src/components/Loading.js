import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'

//Styles for the loader
const useStyles = makeStyles(() => ({
    loading: {
      display: 'flex',
      justifyContent: 'center',
      padding: '4rem'
    }
}));

//Loader shown during network requests
export default function Loading() {
    const classes = useStyles();
    return <div className={classes.loading}><CircularProgress /></div>
}
