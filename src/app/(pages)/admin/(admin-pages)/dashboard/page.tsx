"use client";
import React, { useEffect, useState } from 'react';
import './dashboard.css';
import Link from 'next/link';
import Image from 'next/image';
import ToggleEditor from '@/components/ToggleEditor';
import ToggleDel from '@/components/ToggleDel';
import Loading from '@/app/loading';
import '@/app/(pages)/bai-viet-hay/style.css'

function isValidUrl(url: string) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

type Article = {
    articleid: number;
    title: string;
    summary: string;
    image: string;
    views: number;
}

export default function Dashboard() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        const fetchArticles = async (page: number) => {
            try {
                const response = await fetch(`/api/articles?all=true&page=${page}&limit=12`);
                if (!response.ok) {
                    throw new Error('Failed to fetch articles');
                }
                const data = await response.json();
                setArticles(data.results || []);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

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
        return <div className='d-flex w-85 mr-auto w-100'>Error: {error}</div>;
    }

    return (
        <div className="d-flex w-85 mr-auto w-100 flex-column">
            <div className="container">
                <div>
                    <ToggleEditor articleId={null} />
                </div>
                <div className="d-flex flex-wrap">
                    {articles.map((_article) => {
                        const imageSrc = isValidUrl(_article.image)
                            ? _article.image
                            : 'https://developers.google.com/static/maps/documentation/streetview/images/error-image-generic.png?hl=vi';

                        return (
                            <div className="border" style={{ width: '24%' }} key={_article.articleid}>
                                <Link
                                    href={`/pageDetail/${_article.articleid}`}
                                    className="d-flex align-items-center justify-content-center flex-column mt-3 p-0"
                                >
                                    <Image
                                        alt="Article Image"
                                        src={imageSrc}
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        style={{ width: '90%', height: 'auto' }}
                                    />
                                    <div className="brief d-flex flex-column setPaddingCategory">
                                        <h4 className="title mt-3 mt-1">{_article.title}</h4>
                                    </div>
                                </Link>
                                <div className="view-display">
                                    <p>View: {_article.views}</p>
                                </div>
                                <div className="button-gr px-3 d-flex justify-content-center mb-3">
                                    <ToggleEditor articleId={_article.articleid} />
                                    <ToggleDel articleId={_article.articleid} />
                                </div>
                            </div>
                        );
                    })}
                </div>
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
    );
}
