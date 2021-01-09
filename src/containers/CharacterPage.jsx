import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function useFetch(urls) {
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
      setLoading(true)
      const arr = urls.map(url => fetch(url))

      Promise.all(arr).then(responses => {
            return Promise.all(responses.map(function (response) {
                return response.json();
            }));
        }).then(data => {
            console.log(data);
            setResponse(data)
            setLoading(false); 
        }).catch(error => {
            console.log(error);
        });

  }, [ urls ])
  return [ response, loading, hasError ]
}

const CharacterPage = (props) => {
  const classes = useStyles();
  const [response, loading, hasError] = useFetch(props.location.state.filmCharacters)

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
          
          {loading ? <div>Loading...</div> : (hasError ? <div>Error occured.</div> : 
          (response && response.length> 0 && response.map(d => 
          <Grid item xs={12} >
            <Paper className={classes.paper} >
            {d.name}
            </Paper>
          </Grid> 
          )))}
      </Grid> 
    </div>
  );
}
export default CharacterPage;