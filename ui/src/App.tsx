import React from "react";
import "./App.scss";
import { useUser } from "./context/user-context";
import { Unauthenticated } from "./views/Unauthenticated";
import { Authenticated } from "./views/Authenticated";

const App: React.FC = () => {
  return useUser() ? <Authenticated /> : <Unauthenticated />;
};

export default App;
