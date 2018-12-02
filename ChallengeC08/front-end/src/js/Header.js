import React, { Component } from 'react';
import mainLogo from '../../src/images/logo-jobsity.png';
import jakob from '../../src/images/profile.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars, faAngleDown } from '@fortawesome/free-solid-svg-icons';

class Header extends Component {
    constructor(props){
        super(props);
    };


    // preventing form submit
    handleSubmit(event) {
        event.preventDefault();
    }

    render(){
        return (
            <header>
                <div className="logo-header">
                    <img id="logo" src={mainLogo} alt= "Jobsity Logo" />
                </div>
                <div className="main-header hide-on-small">
                <h1 className="">Bookshelf</h1>
                <form className="only-large-devices" onSubmit={this.handleSubmit} >
                    <div className="form-search">
                        <FontAwesomeIcon icon={faSearch} />
                        <input type="search" 
                                placeholder="Search..."                                 
                                onChange={this.props.searching}
                                />
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
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;