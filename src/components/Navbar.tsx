'use client'
import React from 'react';
import './navbar.css'

export default function Header() {
    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top">
            <div className="container">
                <a className="navbar-brand" href="#">NEWSWEBSITE</a>
                <button
                    id='navbar-toggle'
                    className="navbar-toggler d-lg-none"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapsibleNavId"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <div className='d-flex container-fluid alignCenter'>
                        <ul className="navbar-nav me-auto mt-2 mt-lg-0 mr-auto ml-auto">
                            <li className="nav-item">
                                <a className="nav-link active" href="#" aria-current="page">
                                    TRANG CHỦ
                                    <span className="visually-hidden">(current)</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">BÀI VIẾT HAY</a>
                            </li>
                            <li className="nav-item dropdown">
                                <div className="dropdown">
                                    <button className="btn dropdown-toggle categoryBtn" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        DANH MỤC
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                        <button className="dropdown-item" type="button">Action</button>
                                        <button className="dropdown-item" type="button">Another action</button>
                                        <button className="dropdown-item" type="button">Something else here</button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <form className="d-flex my-1 my-lg-0 hideOnMobile">
                        <input
                            className="form-control me-sm-1 search-click searchBox"
                            type="text"
                            placeholder="Search"
                        />
                        <div className='align-items-center d-flex'>
                            <button
                                className="btn btn-outline-success my-2 my-sm-0 searchBtn align-items-center"
                                type="submit"
                            >
                                <i className="bi bi-search iconSearch"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </nav>
    );
}