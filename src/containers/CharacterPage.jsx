import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Loading from '../components/Loading'

// Styles applied to CharacterPage
const useStyles = makeStyles(() => ({
  paper: {
    textAlign: 'center',
    backgroundColor: 'black'
  },
  filmCharacter: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '2em',
    padding: 0,
    margin: 0
  },
  filmHeading: {
    padding: "1.5rem"
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
  },
  pageError: {
    color: '#fff',
    justifyContent: 'center',
    display: 'flex',
    fontSize: '2rem',
    fontWeight: '500'
  }
}));

//Custom Hook to fetch people in the selected film
function useFetch(urls) {
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setLoading(true)
    const controller = new AbortController();
    var requestOptions = {
      method: 'GET',
      signal: controller.signal
    };
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    const arr = urls.map(url => fetch(`https://swapi-deno.azurewebsites.net/api/people/${url}`))

    Promise.all(arr, requestOptions).then(responses => {
      return Promise.all(responses.map(response => {
        return response.json();
      }));
    }).then(data => {
      setResponse(data)
      setLoading(false);
    }).catch(error => {
      console.log('error', error)
      setHasError(true)
      setLoading(false)
    });

    clearTimeout(timeoutId)

  }, [urls])

  return [response, loading, hasError]
}

//Functional component to render Character Container
export default function CharacterPage(props){
  const classes = useStyles();
  //Receive props from the link 
  const charactersArray = (props.location.state && props.location.state.filmCharacters) || [],
    filmTitle = (props.location.state && props.location.state.filmTitle) || [],
    filmYear = (props.location.state && props.location.state.filmYear.split('-')[0]) || []
  const [response, loading, hasError] = useFetch(charactersArray)

  //Render progress indicator while the api fetches response
  const renderLoader = () => <Loading />

  //Render Error text if error occurs in the fetch operation
  const renderErrorUI = () => <div className={classes.pageError}>Error occured.</div>

  if (loading) return renderLoader()

  else if (hasError) return renderErrorUI()

  else return <>
    <div className={classes.filmHeading}>
      <h2 className={classes.filmTitle} > {filmTitle} </h2>
      <h3 className={classes.filmYear} > {filmYear} </h3>
    </div>
    <Grid container spacing={3}>
      {response && response.length > 0 && response.map((d, index) =>
        <Grid key={index} item xs={12} >
          <Paper key={index} className={classes.paper} >
            <p className={classes.filmCharacter}>
              {d.name}
            </p>
          </Paper>
        </Grid>
      )}
    </Grid>
  </>
}