import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SvgIcon from '@material-ui/core/SvgIcon';


function HomeIcon(props) {

  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const classes = useStyles();


  function handleSubmission(e) {
    e.preventDefault();
    if (name.length > 0 && email.length > 0 && phone.length > 0) {
      var myDateString = "2003-1-1";
      var myDate = new Date(myDateString);
      var compDate = new Date(dob);
      if (compDate < myDate) {
        if (phone.length === 10) {

          const userInfo = {
            "name":name, 
            "dob":dob, 
            "email":email, 
            "phone":phone,
          };

          fetch('http://127.0.0.1:8000/user-form/', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo),
          })
            .then(response => response.json())
            .then(data => {
              if(data['msg']=="Done"){
                window.location.href = "http://localhost:3000/allusers";
              }
              else{
                  alert("Your form is not submitted successfully !!!");
              }
            })
            .catch((error) => {
              console.error('Error:', error);
            });

        }
        else {
          alert("Phone Number Should must be 10 digit only.");
        }
      }
      else {
        alert("Only 18+ candidate can register here !!!");
      }
    }
    else {
      alert("Please fill the all fields properly !!!");
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <div className={classes.root}>
          <HomeIcon color="secondary" />
        </div>
        <Typography component="h1" variant="h5">
          Fill Your Details
        </Typography>
        <form className={classes.form} onSubmit={handleSubmission}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="fullName"
                variant="outlined"
                required
                fullWidth
                value={name}
                onChange={(e) => { setName(e.target.value) }}
                id="fullName"
                label="Full Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="date"
                id="email"
                value={dob}
                onChange={(e) => { setDob(e.target.value) }}
                label="DOB"
                name="dob"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="number"
                value={phone}
                onChange={(e) => { setPhone(e.target.value) }}
                id="phone"
                label="Phone Number"
                name="phone"
                autoComplete="phone"
                className={classes.textField}
              />
            </Grid>

          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            color="secondary"
            className={classes.submit}
          >
            Submit Here
          </Button>

        </form>
      </div>
    </Container>
  );
}