import React from 'react';
import './navbar.css'
import Link from 'next/link';
import Image from 'next/image';
import picture from '../public/imgs/content.jpg'
import { sql } from '@vercel/postgres';
import Search from './search';

export default async function Header() {
    const { rows: categories } = await sql`Select * from category`
    return (
        <nav className="navbar navbar-expand-sm navbar-light w-100">
            <div className="container d-flex justify-content-aground w-90 ">
                <Link href="/" className="nav-name-link me-auto navbar-brand text text-center ml-3 pe-auto" >NEWSWEBSITE</Link>
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
                                <a className="nav-link active underline" href="/" aria-current="page">
                                    TRANG CHỦ
                                    <span className="visually-hidden">(current)</span>
                                </a>
                            </li>
                            <li className="nav-item underline">
                                <a className="nav-link" href="/bai-viet-hay">BÀI VIẾT HAY</a>
                            </li>
                            <li className="nav-item dropdown dropdown-parent sub-menu-parent">
                                <button className="btn dropdown-toggle categoryBtn" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    DANH MỤC
                                </button>
                                <div className='categoryMobile'>
                                    <div className="sub-menu categoryMenu d-flex" aria-labelledby="dropdownMenu2">
                                        <div className='contain-left mr'>
                                            <h3>Danh mục</h3>
                                            <hr />
                                            <div className='row'>
                                                {categories.map((category) => (
                                                    <div className='col-6'>
                                                        <Link className='itemCate' href={`/categoryDetail/${category.category_code}`}>{category.name}</Link>
                                                    </div>
                                                ))}
                                                <div className='col'>
                                                    <Link href='/category' className='button-custom'>Xem tất cả danh mục </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='content-right d-flex align-items-center '>
                                            <Image
                                                key='image'
                                                src={picture}
                                                alt='test-picture'
                                                width={200}
                                                height={200}
                                                className="object-cover w-full" />
                                        </div>
                                    </div>
                                </div>

                            </li>
                        </ul>
                    </div>

                    <Search />
                </div>
            </div>
        </nav>
    );
}