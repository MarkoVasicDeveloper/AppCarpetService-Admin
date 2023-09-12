import { Link } from "react-router-dom";

import { headerProps } from '../../misc/header';

export default function Nav() {
    return (
        <div className="navigation">
            <nav>
                <ul>
                    {
                        headerProps.map((prop, index) => (
                            <li key={index}>
                                <Link to={prop.link}> {prop.title} </Link>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </div>
    )
}