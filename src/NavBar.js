import {Link} from "react-router-dom"

export default () => {
    return <>
        <nav>
            <ul>
                <Link to="/">Home</Link>
            </ul>
            <ul>
                <Link to="/about">About Us</Link>
            </ul>
        </nav>
    </>
}