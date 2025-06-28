'use client'
import React from 'react'
import { useState } from 'react';
import DeleteAlert from './DeleteAlert';

interface deleteProps {
    articleId: number;
}

export default function ToggleDel({ articleId }: deleteProps) {
    const [showDeleteForm, setDeleteForm] = useState(false);

    const toggleDeleteForm = () => {
        setDeleteForm(true);
    };

    const clostDeleteForm = () => {
        setDeleteForm(false);
    };
    return (
        <>
            <button className='button-55 del-btn' onClick={toggleDeleteForm} >Xóa bài</button>
            {showDeleteForm && <DeleteAlert articleId={articleId} onClose={clostDeleteForm} />}
        </>
    )
}
