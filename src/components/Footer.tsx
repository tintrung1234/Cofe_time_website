import Link from "next/link"
import React from 'react'

export default function Footer() {
    return (
        <footer className="bg-body-tertiary text-center">
            {/* Grid container  */}
            <div className="container p-4 pb-0">
                {/* Section: Social media  */}
                <section className="mb-4">
                    {/* Facebook  */}
                    <Link
                        data-mdb-ripple-init
                        className="btn text-white btn-floating m-1"
                        style={{ backgroundColor: '#3b5998', }}
                        href="#!"
                        role="button"
                    ><i className="bi bi-facebook"></i></Link>

                    {/* Twitter  */}
                    <a
                        data-mdb-ripple-init
                        className="btn text-white btn-floating m-1"
                        style={{ backgroundColor: '#55acee', }}
                        href="#!"
                        role="button"
                    ><i className="bi bi-twitter-x"></i></a>

                    {/* Google  */}
                    <a
                        data-mdb-ripple-init
                        className="btn text-white btn-floating m-1"
                        style={{ backgroundColor: '#dd4b39' }}
                        href="#!"
                        role="button"
                    ><i className="bi bi-google"></i></a>

                    {/* Instagram  */}
                    <a
                        data-mdb-ripple-init
                        className="btn text-white btn-floating m-1"
                        style={{ backgroundColor: '#ac2bac' }}
                        href="#!"
                        role="button"
                    ><i className="bi bi-instagram"></i></a>

                    {/* Linkedin  */}
                    <a
                        data-mdb-ripple-init
                        className="btn text-white btn-floating m-1"
                        style={{ backgroundColor: '#0082ca' }}
                        href="#!"
                        role="button"
                    ><i className="bi bi-linkedin"></i></a>
                </section>
                {/* Section: Social media  */}
            </div>
            {/* Grid container  */}

            {/* Copyright  */}
            <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                © 2024 Copyright:
                <a className="text-body" href="https://website-advertisement.vercel.app/">website-advertisement.vercel.app</a>
            </div>
            {/* Copyright  */}
        </footer >
    )
}

