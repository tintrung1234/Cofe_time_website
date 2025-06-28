'use client';
import React, { useState } from 'react';
import EditorForm from './EditorForm';

interface ToggleEditorProps {
    articleId?: number | null; // Keep articleId as optional
}

export default function ToggleEditor({ articleId }: ToggleEditorProps) {
    const [showEditorForm, setEditorForm] = useState(false);

    const toggleEditorForm = () => setEditorForm(true);

    const closeEditorForm = () => setEditorForm(false);

    // Provide a default value if articleId is null or undefined
    const safeArticleId = articleId ?? -1; // Change -1 to whatever default makes sense for your use case

    return (
        <div>
            {safeArticleId == -1 ?
                <button className="button-48" role="button" onClick={toggleEditorForm}><span className="text">Thêm bài viết</span>
                </button> : <button className='button-55' onClick={toggleEditorForm}>Chỉnh sửa</button>}
            {showEditorForm && <EditorForm articleId={safeArticleId} onClose={closeEditorForm} />}
        </div>
    );
}
