'use client'
import React, { useEffect, useRef, useState } from 'react';

export default function FloatBtn() {
    const [visible, setVisible] = useState(false);
    const myButtonRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const backToTop = () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
    };

    return (
        <div>
            {visible && (
                <button
                    id="btn-back-to-top"
                    ref={myButtonRef}
                    onClick={backToTop}
                    type="button"
                    style={{ display: 'block', position: 'fixed', bottom: '20px', right: '20px' }}
                    className="btn btn-danger btn-floating btn-lg"
                >
                    <i className="bi bi-arrow-up"></i>
                </button>
            )}
        </div>
    );
}