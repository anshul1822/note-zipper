import "./App.css";

import React, { useState } from 'react'
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import LandingPage from "./screens/LandingPage/LandingPage";
import MyNotes from "./screens/MyNotes/MyNotes";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import CreateNote from "./screens/CreateNote/CreateNote"
import SingleNote from "./screens/SingleNote/SingleNote";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import {Route, Switch} from "react-router-dom";

function App() {
  const [search, setSearch] = useState("");

  return (
    <>
    <Header setSearch={setSearch} />
      <main>
        <Switch>
          <Route  path="/" component={LandingPage} exact/>
          <Route  path="/login" component={LoginScreen} exact/>
          <Route  path="/profile" component={ProfileScreen} />
          <Route  path="/register" component={RegisterScreen} />
          <Route  path="/createnote" component={CreateNote} />
          <Route  path="/note/:id" component={SingleNote} />
          <Route  path="/mynotes" component={() => <MyNotes search={search}/>} />
        </Switch>
      </main>
    <Footer/>
    </>

  )
}

export default App
