import React, { Component } from 'react';
import ReactDom from 'react-dom';
import mainLogo from '../../src/images/logo-jobsity.png';
import jakob from '../../src/images/profile.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars, faAngleDown, faGlobe, faTabletAlt, faUserTag } from '@fortawesome/free-solid-svg-icons';

class Header extends Component {
    render(){
        return (
            <header>
                <div className="logo-header">
                    <img id="logo" src={mainLogo} alt= "Jobsity Logo" />
                </div>
                <div className="main-header hide-on-small">
                <h1 className="">Bookshelf</h1>
                <form className="only-large-devices" action="index.html" method="post">
                    <div className="form-search">
                        <FontAwesomeIcon icon={faSearch} />
                        <input type="search" placeholder="Search..." />
                    </div>
                </form>
                </div>
                <div className="profile-header only-large-devices">
                    <div className="dropdown-menu">
                        <button type="button" name="button" className="dropdown-button">Jakob Treml <FontAwesomeIcon icon={faAngleDown} /></button>
                        <div className="dropdown-list">
                            <ul>
                                <li><a href="#">Profile</a></li>
                                <li><a href="#">Help</a></li>
                                <li><a href="#">Logout</a></li>
                            </ul>
                        </div>
                        <img src={jakob} alt="Profile Image" className="jakob" />
                    </div>
                </div>
                <div className="small-devices-navbar">
                    <div className="button-container">
                        <button type="button" name="button" className="navbar-toggler">
                        <FontAwesomeIcon icon={faBars} />
                        </button>
                    </div>
                    <div className="navbar-collapse">
                        <h1 className="only-on-small">Bookshelf</h1>
                        <form className="" action="index.html" method="post">
                        <div className="form-search">
                            <FontAwesomeIcon icon={faSearch} />
                            <input type="search" placeholder="Search..." className="" />
                        </div>
                        </form>
                        <div className="dropdown-collapse">
                        <button type="button" name="button" className="collapse-button">
                            <img src={jakob} alt="Profile Image" className="jakob" />
                            <span>Jakob Treml <FontAwesomeIcon icon={faAngleDown} /></span>
                        </button>
                        <div className="dropdown-collapse-list">
                            <ul>
                                <li><a href="#">Profile</a></li>
                                <li><a href="#">Help</a></li>
                                <li><a href="#">Logout</a></li>
                            </ul>
                        </div>
                        </div>
                        <div className="dropdown-collapse">
                            <button type="button" name="button" className="collapse-button">
                                <span>MAIN <FontAwesomeIcon icon={faAngleDown} /></span>
                            </button>
                            <div className="dropdown-collapse-list">
                                <ul>
                                    <li className="nav-list-item"><a href="#"><FontAwesomeIcon icon={faGlobe} /> Quito</a></li>
                                    <li className="nav-list-item"><a href="#"><FontAwesomeIcon icon={faGlobe} /> Cartagena</a></li>
                                    <li className="nav-list-item"><a href="#"><FontAwesomeIcon icon={faGlobe} /> Medellín</a></li>
                                    <li className="nav-list-item"><a href="#"><FontAwesomeIcon icon={faTabletAlt} /> Digital</a></li>
                                    <li className="nav-list-item"><a href="#"><FontAwesomeIcon icon={faUserTag} /> Personal Loans</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

ReactDom.render(<Header />, document.getElementById('root') );