import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

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

const PageDetail = async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    let article: Article | null = null;
    let relevantArticles: Article[] = [];
    let error: string | null = null;

    try {
        const response = await fetch(`https://cofetime-git-main-tin-trungs-projects-023d9102.vercel.app/api/pageDetail/${id}`, {
            method: 'GET',
            cache: 'force-cache',
        });

        if (!response.ok) throw new Error('Article not found.');
        const data = await response.json();
        article = data.article;
        relevantArticles = data.relevantArticles;
    } catch (err) {
        error = (err as Error).message;
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
            <Head>
                <title>{article.title}</title>
                <meta name="description" content={article.summary} />
                <meta property="og:title" content={article.title} />
                <meta property="og:description" content={article.summary} />
                <meta property="og:image" content={article.image} />
                <meta property="og:url" content={`https://cofetime-git-main-tin-trungs-projects-023d9102.vercel.app/pageDetail/${article.articleid}`} />
                <meta name="twitter:title" content={article.title} />
                <meta name="twitter:description" content={article.summary} />
                <meta name="twitter:image" content={article.image} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>

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
};

// Xuất component
export default PageDetail;
