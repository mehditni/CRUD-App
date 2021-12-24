import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Route, Routes} from "react-router-dom";

import Navbar from "./components/navbar.component"
import TweetsList from "./components/tweets-list.component";
import EditTweet from "./components/edit-tweet.component";
import CreateTweet from "./components/create-tweet.component";
import CreateUser from "./components/create-user.component";


function App() {
  return (
    <BrowserRouter>
      <div className="container">
      <Navbar />
      <br/>
      
      <Routes>
      <Route  path="/" exact element={<TweetsList/>} />
      <Route  path="/edit/:id" element={<EditTweet/>} />
      <Route  path="/create" element={<CreateTweet/>} />
      <Route  path="/user" element={<CreateUser/>} />
      </Routes>
      
      </div>
      </BrowserRouter>
    
  );
}

export default App;
