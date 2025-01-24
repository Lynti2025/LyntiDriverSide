import { Redirect } from "expo-router";
import { useState } from "react";

export default function index() {
  const [isLoggedIn, setisLoggedIn] = useState(false);

  return <Redirect href={!isLoggedIn ? "/signUp" : "/home"} />;
}
