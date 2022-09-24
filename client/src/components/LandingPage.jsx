import React from "react";
import { Link } from "react-router-dom";
import style from '../styles/LandingPage.module.css';
import logo from '../images/logo.svg';

export default function LandingPage() {
    return (
        <div className={style.body}>
            <div>
            <img src={logo} alt="img not found" width='200px' height='100px'/>
            <h1 className={style.textLanding}>Your Pokemon... here!</h1>

                <Link to = '/home'>
                    <button className={style.buttonLanding}>Enter</button>
                </Link>
                
            </div>
        </div>
    )
}