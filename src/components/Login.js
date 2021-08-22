import React, { useState } from 'react'
import { Link, useHistory} from 'react-router-dom';
import { auth, provider } from '../firebase';
import firebase from 'firebase';

export default function Login({user}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const emailHandler = (event) => {
        setEmail(event.target.value)
    }
    const passwordHandler = (event) => {
        setPassword(event.target.value)
    }

    const loginFunc = async (event) => {
        try{
            event.preventDefault();
            const result = await auth.signInWithEmailAndPassword(email,password)
            alert(`Welcome ${result.user.email}`)
            history.push("/blogpage");
        }catch(err){
            alert(err.message);
        }
        }

    const gmailHandler = async () => {
        try{
            const details = await firebase.auth().signInWithPopup(provider);
            alert(`Welcome ${details.user.email}`)
            history.push("/blogpage")
        }
        catch(err){
            alert(err.message)
        }
        
    }
    return (
        <div>
        {
            user === null ?
        <div className="container">
            <h1 style = {{fontFamily:"Brush Script MT,cursive",fontWeight:"bold"}} className="mt-2">Login</h1>
            <form onSubmit = {loginFunc}>
            <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control col-sm-6" placeholder="Enter email" value = {email} onChange = {emailHandler}/>
            </div>
            <div className="form-group">
                <label >Password</label>
                <input type="password" className="form-control col-sm-6" placeholder="Password" value = {password} onChange = {passwordHandler}/>
            </div>
            <div>
                <button className="btn btn-light" onClick = {gmailHandler}>Login using gmail</button>
            </div>
            <br/>
            <div>
                <button type="submit" className="btn btn-dark">Login <i className="fa fa-sign-in" aria-hidden="true"></i></button>
                <small id="emailHelp" className="form-text text-muted">Not registered ? 
                    <Link to = "/signup">
                        <span>Sign up</span>
                    </Link>
                </small>
            </div>
            </form>
        </div>
        :
        <h1 style = {{fontFamily:"Brush Script MT,cursive",textAlign:"center"}}>Already Logged in, View <Link to = "/blogpage">blogpage</Link></h1>
        }
        </div>
    )
}
