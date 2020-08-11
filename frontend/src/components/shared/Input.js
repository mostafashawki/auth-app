import React, { forwardRef } from "react";
import TextField from "@material-ui/core/TextField";
import { isPossiblePhoneNumber } from "react-phone-number-input";
function Input(
  {
    name,
    placeholder,
    label,
    helperText,
    value,
    setValue,
    error,
    setPhoneError,
  },
  ref
) {
  const validatePhone = (e) => {
    console.log(e.target.value);

    if (!isPossiblePhoneNumber(e.target.value)) setPhoneError(true);
    else setPhoneError(false);

    setValue(e.target.value);
  };
  return (
    <TextField
      variant="outlined"
      required
      fullWidth
      label={label}
      name={name}
      helperText={helperText}
      value={value}
      ref={ref}
      onChange={validatePhone}
      placeholder={placeholder}
      error={error}
    />
  );
}

export default forwardRef(Input);
