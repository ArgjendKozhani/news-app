import React from "react";
import {Menu , X} from "lucide-react"
import { useState } from "react";
import "./Navbar.css"; 

function Navbar({changeCategory}) {


     const [open, isOpen] = useState(false)

  return (

 
    <>
    <nav className="navbar">
        
      <div className="navbar-brand">Blitz News⚡</div>

      {open ? (
        <X className="menu-icon" onClick={() => isOpen(false)}/>
      ):
      <Menu className="menu-icon" onClick={()=> isOpen(true)} />
      }

     

        {open ? (
  <ul className="mobile-links">
    <li><button onClick={() => changeCategory("general")}>General</button></li>
    <li><button onClick={() => changeCategory("health")}>Health</button></li>
    <li><button onClick={() => changeCategory("sports")}>Sports</button></li>
    <li><button onClick={() => changeCategory("technology")}>Technology</button></li>
    <li><button onClick={() => changeCategory("business")}>Business</button></li>
    <li><button onClick={() => changeCategory("entertainment")}>Entertainment</button></li>
    <li><button onClick={() => changeCategory("science")}>Science</button></li>
  </ul>
) : (
  <ul className="navbar-links">
    <li><button onClick={() => changeCategory("general")}>General</button></li>
    <li><button onClick={() => changeCategory("health")}>Health</button></li>
    <li><button onClick={() => changeCategory("sports")}>Sports</button></li>
    <li><button onClick={() => changeCategory("technology")}>Technology</button></li>
    <li><button onClick={() => changeCategory("business")}>Business</button></li>
    <li><button onClick={() => changeCategory("entertainment")}>Entertainment</button></li>
    <li><button onClick={() => changeCategory("science")}>Science</button></li>
  </ul>
)}

    </nav>

 
    <hr />
    </>
    
    
  );
}

export default Navbar;
