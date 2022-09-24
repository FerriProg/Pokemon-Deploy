import logo from '../images/logo.svg';
import notfound from '../images/notfoundd.png'
import { clearState } from '../redux/actions';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import style from '../styles/ErrorComp.module.css';

export default function ErrorComp() {

    const dispatch = useDispatch();

    function clear() {
        dispatch(clearState());
    }
    return (

        <div className={style.bodyReloading}>
            <img src={logo} alt="img not found" width='200px' height='100px'/>
            <h1 className={style.blue}>Nothing here.</h1>
            <img src={notfound} background='transparent' alt="img not found" width='300px' height='200px'/>
            <Link to="/home">
            <button className={style.blue} onClick={clear}>Return</button>
            </Link>
        </div>
    )
}