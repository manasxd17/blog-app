import React, { useState }from 'react';
import {auth,db} from '../firebase';
import { Link } from 'react-router-dom';
function Signup({user}){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [username,setUsername] = useState('')
    const emailHandler = (event) => {
        setEmail(event.target.value)
    }
    const passwordHandler = (event) => {
        setPassword(event.target.value);
    }
    const usernameHandler = (event) => {
        setUsername(event.target.value);
    }
    const check = (event) => {
        event.preventDefault();
        // console.log(email,password);
        auth.createUserWithEmailAndPassword(email,password).then((cred) => {
            alert(`You're registered as ${username}`)
            db.collection('users').doc(cred.user.uid).set({
                Username:username,
                Email:email,
                Password:password
            }).then(() => {
                setEmail('')
                setUsername('')
                setPassword('')
            }).catch((err) => {
                alert(err.message)
            })
        }).catch((err) => {
            alert(err.message)
        })
    }

    return (
        <div>
            {
                user === null ?
        <div className = "container">
            <h1 style = {{fontFamily:"Brush Script MT,cursive",fontWeight:"bold"}} className="mt-2">Register</h1>
            <form onSubmit = {check}>
            <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control col-sm-6" placeholder="Enter username" value = {username} onChange = {usernameHandler}/>
            </div>
            <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control col-sm-6" placeholder="Enter email" onChange = {emailHandler}/>
            </div>
            <div className="form-group">
                <label >Password</label>
                <input type="password" className="form-control col-sm-6" placeholder="Password" onChange = {passwordHandler}/>
            </div>
            <br/>
            <button type="submit" className="btn btn-dark">Register <i className="fa fa-user-plus" aria-hidden="true"></i></button>
            <small id="emailHelp" className="form-text text-muted">Already registered?
                <Link to = "/">
                    <span>Login</span>
                </Link>
            </small>
            </form>
        </div>
        :
        <h1 style = {{fontFamily:"Brush Script MT,cursive",textAlign:"center"}}>You're logged in please visit <Link to = "/blogpage">blogpage</Link> to create blog or logout</h1>
        }
        </div>
    )
}
export default Signup;