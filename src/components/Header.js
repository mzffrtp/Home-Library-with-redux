import React from "react";

import { Link } from "react-router-dom";

import logo from "../assets/imgs/bookshelf.png"

const Header = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-sm navbar-dark bg-info">
                <div className="container-fluid">
                    <div>
                        <img src={logo} />
                    </div>
                    <Link className="navbar-brand d-flex" style={{fontSize:"1.5rem", color:"black"}} to="/">
                        Book Shelf
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item d-flex">
                                <Link className="nav-link active" style={{fontSize:"1.2rem"}} to="/">
                                    Book Listing
                                </Link>
                                <Link className="nav-link active" style={{fontSize:"1.2rem"}} to="/add-book">
                                    Add Book
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};
export default Header;