import React from 'react'


const Footer = () => {   

    return ( 
    <footer>
        <div className="ui inverted vertical footer segment">
            <div className="ui center aligned container">  
            
            <img  alt="logo" 
                    src="./images/logo.png" 
                    className="ui centered mini image" />
            <div className="ui horizontal inverted small divided link list">
            
                <a className="item" href="https://www.instagram.com/">
                    <i className="instagram icon"></i>
                </a>
                <a className="item" href="https://www.facebook.com/">
                    <i className="facebook icon"></i>
                </a>
                <p className="item" >All rights reserved 2019</p>
            </div>
            </div>
        </div>  
    </footer>);
}
export default Footer;