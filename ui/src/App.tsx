import React from "react";
import "./App.css";
import { useUser } from "./context/user-context";
import { Unauthenticated } from "./views/Unauthenticated";
import { Authenticated } from "./views/Authenticated";

const App: React.FC = () => {
  const user = useUser();
  return user ? <Authenticated /> : <Unauthenticated />;
};

export default App;
