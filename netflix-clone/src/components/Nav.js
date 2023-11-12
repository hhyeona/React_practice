import React, { useEffect, useState } from 'react'
import "./Nav.css"

export default function Nav() {
// 스크롤 감지해서 Navigation bar 색 변경
    const [show, setShow] = useState(false);

    useEffect(()=>{
        window.addEventListener("scroll", () => {
            if(window.scrollY > 50) {
                setShow(true);
            }else {
                setShow(false);
            }
        })

        return () => {
            window.removeEventListener("scroll",()=>{});
        }
    },[])

  return (
    <nav className={`nav ${show && "nav_black"}`}>
        <img
        alt='Netflex logo'
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/300px-Netflix_2015_logo.svg.png'
        className='nav_logo'
        onClick={()=> window.location.reload()}></img>
        <img
        alt="User logged"
        src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
        className='nav_avatar'></img>
    </nav>
  )
}
