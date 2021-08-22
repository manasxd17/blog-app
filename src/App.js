import Signup from './components/Signup'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './components/Login';
import BlogPage from './components/blog/BlogPage';
import {auth} from './firebase';
import React, {useEffect, useState} from 'react';

function App() {
  const [user,setUser] = useState(null)
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user){
        setUser(user)
      }
      else{
        setUser(null)
      }
    }); 
  },[])

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path = "/">
            <Login user = {user}></Login>
          </Route>
          <Route path = "/signup">
            <Signup user = {user}></Signup>
          </Route>
          <Route path = "/blogpage">
            <BlogPage user = {user}></BlogPage>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
