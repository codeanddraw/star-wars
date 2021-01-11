import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Loading from '../components/Loading'

// Styles applied to HomePage
const useStyles = makeStyles(() => ({
  paper: {
    textAlign: 'center',
    backgroundColor: 'black'
  },
  filmName: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '2rem',
    cursor: 'pointer'
  },
  pageError: {
    color: '#fff',
    justifyContent: 'center',
    display: 'flex',
    fontSize: '2rem',
    fontWeight: '500'
  }
}));

//Custom Hook to fetch films
function useFetch(url) {
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

    fetch(url, requestOptions).then(response => {
      return response.json()
    }).then(data => {
      console.log(data)
      setResponse(data);
      setLoading(false);
    })
      .catch(error => {
        console.log('error', error)
        setHasError(true)
        setLoading(false)
      });

    clearTimeout(timeoutId)
  }, [url])

  return [response, loading, hasError]
}

//Functional component to render Page Container
export default function HomePage() {
  const classes = useStyles();
  const [response, loading, hasError] = useFetch("https://swapi-deno.azurewebsites.net/api/films")
  
  //Render progress indicator while the api fetches response
  const renderLoader = () => <Loading />
  
  //Render Error text if error occurs in the fetch operation
  const renderErrorUI = () => <div className={classes.pageError}>Error occured.</div>

  if (loading) return renderLoader()

  else if (hasError) return renderErrorUI()

  else return <Grid container spacing={6}>
    {response && response.length > 0 && response.map((d, index) =>
      <Grid key={index} item xs={12} >
        <Paper key={index} className={classes.paper}>
          {/* Hyperlink on each film */}
          <Link className={classes.filmName}
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
    )}
  </Grid>
}
