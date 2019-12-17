import React from 'react'
import config from "../../../config"

const Header = (props) => {
    return(
        <div>
            <header id="nav" className="header header-1 bg-white">
                <div className="header-wrapper">
                    <div className="container-m-30 clearfix">
                        <div className="logo-row">
                            <div className="logo-container-2">
                                <div className="logo-2">
                                    <a onClick={() => { props.history.push('/Admin'); }} className="clearfix">
                                        <img src={`${config.base_url}images/produkaan_logo.png`} className="logo-img" alt="Logo" />
                                    </a>
                                </div>
                            </div>
                            <div className="menu-btn-respons-container">
                                <button id="menu-btn" type="button" className="navbar-toggle btn-navbar collapsed" data-toggle="collapse" data-target="#main-menu .navbar-collapse">
                                    <span aria-hidden="true" className="icon_menu hamb-mob-icon"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="main-menu-container">
                        <div className="container-m-30 clearfix">
                            <div id="main-menu">
                                <div className="navbar navbar-default" role="navigation">
                                    <nav className="collapse collapsing navbar-collapse right-1024">
                                        <ul className="nav navbar-nav">
                                            <li className={`parent ${(window.location.href.toString() === config.base_url+'Admin') ? 'current' : '' }`}>
                                                <a  onClick={() => { props.history.push('/Admin'); }} ><div className="main-menu-title">HOME</div></a>
                                            </li>
                                            
                                            <li className="parent">
                                                <a href="#" className="open-sub"><div className="main-menu-title">ABOUT US</div></a>
                                            </li>

                                            <li className="parent">
                                                <a href="#" className="open-sub"><div className="main-menu-title">SERVICES</div></a>
                                            </li>					
                                            
                                            <li className="parent">
                                                <a href="#" className="open-sub"><div className="main-menu-title">CLIENTS</div></a>
                                            </li>					
                                            
                                            <li className="parent">
                                                <a href="#" className="open-sub"><div className="main-menu-title">CONTACT US</div></a>
                                            </li>	
                                            
                                            <li className={`parent ${(window.location.href.toString() === config.base_url+'Login') ? 'current' : '' }`}>
                                                <a onClick={() => { props.history.push('/Login'); }} ><div className="main-menu-title">CLIENT PORTAL</div></a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>						
                        </div>					
                    </div>
                </div>			  
            </header>
        </div>
    );
}

export default Header;