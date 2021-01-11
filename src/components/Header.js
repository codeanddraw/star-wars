import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import '../css/Header.css'

//Styles for the header
const useStyles = makeStyles(() => ({
    appHeader: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '5px solid #1086e8',
        borderRadius: '20px',
        animation: 'border-flicker 5s linear infinite',
        padding: '1rem'
      },
    appTitle: {
        color: '#ff00e6',
        fontFamily: 'Raleway, sans-serif', 
        fontSize: '2rem',
        letterSpacing: '10px',
        animation: 'text-flicker 3s linear infinite',
        textAlign: 'center',
      }
}));


// Star war header for all pages
export default function Header() {
    const classes = useStyles();

    return <div className={classes.appHeader} >
            <h1 className={classes.appTitle}>S<span id="offset">T</span>AR <span id="offset">WA</span>RS <span id="offset">API</span></h1>
        </div>
}