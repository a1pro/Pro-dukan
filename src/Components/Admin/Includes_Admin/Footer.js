import React from 'react'
import config from '../../../config'

const Footer = (props) => (
    <div>
        <footer id="footer4" className="page-section pt-60 pb-50 footer2-black">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-sm-4 widget">
                        <div className="logo-footer-cont">
                            <a onClick={() => { props.history.push('/Admin'); }}>
                                <img className="logo-footer" src={`${config.base_url}images/produkaan_logo.png`} alt="logo" />
                            </a>
                        </div>                
                    </div>              
                    <div className="col-md-4 col-sm-4 widget">
                        <h4>Navigate</h4>
                        <ul className="links-list a-text-cont a-text-main-cont font-poppins">
                            <li><a onClick={() => { props.history.push('/Admin'); }}>Home</a></li>
                            <li><a href="shortcodes.html">About Us</a></li>
                            <li><a href="services.html">Services</a></li>
                            <li><a href="index-portfolio.html">Clients</a></li>
                            <li><a href="index-blog.html">Contact Us</a></li>
                            <li><a href="index-shop.html">Client Portal</a></li>
                        </ul>
                    </div>              
                    <div className="col-md-4 col-sm-4 widget">
                        <h4>Find Us Here</h4>
                        <div className="footer2-text-cont">
                            <address>
                                8552 West 133rd St<br />
                                Overland Park, KS 66213
                            </address>
                        </div>
                        <div className="footer2-text-cont">
                            913-526-1145<br />
                            <a className="a-text" href="mailto:info@haswell.com">info@produkaan.com</a>
                        </div>
                    </div>
                </div>
                <div className="footer2-copy-cont clearfix">
                    <div className="left">
                        <a className="footer2-copy" onClick={() => {props.history.push('/Admin'); }} target="_blank">&copy; produkaan</a>
                    </div>
                </div>                    
            </div>
        </footer>
        {/* <p id="back-top">
            <a href="#top" title="Back to Top"><span class="icon icon-arrows-up"></span></a>
        </p> */}
    </div>
);

export default Footer;