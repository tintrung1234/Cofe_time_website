'use client'
import React, { FormEvent, useState } from 'react'
import './deleteAlert.css'
import { useRouter } from 'next/navigation'

interface DeleteProps {
    articleId: number;
    onClose: () => void;
}

export default function DeleteModal({ articleId, onClose }: DeleteProps) {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const deleteArticle = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage(null);
        setError(null);
        setIsSubmitting(true);

        try {
            const response = await fetch(`/api/article/${articleId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete the article');
            }

            const result = await response.json();
            setMessage(result.message || 'Article deleted successfully!');
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setIsSubmitting(false);
            router.refresh();
        }
    };

    return (
        <div className="modal-container">
            <form onSubmit={deleteArticle}>
                <input id="modal-toggle" type="checkbox" defaultChecked />
                <label className="modal-backdrop" htmlFor="modal-toggle"></label>
                <div className="modal-content">
                    <button className="modal-close" onClick={onClose}>&#x2715;</button>
                    <h2>Xóa bài viết</h2>
                    <hr />
                    <p>Bạn xác nhận xóa chứ!</p>
                    <button
                        className="modal-content-btn"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Đang xóa...' : 'OK'}
                    </button>
                    {/* Display success or error messages dynamically */}
                    {message && <div className="success-message">{message}</div>}
                    {error && <div className="error-message">{error}</div>}
                </div>
            </form>

        </div>
    );
}
