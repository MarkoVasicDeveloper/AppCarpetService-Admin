import { useState } from "react";
import { Link } from "react-router-dom";

import { faBars } from "@fortawesome/free-solid-svg-icons";

import { headerProps } from "../../misc/header";

import { Button } from "../layout/button/Button";
import { Modal } from "../modal/modal";
import LogOut from "../logOut/logOut";


export default function Nav(): JSX.Element {
    const [showMobileNav, setShowMobileNav] = useState(false);

    return (
        <header>
            <div className="holder">
                <nav className="large-screen">
                    <ul>
                        {headerProps.map((prop, index) => {
                            return (
                                <li key={index}>
                                    <Link to={prop.link}> {prop.title} </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
                <div className="manu">
                    <span>WASHER</span>
                    <Button icon={faBars} onClickFunction={() => setShowMobileNav(!showMobileNav)} />
                </div>
            </div>

            <Modal open={showMobileNav} close={() => setShowMobileNav(!showMobileNav)}>
                <div className="mobile-nav">
                    <nav>
                        <ul>
                            {headerProps.map((prop, index) => {
                                return (
                                    <li key={index} className={`animation-${index}`}>
                                        <Link to={prop.link}> {prop.title} </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
            </Modal>
            <LogOut />
        </header>
    );
}