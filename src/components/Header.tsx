'use client';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react'
import './header.css'
import Nav from './Nav';
import Sci from './Sci';
import SearchForm from './SearchForm';

export default function Header() {
    const [open, setOpen] = useState(false);
    const [on, setOn] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFormOpen = (e: Event | any) => {
        e.preventDefault();
        setOpen(!open);
    };

    const handleToggle = () => {
        setOn(!on);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const body: HTMLElement | any = document.querySelector('body')
        body.classList.toggle('mobile-nav-active');
    };

    return (
        <header className='header d-flex align-items-center fixed-top'>
            <div className="container-fliud container-xl d-flex align-items-center justify-content-between">
                <a href="/" className='logo d-flex align-items-center'>
                    <h1>DigitalNews</h1>
                </a>
                <Nav />
                <div className="position-relative">
                    <Sci />
                    <a className='mx-2 js-search-open' onClick={handleFormOpen}>
                        <span className='bi-search'></span>
                    </a>

                    {
                        on ? (
                            <i className='bi bi-x mobile-nav-toggle'
                                onClick={handleToggle}></i>
                        ) : (
                            <i className='bi bi-list mobile-nav-toggle'
                                onClick={handleToggle}></i>
                        )
                    }

                    <SearchForm active={open} formOpen={handleFormOpen} />
                </div>
            </div>
        </header>
    )
}
