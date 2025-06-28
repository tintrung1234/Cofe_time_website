'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Loading from '@/app/loading';
import Head from 'next/head';

type Article = {
    articleid: number;
    title: string;
    summary: string;
    image: string;
    category_code: string,
};

export default function Page() {
    const [groupedCategories, setGroupedCategories] = useState<Record<string, Article[]>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/categories');
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data: Record<string, Article[]> = await response.json(); // Specify the type here
                setGroupedCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
            setLoading(false)
        };

        fetchCategories();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            {Object.entries(groupedCategories).map(([category, articles]) => (
                <><title>{category || 'Danh mục tin'}</title><Head>
                    <title>{category || 'Danh mục tin'}</title>
                    <meta name="description" content='Danh mục tin' />
                    <meta property="og:title" content='Danh mục tin' />
                    <meta property="og:description" content='Danh mục tin' />
                    <meta property="og:image" content='https://seoviet.vn/wp-content/uploads/2022/04/cach-tao-Category.jpg' />
                    <meta property="og:url" content={`https://website-advertisement.vercel.app/category`} />
                </Head><div key={category}>
                        <h1 className="category-title">{category}</h1>
                        <div className="bg-white container w-90 mt-2 mb-5 d-flex justify-content-between flex-column">
                            {articles.map((article, index) => (
                                <>
                                    <div className="row d-flex align-items-start">
                                        <Link
                                            key={index}
                                            href={`/pageDetail/${article.articleid}`}
                                            className="p-1 col-3 d-flex align-items-center justify-content-center flex-column mt-3 p-0"
                                        >
                                            {article.image ? (
                                                <>
                                                    <Image
                                                        alt="image"
                                                        src={article.image}
                                                        layout="responsive"
                                                        width={300}
                                                        height={200}
                                                        style={{ width: '90%', height: 'auto' }} />
                                                    <div className="row justify-content-center pb-3">
                                                        <h4 className="title mt-3 mt-1">{article.title}</h4>
                                                        <p>{article.summary}</p>
                                                    </div>
                                                </>
                                            ) : (
                                                <div>No Article Available</div>
                                            )}
                                        </Link>
                                    </div>
                                    <div className="row justify-content-center pb-3">
                                        <Link href={`/categoryDetail/${article.category_code}`} className="button-custom col-2 text-center pe-auto">
                                            Xem thêm bài khác
                                        </Link>
                                    </div>
                                </>
                            ))}
                        </div>
                    </div></>
            ))}
        </div>
    );
}