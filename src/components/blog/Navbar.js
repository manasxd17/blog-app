import React from 'react'
import { auth } from '../../firebase';
import { useHistory } from 'react-router-dom';

export default function Navbar(props) {
    const history = useHistory();
    // console.log(`From blog page`)
    const logoutHandler = () => {
        auth.signOut();
        history.push('/')
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                <span className="navbar-brand" style={{ color: "white",fontFamily:"Brush Script MT,cursive",fontSize:"30px" }}>Blogs!</span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <button className="btn btn-dark" onClick = {props.getData}>All blogs <i className="fa fa-globe" aria-hidden="true"></i></button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-dark" onClick = {props.personalData}>My blogs <i className="fa fa-user" aria-hidden="true"></i></button>
                        </li>
                        <div>
                            <li className="nav-item">
                                <button className="btn btn-dark" onClick={logoutHandler}>Logout <i className="fa fa-sign-out" aria-hidden="true"></i></button>
                            </li>
                        </div>
                    </ul>
                </div>
            </nav>
        </div>
    )
}
