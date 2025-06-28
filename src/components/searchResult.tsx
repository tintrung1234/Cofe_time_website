'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Loading from '@/app/loading';
import '../app/(pages)/bai-viet-hay/style.css'
import Head from 'next/head';

type Article = {
    articleid: number;
    title: string;
    summary: string;
    image: string;
};

export default function ResultsPage() {
    const searchParams = useSearchParams();
    const q = searchParams.get('q'); // Get the search query
    const page = parseInt(searchParams.get('page') || '1', 10); // Get the current page, default to 1
    const limit = 12; // You can adjust the limit based on your requirements

    const [results, setResults] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        if (!q) return;

        async function fetchArticles() {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/search?q=${encodeURIComponent(q ? q : '')}&page=${page}&limit=${limit}`);
                const data = await response.json();

                if (Array.isArray(data)) {
                    setResults(data);
                    setTotalPages(1);
                } else if (data.results && Array.isArray(data.results)) {
                    setResults(data.results);
                    setTotalPages(data.totalPages || 1);
                }

            } catch (err) {
                console.error('Error fetching search results:', err);
                setError('Error fetching search results');
            } finally {
                setLoading(false);
            }
        }

        fetchArticles();
    }, [q, page]);

    if (!q) {
        return <Loading />;
    }

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div className='container text-center p-5'>Error: {error}</div>;
    }

    if (results.length === 0) {
        return (
            <div className="bg-white container w-90 mt-2 mb-5">
                <h3>No results found for "{q}"</h3>
            </div>
        );
    }

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


    return (
        <>
            <title>Tìm kiếm</title>
            <Head>
                <title>Tìm kiếm</title>
                <meta name="description" content='Searching' />
                <meta property="og:title" content='Searching' />
                <meta property="og:description" content='Search result' />
                <meta property="og:image" content='https://storage.googleapis.com/twg-content/images/MarketingResources_Thumbnail_Search.width-1200.jpg' />
                <meta property="og:url" content='https://website-advertisement.vercel.app/' />
            </Head>

            <div className="bg-white container w-90 mt-2 mb-5">
                <h3>Search Results for "{q}"</h3>
                <div className="d-flex py-3 col flex-column setWidth mt-4 pt-0">
                    {results.map((article) => (
                        <Link href={`/pageDetail/${article.articleid}`} key={article.articleid}>
                            <div className="row d-flex align-items-center justify-content-start mr-0 pb-1">
                                <Image
                                    alt={article.title}
                                    src={article.image}
                                    width={200}
                                    height={150}
                                    style={{ maxWidth: '20%', height: 'auto' }}
                                    className="col"
                                />
                                <div className="brief col text-box2">
                                    <h4 className="title mt-3 editText w-100">{article.title}</h4>
                                    <p className="font-size-read-more">{article.summary}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Pagination */}
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
        </>
    );
}
