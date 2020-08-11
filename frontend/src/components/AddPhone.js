import React, { useState } from "react";
import MobileFriendlyIcon from "@material-ui/icons/MobileFriendly";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";
import Input from "./shared/Input";
import { apiAuth } from "../global/const";
import useStyles from "./shared/useStyles";

function AddPhone(props) {
  const classes = useStyles();
  const [value, setValue] = useState(() => null);
  const [phoneError, setPhoneError] = useState(() => false);

  /**
   * the function to handle update user with the phone number
   */
  const handleUpdatePhone = async (e) => {
    e.preventDefault();
    if (!phoneError) {
      const phoneDetails = parsePhoneNumber(value);
      console.log("phone number ----> ", phoneDetails);
      //remove the metadata from the new object
      const { metadata, ...phoneDetailsToSend } = phoneDetails;
      console.log("to server ", phoneDetailsToSend);
      setButtonLoading(true);
      //reset the form
      setValue("");

      const endpoint = apiAuth + "/phone";
      const settings = {
        method: "PUT",
        headers: JSON.parse(sessionStorage.getItem("headersWithAuth")),
        body: JSON.stringify(phoneDetailsToSend),
      };
      try {
        const data = await (await fetch(endpoint, settings)).json();
        console.log("user ", data);
        if (data.phoneDetails) props.setToShow("verify");
        else console.log("something went wrong ", data);
      } catch (e) {
        console.log("error ", e);
      }
    }
  };

  const [buttonLoading, setButtonLoading] = useState(() => false);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <MobileFriendlyIcon />
        <Typography component="h1" variant="h5">
          Add Mobile Number
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleUpdatePhone}>
          <PhoneInput
            international
            placeholder="Enter mobile number"
            value={value}
            setValue={setValue}
            name="phone"
            label="Mobile Number"
            helperText="With country code (e.g. +49 1500 0000000)"
            onChange={() => null}
            inputComponent={Input}
            error={phoneError}
            setPhoneError={setPhoneError}
          />
          {!buttonLoading && (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Send Verification Code
            </Button>
          )}

          {buttonLoading && (
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              <CircularProgress style={{ color: "white" }} size={24} />
            </Button>
          )}
        </form>
      </div>
    </Container>
  );
}

export default AddPhone;
