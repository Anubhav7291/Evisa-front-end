import React from 'react';
import Logo from '../assets/evisa.png'

function Header() {
    return (
        <div>
            <img src={Logo} alt="image" height={'70px'}  />
        </div>
    );
}

export default Header;