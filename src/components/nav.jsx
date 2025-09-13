import {Link} from "react-router-dom"; 
import { IoBookOutline } from 'react-icons/io5';
import './stlyes/Nav.css';

export default function Navbar() { 
    return ( 
        <nav> 
            <div id="logo_sec"> 
                <IoBookOutline size = {50} color = "#155DFC" id="logo" />
                <div id = "brandName"><h3>ReadEase</h3></div>
            </div>
            <div id = "links">
                <Link to = "/" className="link">Home</Link>
                <Link to = "/Read" className="link">Read</Link>
                <button  className="link  whiteButton" >Login</button>
            </div>
            
        </nav>
       
    )
}