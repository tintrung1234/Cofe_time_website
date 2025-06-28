'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Loading from '@/app/loading';
import './style.css'
import Head from 'next/head';

type Article = {
    articleid: number;
    title: string;
    summary: string;
    image: string;
    views: number;
};

export default function Dashboard() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const fetchArticles = async (page: number) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/articles?all=true&page=${page}&limit=12`);
            if (!response.ok) {
                throw new Error('Failed to fetch articles');
            }
            const data = await response.json();
            setArticles(data.results || []);
            setTotalPages(data.totalPages || 1); // Ensure your API returns `totalPages`.
        } catch (error: unknown) {
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles(currentPage);
    }, [currentPage]);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePageClick = (page: number) => {
        setCurrentPage(page)
    }

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div className="d-flex w-85 mr-auto w-100">Error: {error}</div>;
    }

    return (
        <div>
            <title>Bài viết hay</title>
            <Head>
                <title>Bài viết hay</title>
                <meta name="description" content='Bài viết hấp dẫn' />
                <meta property="og:title" content='Bài viết hấp dẫn' />
                <meta property="og:description" content='Bài viết hấp dẫn' />
                <meta property="og:image" content='https://images.squarespace-cdn.com/content/v1/5777ca7346c3c4623fd38986/1473801070938-XLTBK8H35WSXELM3O1S3/writing.jpg?format=1000w' />
                <meta property="og:url" content={`https://website-advertisement.vercel.app/bai-viet-hay`} />
            </Head>

            <h2 className="category-title">Bài viết hay</h2>
            <div className="bg-white container w-90 mt-2 mb-5 d-flex justify-content-between flex-column">
                <div className="row d-flex align-items-start">
                    {articles.map((article) => (
                        <Link
                            key={article.articleid}
                            href={`/pageDetail/${article.articleid}`}
                            className="col-3 d-flex align-items-center justify-content-center flex-column mt-3 p-0"
                        >
                            <Image
                                alt={article.title}
                                src={article.image}
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '90%', height: 'auto' }}
                                priority
                            />
                            <div className="brief d-flex flex-column setPaddingCategory">
                                <h4 className="title mt-3">{article.title}</h4>
                                <p>{article.summary}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="d-flex mt-4 button-group align-items-center">
                    <button
                        className="btn btn-primary"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <div className="d-flex mx-1">
                        {Array.from({ length: totalPages }, (_, index) => {
                            const page = index + 1; // Page numbers start at 1
                            return (
                                <button
                                    key={page}
                                    className={`btn btn-number page-item ${currentPage === page ? 'btn-secondary' : 'btn-outline-primary'
                                        }`}
                                    onClick={() => handlePageClick(page)}
                                >
                                    {page}
                                </button>
                            );
                        })}
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
