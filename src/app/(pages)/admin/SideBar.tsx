import React from 'react'
import Link from 'next/link'
import './Sidebar.css'
import LogoutButton from '@/components/logoutHandler'

export default function SideBar() {
    return (
        <div className='side-bar side-bar p-3 column col-2'>
            <hr />
            <div className='user d-flex flex-row flexOnMobile'>
                <i className="bi bi-person-circle"></i>
                <div className='d-flex justify-content-center flex-column'>
                    <h4>Admin name</h4>
                    <p>Role: admin</p>
                </div>
            </div>
            <hr className='mt-0' />
            <div className='option'>
                <div className='d-flex flex-column'>
                    <div className='select-option'>
                        <Link href={'/admin/dashboard'}>Quảng lí bài viết</Link>
                    </div>
                    <div className='select-option'>
                        <Link href={'/admin/create-post'}>Viết bài</Link>
                    </div>
                    <div className='select-option'>
                        <Link href={'/admin/thong_ke'}>Thống kê</Link>
                    </div>
                    <div className='select-option'>
                        <Link href={'/admin/AI'}>AI</Link>
                    </div>
                    <LogoutButton />
                </div>
            </div>
        </div >
    )
}

export const dynamic = "force-dynamic";
