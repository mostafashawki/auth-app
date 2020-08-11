import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import "react-phone-number-input/style.css";
import { useForm } from "react-hook-form";
import { apiAuth, headers } from "../global/const";
import CopyRight from "./shared/CopyRight";
import useStyles from "./shared/useStyles";

function SignUp(props) {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm(); // initialise the hook

  /**
   * the function to handle login and send user login data to the API
   * @param {object} user (email and password, firstName, lastName)
   */
  const handleRegister = async (user) => {
    const endpoint = apiAuth + "/register";
    const settings = {
      method: "POST",
      headers,
      body: JSON.stringify(user),
    };
    try {
      const res = await (await fetch(endpoint, settings)).json();
      console.log("user ", res);
      if (res.email) props.setToShow("login");
      else console.log("something went wrong: ", res);
    } catch (e) {
      console.log("error ", e);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(handleRegister)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                inputRef={register({ required: true })}
                error={errors.firstName}
                helperText="First name is required"
              />
              {errors.firstName ? (errors.firstName = true) : false}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                inputRef={register({ required: true })}
                error={errors.lastName}
                helperText="Last name is required"
              />
              {errors.lastName ? (errors.lastName = true) : false}
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                inputRef={register({ required: true })}
                error={errors.email}
                helperText="Email is required"
              />
              {errors.email ? (errors.email = true) : false}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={register({ required: true })}
                error={errors.password}
                helperText="Password is required"
              />
              {errors.password ? (errors.password = true) : false}
            </Grid>
            <Grid item xs={12}>
              {/* <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              /> */}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={() => props.setToShow("")}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <CopyRight />
      </Box>
    </Container>
  );
}
export default SignUp;
