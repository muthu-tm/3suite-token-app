import React from "react";
import "./feature.css";
import {SlGlobe} from  "react-icons/sl"
import { IconContext } from "react-icons";

function Features() {
  return (
    <div className="feature-cont">
      <div className="f-head">Feature of bhlaa bhlaa bhlaa</div>
      <div className="f-desc">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
        mollitia, molestiae quas vel sint commodi repudiandae consequuntur
        voluptatum laborum numquam blanditiis harum quisquam eius sed odit
        fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
        accusantium nemo autem.
      </div>
      <div className="feature-card">
        <div className="single-fc">
        <IconContext.Provider
              value={{
                size: "5em",
                color: "#3fa45ab5",
                className: "global-class-name",
              }}
            >
              <div className="f-icon">
                < SlGlobe/>
              </div>
            </IconContext.Provider>
          <div className="s-fc-head">Flexibility</div>
          <div className="s-fc-desc">
            In order for DeFi to reach a point of critical mass adoption,
            individuals should be able to participate in a space where they know
            their investment isn’t vulnerable to bad actors. The EverRise
            Ecosystem helps provide security solutions for both DeFi projects
            and holders.
          </div>
        </div>
        <div className="single-fc">
        <IconContext.Provider
              value={{
                size: "5em",
                color: "#3fa45ab5",
                className: "global-class-name",
              }}
            >
              <div className="f-icon">
                < SlGlobe/>
              </div>
            </IconContext.Provider>
          <div className="s-fc-head">Innovation</div>
          <div className="s-fc-desc">
            In order for DeFi to reach a point of critical mass adoption,
            individuals should be able to participate in a space where they know
            their investment isn’t vulnerable to bad actors. The EverRise
            Ecosystem helps provide security solutions for both DeFi projects
            and holders.
          </div>
        </div>
        <div className="single-fc">
        <IconContext.Provider
              value={{
                size: "5em",
                color: "#3fa45ab5",
                className: "global-class-name",
              }}
            >
              <div className="f-icon">
                < SlGlobe/>
              </div>
            </IconContext.Provider>
          <div className="s-fc-head">Security</div>
          <div className="s-fc-desc">
            In order for DeFi to reach a point of critical mass adoption,
            individuals should be able to participate in a space where they know
            their investment isn’t vulnerable to bad actors. The EverRise
            Ecosystem helps provide security solutions for both DeFi projects
            and holders.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
