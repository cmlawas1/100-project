// import './Header.css';
import logo from '../images/logo-brown-h.png'
import { useNavigate } from "react-router-dom";

export default function Menu(props) {
    let options = props.data;

    const navigate = useNavigate();
    const navigateToPage = (url) => {    
        navigate(url);
    }

    // returns the navigation bar in the UI with an input in App.js
    return (
        <>
            {/* navigation bar container */}
            <nav className="navbar">
                <form className="container-fluid justify-content-start">
                    {/* logo */}
                    <a className="navbar-brand" href="#"><img src={logo} alt="Bahay Kubo" height="60px" style={{ padding: "1%" }} /></a>
                    {/* <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button> */}

                    {/* menu options */}
                    <div>
                    {
                        options.map((option) => {
                            return <>
                                <button key={option.id} className="flesh" type="button" onClick={() => navigateToPage(option.url)}>{option.name}</button>
                            </>
                        })
                    }
                    </div>
                </form>
            </nav>
        </>
    )
}