import React, { useState } from "react";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import AddPhone from "./components/AddPhone";
import VerifyOTP from "./components/VerifyOTP";

function App() {
  const [toShow, setToShow] = useState(() => "");
  return (
    <div className="App">
      {toShow === "register" ? (
        <SignUp setToShow={setToShow} />
      ) : toShow === "addPhone" ? (
        <AddPhone setToShow={setToShow} />
      ) : toShow === "verify" ? (
        <VerifyOTP setToShow={setToShow} />
      ) : (
        <SignIn setToShow={setToShow} />
      )}
    </div>
  );
}

export default App;
