'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '../category.css';
import Loading from '@/app/loading';
import Head from 'next/head';

interface PageProps {
    params: {
        category_code: string;
    };
}

type Article = {
    articleid: number;
    title: string;
    summary: string;
    image: string;
    category_name: string;
};

export default function Page({ params }: PageProps) {
    const { category_code } = params;
    const [highlightResponse, setHighLightResponse] = useState<Article[]>([]);
    const [sideHighlightResponse, setSideHighLightResponse] = useState<Article[]>([]);
    const [articleResponse, setArticleResponse] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [categoryName, setCategoryName] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 2;

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            const [categoryNameResponse, highlightResponse, sideHighlightResponse, articleResponse] = await Promise.all([
                fetch(`/api/articles?categoryName=${category_code}`),
                fetch(`/api/articles?type=highlightCategory&category=${category_code}`),
                fetch(`/api/articles?type=highlightCategory&category=${category_code}&limit=4&offset=1`),
                fetch(`/api/articles?category=${category_code}&page=${currentPage}&limit=${itemsPerPage}`)
            ]);

            if (!categoryNameResponse.ok || !highlightResponse.ok || !sideHighlightResponse.ok || !articleResponse.ok) {
                throw new Error('Failed to fetch articles');
            }

            const [categoryData, highlightData, sideHighLightData, articleData] = await Promise.all([
                categoryNameResponse.json(),
                highlightResponse.json(),
                sideHighlightResponse.json(),
                articleResponse.json(),
            ]);

            setCategoryName(categoryData.result?.category_name || '');
            setHighLightResponse(highlightData.results || []);
            setSideHighLightResponse(sideHighLightData.results || []);
            setArticleResponse(articleData.results || []);
            setTotalPages(articleData.totalPages || 1);
        } catch (error) {
            console.error('Error fetching articles:', error);
            setError('Có lỗi xảy ra khi tải dữ liệu.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [category_code, currentPage]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p>{error}</p>;
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
        setCurrentPage(page);
    };

    return (
        <>
            <title>{categoryName || 'Danh mục tin'}</title>
            <Head>
                <title>{categoryName || 'Danh mục tin'}</title>
                <meta name="description" content='Danh mục tin' />
                <meta property="og:title" content='Danh mục tin' />
                <meta property="og:description" content='Danh mục tin' />
                <meta property="og:image" content='https://seoviet.vn/wp-content/uploads/2022/04/cach-tao-Category.jpg' />
                <meta property="og:url" content={`https://cofetime.vercel.app/category`} />
            </Head>

            <h2 className='category-title'>{categoryName || 'Không có danh mục'}</h2>
            <hr className='horizol-title' />
            <div className="bg-white container w-90 mb-5">
                <div className="row">
                    <div className="col-8">
                        <div className="d-flex flex-column mb-5 mt-4">
                            {highlightResponse.length > 0 ? highlightResponse.map((article) => (
                                <Link key={article.articleid} href={`/pageDetail/${article.articleid}`} className="d-flex flex-column">
                                    <Image
                                        alt={article.title}
                                        src={article.image}
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                    <div className="brief d-flex flex-column ">
                                        <h1 className="title mt-3 mt-1 font-weight-bold">{article.title}</h1>
                                        <p className="middleFontSize mb-0">{article.summary}</p>
                                    </div>
                                </Link>
                            )) : <p>Không có bài viết nổi bật nào.</p>}
                        </div>
                    </div>
                    <div className="d-flex py-3 col flex-column setWidth mt-4 pt-0">
                        {sideHighlightResponse.map((article) => (
                            <Link key={article.articleid} href={`/pageDetail/${article.articleid}`} className="row d-flex align-items-center justify-content-start mr-0 pb-1">
                                <Image
                                    alt={article.title}
                                    src={article.image}
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    style={{ maxWidth: '50%', height: 'auto' }}
                                    className='col px-0'
                                />
                                <div className="brief col text-box">
                                    <h4 className="title mt-3 editText w-100">{article.title}</h4>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <h2 className="category-title">Xem tất cả bài viết</h2>
            <hr className='horizol-title' />
            <div className="bg-white container w-90 mt-2 mb-5 d-flex flex-column">
                {articleResponse.length > 0 ? articleResponse.map((article) => (
                    <Link key={article.articleid} href={`/pageDetail/${article.articleid}`} className="row d-flex align-items-center justify-content-start mr-0 pb-1">
                        <Image
                            alt={article.title}
                            src={article.image}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ maxWidth: '20%', height: 'auto' }}
                            className='col '
                        />
                        <div className="brief col text-box2">
                            <h4 className="title mt-3 editText w-100">{article.title}</h4>
                            <p className="font-size-read-more">{article.summary}</p>
                        </div>
                    </Link>
                )) : <p>Không có bài viết nào.</p>}
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
                            const page = index + 1;
                            return (
                                <button
                                    key={page}
                                    className={`btn btn-number page-item ${currentPage === page ? 'btn-secondary' : 'btn-outline-primary'}`}
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
