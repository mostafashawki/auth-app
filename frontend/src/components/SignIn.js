import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { apiAuth, headers } from "../global/const";
import CopyRight from "./shared/CopyRight";
import useStyles from "./shared/useStyles";

export default function SignIn(props) {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm(); // initialise the hook

  /**
   * the function to handle login and send user login data to the API
   * @param {object} user (email and password)
   */
  const handleLogin = async (user) => {
    const endpoint = apiAuth + "/login";
    const settings = {
      method: "POST",
      headers,
      body: JSON.stringify(user),
    };
    try {
      const res = await (await fetch(endpoint, settings)).json();
      if (res.user) {
        sessionStorage.setItem("user", JSON.stringify(res.user));
        const headersWithAuth = {
          ...headers,
          Authorization: res.userToken,
        };
        sessionStorage.setItem(
          "headersWithAuth",
          JSON.stringify(headersWithAuth)
        );
        //show verify page
        props.setToShow("addPhone");
      } else console.log("something went wrong ", res);
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
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(handleLogin)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={register({ required: true })}
            error={errors.email}
            helperText="Email is required"
          />
          {errors.email ? (errors.email = true) : false}
          <TextField
            variant="outlined"
            margin="normal"
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={() => props.setToShow("register")}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <CopyRight />
      </Box>
    </Container>
  );
}
