import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {
  Link
} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'black'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    backgroundColor: 'black'
  },
  text: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '2em',
    cursor: 'pointer'
  }
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
      .catch(error => {
        console.error(error, 'Timeout exceeded, unable to fetch movie data')
        setHasError(true)
      })
  }, [url])
  return [response, loading, hasError]
}

export default function HomePage() {
  const classes = useStyles();
  const [response, loading, hasError] = useFetch("https://swapi.dev/api/films")

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>

        {loading ? <div>Loading...</div> : (hasError ? <div>Error occured.</div> :
          (response && response.length > 0 && response.map(d =>
            <Grid item xs={12} >
              {console.log(d)}
              <Paper className={classes.paper}>
                <Link className={classes.text}
                  to={{
                    pathname: `/home/${d.title}`,
                    state: {
                      filmCharacters: d.characters,
                      filmTitle: d.title,
                      filmYear: d.release_date
                    }
                  }}>
                  {d.title}
                </Link>
              </Paper>
            </Grid>
          )))}
      </Grid>
    </div>
  );
}
