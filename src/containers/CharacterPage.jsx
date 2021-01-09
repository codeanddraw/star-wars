import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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
    fontSize: '2em'

  },
  filmTitle: {
    color: 'antiquewhite',
    textDecoration: 'none',
    display: 'flex',
    justifyContent: 'center',
    padding: 0,
    margin: 0
  },
  filmYear: {
    color: 'antiquewhite',
    textDecoration: 'none',
    display: 'flex',
    justifyContent: 'center',
    padding: 0,
    margin: 0
  }
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
      setHasError(true)
    });

  }, [urls])
  return [response, loading, hasError]
}

const CharacterPage = (props) => {
  const classes = useStyles();
  const charactersArray = (props.location.state && props.location.state.filmCharacters) || [],
    filmTitle = (props.location.state && props.location.state.filmTitle) || [],
    filmYear = (props.location.state && props.location.state.filmYear.split('-')[0]) || []

  const [response, loading, hasError] = useFetch(charactersArray)

  return (
    <div className={classes.root}>
      <h2 className={classes.filmTitle} > {filmTitle} </h2>
      <h3 className={classes.filmYear} > {filmYear} </h3>
      <Grid container spacing={3}>
        {loading ? <div>Loading...</div> : (hasError ? <div>Error occured.</div> :
          (response && response.length > 0 && response.map(d =>
            <Grid item xs={12} >
              <Paper className={classes.paper} >
                <p className={classes.text}>
                  {d.name}
                </p>
              </Paper>
            </Grid>
          )))}
      </Grid>
    </div>
  );
}
export default CharacterPage;