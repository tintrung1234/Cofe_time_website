'use client';

import React, { useEffect, useState } from 'react';
import './thongke.css';
import MonthlyView from './monthly_view';
import CategoryView from './category_view';
import Link from 'next/link';
import Loading from '@/app/loading';

interface DashboardData {
    totalArticles: number;
    totalViews: number;
    totalViewsMonth: number;
    chartMonthly: { month: string; total_views: number }[];
    chartCategory: { name: string; total_views: number }[];
    maxViewArticle: Article | null;
    minViewArticle: Article | null;
}

interface Article {
    articleid: number;
    title: string;
    views: number;
    image: string;
    time_public: string;
    formatted_date: string;
}

export default function Page() {
    const [data, setData] = useState<DashboardData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/charts');
                const result: DashboardData = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchData();
    }, []);

    if (!data) {
        return <Loading />;
    }

    return (
        <div className='column col-10 d-flex justify-content-around flex-column'>
            <div className='first-row row container d-flex flexOnMobile justify-content-between'>
                <div className='column d-flex column-mobile col-4 set-height'>
                    <div className='container border_custom p-3'>
                        <div className='d-flex justify-content-between'>
                            <p className='font-weight-bold title'>Tổng số bài viết</p>
                            <i className="bi bi-newspaper bi-icon"></i>
                        </div>
                        <p className='number-display'>{data.totalArticles}</p>
                    </div>
                </div>
                <div className='column d-flex column-mobile col-4 set-height'>
                    <div className='container border_custom p-3'>
                        <div className='d-flex justify-content-between'>
                            <p className='font-weight-bold title'>Tổng view</p>
                            <i className="bi bi-eye-fill bi-icon"></i>
                        </div>
                        <p className='number-display'>{data.totalViews}</p>
                    </div>
                </div><div className='column d-flex column-mobile col-4 set-height'>
                    <div className='container border_custom p-3'>
                        <div className='d-flex justify-content-between'>
                            <p className='font-weight-bold title'>View trong tháng</p>
                            <i className="bi bi-calendar-check bi-icon"></i>
                        </div>
                        <p className='number-display'>{data.totalViewsMonth}</p>
                    </div>
                </div>
            </div>

            <div className='second-row row container d-flex flexOnMobile justify-content-between mt-3'>
                <div className='column d-flex column-mobile col-8 set-height-chart'>
                    <div className='container border_custom p-3'>
                        <p className='font-weight-bold title'>View theo tháng</p>
                        <MonthlyView data={data.chartMonthly} />
                    </div>
                </div>
                <div className='column d-flex column-mobile col-4 set-height-chart'>
                    <div className='container border_custom p-3 '>
                        <p className='font-weight-bold title'>View theo danh mục</p>
                        <CategoryView data={data.chartCategory} />
                    </div>
                </div>
            </div>

            <div className='thirt-row row container d-flex flexOnMobile mt-3'>
                <div className='column d-flex column-mobile col-6'>
                    <div className='container border_custom p-3'>
                        <div className='d-flex justify-content-between flex-column'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className='font-weight-bold title'>Bài viết được xem nhiều nhất</p>
                                <i className="bi-icon bi bi-trophy-fill"></i>
                            </div>
                            <Link
                                href={`/pageDetail/${data.maxViewArticle?.articleid}`}>
                                <div className='d-flex flex-row'>
                                    <img src={data.maxViewArticle?.image}
                                        width={'30%'} height={'30%'} alt="image" />
                                    <div className='d-flex flex-column text-edit'>
                                        <h4>{data.maxViewArticle?.title}</h4>
                                        <p>Ngày đăng: {data.maxViewArticle?.formatted_date}</p>
                                        <p>View: {data.maxViewArticle?.views}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='column d-flex column-mobile col-6'>
                    <div className='container border_custom p-3'>
                        <div className='d-flex justify-content-between flex-column'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className='font-weight-bold title'>Bài viết được xem ít nhất</p>
                                <i className="bi-icon bi bi-thermometer-low"></i>
                            </div>
                            <Link
                                href={`/pageDetail/${data.maxViewArticle?.articleid}`}>
                                <div className='d-flex flex-row'>
                                    <img src={data.minViewArticle?.image}
                                        width={'30%'} height={'30%'} alt="image" />
                                    <div className='d-flex flex-column text-edit'>
                                        <h4>{data.minViewArticle?.title}</h4>
                                        <p>Ngày đăng: {data.minViewArticle?.formatted_date}</p>
                                        <p>View: {data.minViewArticle?.views}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}