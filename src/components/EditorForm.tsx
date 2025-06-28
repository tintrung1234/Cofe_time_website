'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import './form.css';
import Image from 'next/image';
import { useRouter } from "next/navigation";

interface EditorFormProps {
    articleId: number;
    onClose: () => void;
}

export default function EditorForm({ articleId, onClose }: EditorFormProps) {
    const router = useRouter();
    const [article, setArticle] = useState<{
        title: string;
        summary: string;
        content: string;
        image: string;
        category: string;
        price: number;
    } | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [category, setCategory] = useState<string>('cong_nghe');
    const [price, setPrice] = useState<number>(0);

    // Fetch the article data on component mount
    useEffect(() => {
        if (articleId == -1) {
            setLoading(false);
            return;
        } // For create article form, skip fetching

        async function fetchArticle() {
            try {
                const response = await fetch(`/api/article/${articleId}`);
                if (!response.ok) throw new Error('Article not found.');
                const data = await response.json();
                setArticle(data);
                setCategory(data.category);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        }

        fetchArticle();
    }, [articleId]);


    // Handle form submission
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage(null);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const updateArticle = {
            title: formData.get('title') as string,
            summary: formData.get('summary') as string,
            content: formData.get('content') as string,
            image: formData.get('image') as string,
            category, // Use the state value directly
            price: parseFloat(formData.get('price') as string) || 0, // Get price from form or default to 0
        };
        console.log("Sending payload:", updateArticle);

        try {
            const response = await fetch(`/api/article/${articleId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateArticle),
            });

            if (!response.ok) {
                throw new Error('Failed to save article');
            }

            const result = await response.json();
            setMessage(result.message);
            setArticle(updateArticle);
            router.refresh();
        } catch (error) {
            setError((error as Error).message);
        }
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value); // Update category state
    };

    if (loading) return (
        <div>
            <div className='form-background'></div>
            <div className='d-flex align-items-center justify-content-center position-fixed box-background z-3'>
                <h3>Loading...</h3>
            </div>
        </div>
    );

    if (error) return (
        <div>
            <div className='form-background'></div>
            <div className='d-flex align-items-center justify-content-center position-fixed box-background z-3'>
                <button className="modal-close" onClick={onClose}>&#x2715;</button>
                <div>Error: {error}</div>
            </div>
        </div>
    );

    return (
        <div>
            <div className="form-background"></div>
            <div className="card-form mt-30 mb-50">
                <div className="card-title mx-auto">Chỉnh sửa bài viết</div>
                <button className="modal-close" onClick={onClose}>&#x2715;</button>

                <form onSubmit={handleSubmit}>
                    <span id="card-header">Tiêu đề:</span>
                    <div className="row row-1">
                        <div className="col">
                            <input type="text" name="title" defaultValue={article?.title} required />
                        </div>
                    </div>
                    <span id="card-header">Tóm tắt bài viết:</span>
                    <div className="row row-1">
                        <div className="col">
                            <input type="text" name="summary" defaultValue={article?.summary} required />
                        </div>
                    </div>
                    <span id="card-header">Nội dung:</span>
                    <div className="row-1">
                        <div className="row row-2">
                            <textarea className="textarea" name="content" defaultValue={article?.content} required />
                        </div>
                    </div>
                    <span id="card-header">Hình ảnh:</span>
                    <div className="row-1">
                        <div className="row row-2">
                            {article?.image ? (
                                <Image src={article.image} alt="Article Image" width={500} height={600} />
                            ) : <div>No image available</div>
                            }
                            <input type="text" name="image" defaultValue={article?.image} required placeholder='Nhập URL hình ảnh' />
                        </div>
                    </div>

                    <span id="card-header d-none">Phân loại:</span>
                    <div className="row-1 d-none">
                        <div className="row row-2">
                            <select className="boxSelect" name="category" value={category} onChange={handleCategoryChange}>
                                <option value="cong_nghe">Công nghệ</option>
                                <option value="giai_tri">Giải trí</option>
                                <option value="nghe_thuat">Nghệ thuật</option>
                                <option value="khoa_hoc">Khoa học</option>
                                <option value="van_hoa">Văn hóa</option>
                                <option value="giao_duc">Giáo dục</option>
                                <option value="gia_dinh">Gia đình</option>
                                <option value="thu_cung">Thú cưng</option>
                                <option value="loi_song">Lối sống</option>
                                <option value="am_nhac">Âm nhạc</option>
                                <option value="meo_vat">Mẹo vặt</option>
                            </select>
                        </div>
                    </div>

                    <span id="card-header">Giá tiền:</span>
                    <div className="row-1">
                        <div className="row row-2">
                            <input type="number" name="price" defaultValue={article?.price} required />
                        </div>
                    </div>
                    <button type="submit" className="btn-form d-flex mx-auto">
                        <b>{articleId != -1 ? 'Lưu' : 'Tạo'}</b>
                    </button>
                </form>

                {message && <div className="success-message">{message}</div>}
                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    );
}
