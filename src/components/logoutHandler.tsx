'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
    const router = useRouter();
    async function LogOutEvent() {
        const response = await fetch('/api/admin/logout', {
            method: 'POST',
        });

        if (response.ok) {
            console.log('Logged out successfully');
            router.push('/');
        } else {
            console.error('Logout failed');
        }
    }

    return (
        <button className='btn-selection' onClick={LogOutEvent}
            style={{ border: 'none', backgroundColor: '#705C53', width: '100%', textAlign: 'left', color: 'white', paddingLeft: '5px' }}>
            Log Out
        </button>
    );
}