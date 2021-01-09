import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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

function useFetch(url) {
  console.log(url)
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
      setLoading(true)

      const controller = new AbortController();
      const options = {
        method: 'GET',
        signal: controller.signal,
      } 

      const timeoutId = setTimeout(() => controller.abort(), 10000); //Set timeout for fetch

      fetch(url, options)
      .then(res => res.json()) 
      .then(data => { 
        console.log(data.results)
        setResponse(data.results); 
        setLoading(false); // Sets loading status to false when data loads
      })
      .catch(error => console.error(error, 'Timeout exceeded, unable to fetch movie data'))
  }, [ url ])
  return [ response, loading, hasError ]
}

export default function App() {
  const classes = useStyles();
  const [response, loading, hasError] = useFetch("https://swapi.dev/api/films")

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
          
          {loading ? <div>Loading...</div> : (hasError ? <div>Error occured.</div> : 
          (response && response.length> 0 && response.map(d => 
          <Grid item xs={12} ><Paper className={classes.paper}>{d.title}</Paper></Grid> 
          )))}
      </Grid> 
    </div>
  );
}
