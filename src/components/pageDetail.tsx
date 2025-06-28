'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Loading from '@/app/loading';
import { Metadata } from 'next';

interface Article {
    articleid: string;
    title: string;
    summary: string;
    content: string;
    image: string;
    category: string;
    formatted_date: string;
    views: number;
}

interface PageProps {
    params: {
        id: string;
    };
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    // Fetch article data server-side for metadata
    const response = await fetch(`/api/pageDetail/${params.id}`);
    const data = await response.json();

    // If no article found, return default metadata
    if (!data.article) {
        return {
            title: 'Article Not Found',
            description: 'This article could not be found.',
            openGraph: {
                title: 'Article Not Found',
                description: 'This article could not be found.',
            },
        };
    }

    const article = data.article;

    // Return dynamic metadata for SSR
    return {
        title: article.title,
        description: article.summary,
        openGraph: {
            title: article.title,
            description: article.summary,
            images: article.image,
            url: `https://website-advertisement.vercel.app/pageDetail/${article.articleid}`,
        },
        twitter: {
            card: 'summary_large_image',
            title: article.title,
            description: article.summary,
            images: article.image,
        },
    };
}

export default function PageDetail({ params }: PageProps) {
    const [article, setArticle] = useState<Article | null>(null);
    const [relevantArticles, setRelevantArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchArticle() {
            setLoading(true); // Reset loading state for new fetch
            try {
                const response = await fetch(`/api/pageDetail/${params.id}`);
                if (!response.ok) throw new Error('Article not found.');
                const data = await response.json();
                setArticle(data.article);
                setRelevantArticles(data.relevantArticles);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        }

        fetchArticle();
    }, [params.id]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!article) {
        return <div>Không tìm thấy bài viết.</div>;
    }

    return (
        <div>
            <title>{article.title}</title>
            <div className="bg-white container mt-5 w-90 mb-5">
                <div className="row">
                    <h2 className="text-left mb-0 mt-4 ml-1">{article.title}</h2>
                    <p>Ngày đăng: {article.formatted_date}</p>
                    <p>Lượt xem: {article.views}</p>
                    <p>{article.summary}</p>
                    <div className="w-100 d-flex justify-content-center">
                        {article.image && (
                            <Image
                                alt={article.title}
                                src={article.image}
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '60%', height: 'auto' }}
                            />
                        )}
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: article.content }} />
                </div>
            </div>

            <h2 className="category-title">Các bài viết liên quan</h2>
            <div className="bg-white container w-90 mt-2 mb-5 d-flex justify-content-between flex-column">
                <div className="row d-flex align-items-start">
                    {relevantArticles.map((relatedArticle) => (
                        <Link
                            href={`/pageDetail/${relatedArticle.articleid}`}
                            className="col-3 d-flex align-items-center justify-content-center flex-column mt-3 p-0"
                            key={relatedArticle.articleid}
                        >
                            {relatedArticle.image && (
                                <Image
                                    alt={relatedArticle.title}
                                    src={relatedArticle.image}
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    style={{ width: '90%', height: 'auto' }}
                                />
                            )}
                            <div className="brief d-flex flex-column setPaddingCategory">
                                <h4 className="title mt-3 mt-1">{relatedArticle.title}</h4>
                                <p>{relatedArticle.summary}</p>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="row justify-content-center pb-3">
                    <Link href="/category" className="button-custom col-2 text-center pe-auto">
                        Xem thêm bài khác
                    </Link>
                </div>
            </div>
        </div>
    );
}
