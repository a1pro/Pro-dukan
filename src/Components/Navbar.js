import React, { Component } from 'react';

class Navbar extends Component {
    render() {
        return(
            <div>
              <header id="nav" className="header header-1 bg-white">
                <div className="header-wrapper">
                  <div className="container-m-30 clearfix">
                    <div className="logo-row">
                      <div className="logo-container-2">
                        <div className="logo-2">
                          <a href="index.html" className="clearfix">
                            <img src="images/produkaan_logo.png" className="logo-img" alt="Logo" />
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
                              <li className="parent">
                                <a href="http://112.196.9.211:8230/produkan/"><div className="main-menu-title">HOME</div></a>
                              </li>

                              <li className="parent">
                                <a href="http://112.196.9.211:8230/produkan/#about"><div className="main-menu-title">ABOUT US</div></a>
                              </li>

                              <li className="parent">
                                <a href="http://112.196.9.211:8230/produkan/#services-link"><div className="main-menu-title">SERVICES</div></a>
                              </li>

                              <li className="parent">
                                <a href="http://112.196.9.211:8230/produkan/#clients-link"><div className="main-menu-title">CLIENTS</div></a>
                              </li>

                              <li className="parent">
                                <a href="http://112.196.9.211:8230/produkan/#contact_us"><div className="main-menu-title">CONTACT US</div></a>
                              </li>

                              <li className="parent current">
                                <a href="http://112.196.9.211:8230/produkan/client.html"><div className="main-menu-title">CLIENT PORTAL</div></a>
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
}

export default Navbar;