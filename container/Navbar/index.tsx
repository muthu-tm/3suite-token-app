import React, { useState, useEffect, useContext } from "react";

import { Link } from "react-scroll";
import useWindowSize from "../../utils/windowSize";
import { images } from "../../assets/image";
import { useRouter } from "next/router";
import { ConnectWallet, useAddress, useChain } from "@thirdweb-dev/react";
var Pathname:any;

function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<any>(null);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 5 || scrollY - lastScrollY < -5)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection);
    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, [scrollDirection]);

  return scrollDirection;
}

function Navbar() {

  const address = useAddress();
  const chain = useChain();
  const router = useRouter();
  const windowSize = useWindowSize();
  const [click, setClick] = React.useState(false);
  const scrollDirection = useScrollDirection();

  useEffect(()=>{
    if (typeof window !== 'undefined') {
      Pathname =window.location.pathname
      } else {
      console.log('You are on the server,Cannot execute')
     }
  },[])

  return (
    <section
      className={`headbar ${scrollDirection === "down" ? "hide" : "show"}`}
    >
      <div className="nav-cont">
        <div onClick={() => router.push("/")}>
          <img src={images.LogoImage.src} alt="" className="l-img" />
        </div>

        {Pathname == "/" ? (
          <ul>
            <Link activeClass="active" to="home" spy={true} smooth={true}>
              <li>Home</li>
            </Link>
            <Link to="product" spy={true} smooth={true}>
              <li>Products</li>
            </Link>
            <Link to="newsletter" spy={true} smooth={true}>
              <li>Newsletter</li>
            </Link>
            <div onClick={() => router.push("/user-activity")}>
              <li>User Activity</li>
            </div>
          </ul>
        ) : (
          <></>
        )}

<ConnectWallet theme="dark" /> 
      </div>
    </section>
  );
}

export default Navbar;
