import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import MobileFriendlyIcon from "@material-ui/icons/MobileFriendly";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { apiAuth } from "../global/const";
import Alert from "@material-ui/lab/Alert";
import useStyles from "./shared/useStyles";

export default function VerifyOTP(props) {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm(); // initialise the hook

  /**
   * the function to handle phone verification and send data to the API
   * @param {object} otp
   */
  const handleVerify = async (otp) => {
    console.log(otp);
    const endpoint = apiAuth + "/verify";
    const settings = {
      method: "POST",
      headers: JSON.parse(sessionStorage.getItem("headersWithAuth")),
      body: JSON.stringify(otp),
    };
    try {
      const res = await (await fetch(endpoint, settings)).json();
      // return data;
      if (res.error_text) {
        console.log("####### ", res);
        setResult("error");
        setErrorText(res.error_text);
      } else setResult("verified");
    } catch (e) {
      // return e;
      console.log("error ", e);
    }
  };
  const [result, setResult] = useState(() => "");
  const [errorText, setErrorText] = useState(() => "");

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <MobileFriendlyIcon />
        <Typography component="h1" variant="h5">
          Verify your phone number
        </Typography>
        {result === "verified" ? (
          <Alert severity="success">
            Phone verified successfuly, thanks for using our platform
          </Alert>
        ) : result === "error" ? (
          <Alert severity="error">{errorText}</Alert>
        ) : (
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit(handleVerify)}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="otp"
              label="Add OTP"
              name="otp"
              autoComplete="otp"
              autoFocus
              inputRef={register({ required: true })}
              error={errors.otp}
              helperText="OTP is required"
            />
            {errors.otp ? (errors.otp = true) : false}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Verify
            </Button>
          </form>
        )}
      </div>
    </Container>
  );
}
