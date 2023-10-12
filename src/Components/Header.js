import React from 'react';
import HeaderImg from '../assets/headerimg.jpeg'
import Logo from '../assets/evisa.png'
import { Divider } from '@mui/material';

function Header() {
    return (
        <><div className='header'>
            <div>
                <img src={Logo} alt="image" height={'90px'} style={{ marginTop: '20px' }} />
            </div>
            <div>
                <img src={HeaderImg} alt="image" height={'130px'} width={'500px'} />
            </div>
        </div>
        <div style={{textAlign:"center"}}><h1>E-Visa Portal</h1></div>
        <Divider style={{ background: "#1a75ff", border:"2px solid #1a75ff" }} variant="middle"/>
        
        </>
    );
}

export default Header;