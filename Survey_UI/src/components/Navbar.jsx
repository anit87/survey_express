import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../features/auth/authSlice';
import flag from '../assets/flag.png';
import './Navbar.css';
import { verifyUser } from '../utils/functions/verifyUser';
import { useLanguageData } from '../utils/LanguageContext';
import { modes, useModeData } from '../utils/ModeContext';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Navbar = () => {
    const { changeLanguage, language } = useLanguageData();
    const { mode, changeMode } = useModeData();

    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const [userDetail, setUserDetail] = useState({});

    useEffect(() => {
        const user = verifyUser(token);
        setUserDetail(user);
    }, []);

    useEffect(() => {
        changeLanguage(language);
    }, [changeLanguage, language]);

    const handleModeChange = (e) => {
        changeMode(e.target.value);
    };

    const handleLanguageChange = (e) => {
        changeLanguage(e.target.value);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light navcolor mb-3">
            <div className="container-fluid">
                <div className="navbar-brand logoFlag">
                    <img src={flag} alt="Flag Image" />
                </div>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* nav-items */}

                        <li className="nav-item">
                            <Link to="/surveys" style={{ textDecoration: "none" }} >
                                <div className='nav-link' style={{ color: "#ffffff" }}> Dashboard </div>
                            </Link>
                        </li>

                        {(userDetail.userRole == 'admin' || userDetail.userRole == 2) &&
                            <li className="nav-item">
                                <Link to="/allusers" style={{ textDecoration: "none" }} >
                                    <div className='nav-link' style={{ color: "#ffffff" }}> All Users </div>
                                </Link>
                            </li>
                        }
                        {
                            userDetail.userRole !== 'admin' &&
                            <li className="nav-item">
                                <Link to={mode === modes.commercial ? "/commercial" : "/form"} style={{ textDecoration: "none" }} >
                                    <div className='nav-link' style={{ color: "#ffffff" }}> Survey Form </div>
                                </Link>
                            </li>
                        }
                    </ul>
                    <form className="d-flex align-items-center">
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel id="demo-select-small-label"></InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={language}
                                label=""
                                onChange={handleLanguageChange}
                                style={{ color: '#ffffff' }}
                            >
                                <MenuItem value={'en'}>English</MenuItem>
                                <MenuItem value={'fr'}>Kannada</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel id="demo-select-small-label"></InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={mode}
                                label=""
                                onChange={handleModeChange}
                                style={{ color: '#ffffff' }}
                            >
                                <MenuItem value={modes.residential}>Residential</MenuItem>
                                <MenuItem value={modes.commercial}>Commercial</MenuItem>
                            </Select>
                        </FormControl>

                        <Link
                            style={{ color: '#ffffff', textDecoration: 'none' }}
                            to="/"
                            onClick={async () => {
                                localStorage.removeItem('surveyApp');
                                dispatch(reset());
                            }}
                        >
                            <div className="nav-link" style={{ fontSize: '14px' }} type="submit">
                                Logout
                            </div>
                        </Link>
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
