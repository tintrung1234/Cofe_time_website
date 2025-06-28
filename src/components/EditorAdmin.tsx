import React, { useState, useRef, useEffect } from 'react';

const Editor = () => {
    const [htmlContent, setHtmlContent] = useState<string>('<p>Start typing...</p>');
    const editorRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const savedContent = localStorage.getItem('documentContent');
        if (savedContent) {
            setHtmlContent(savedContent);
            if (editorRef.current) {
                editorRef.current.innerHTML = savedContent;
            }
        }
    }, []);

    const saveToLocalStorage = (content: string) => {
        localStorage.setItem('documentContent', content);
    };

    const handleChange = () => {
        if (editorRef.current) {
            const content = editorRef.current.innerHTML;
            setHtmlContent(content);
            saveToLocalStorage(content);
        }
    };

    const applyStyle = (style: string, value?: string) => {
        if (value === undefined) {
            document.execCommand(style, false);
        } else {
            document.execCommand(style, false, value);
        }
    };

    const addImage = (url: string) => {
        if (url) {
            const img = `<img src="${url}" style="width: 100%; max-width: 500px;" alt="Image" />`;
            document.execCommand('insertHTML', false, img);
        } else {
            alert('Please enter a valid image URL.');
        }
    };

    const addLink = (url: string) => {
        if (url) {
            document.execCommand('createLink', false, url);
        } else {
            alert('Please enter a valid link URL.');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            document.execCommand('insertHTML', false, '&nbsp;&nbsp;&nbsp;&nbsp;');
        }
    };

    const setCursorToEnd = () => {
        if (editorRef.current) {
            const range = document.createRange();
            const sel = window.getSelection();
            range.selectNodeContents(editorRef.current);
            range.collapse(false);
            sel?.removeAllRanges();
            sel?.addRange(range);
        }
    };

    useEffect(() => {
        setCursorToEnd();
    }, [htmlContent]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(htmlContent)
            .then(() => {
                alert('HTML content copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    };

    return (
        <div className='d-flex mr-auto w-100 flex-column'>
            <div className="d-flex w-100 margin">
                <div className='d-flex flex-wrap margin-right'>
                    <div className="select">
                        <select id="fontSizeSelect" onChange={(e) => applyStyle('fontName', e.target.value)}>
                            <option value="Arial">Arial</option>
                            <option value="Courier New">Courier New</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Times New Roman">Times New Roman</option>
                            <option value="Verdana">Verdana</option>
                            <option value="Tahoma">Tahoma</option>
                            <option value="Trebuchet MS">Trebuchet MS</option>
                            <option value="Comic Sans MS">Comic Sans MS</option>
                            <option value="Impact">Impact</option>
                            <option value="Lucida Console">Lucida Console</option>
                            <option value="Palatino Linotype">Palatino Linotype</option>
                            <option value="Gill Sans">Gill Sans</option>
                            <option value="Roboto">Roboto</option>
                            <option value="Open Sans">Open Sans</option>
                            <option value="Montserrat">Montserrat</option>
                            <option value="Lora">Lora</option>
                            <option value="Playfair Display">Playfair Display</option>
                            <option value="Merriweather">Merriweather</option>
                            <option value="Raleway">Raleway</option>
                        </select>
                    </div>

                    <div className="select">
                        <select id="fontSizeSelect" onChange={(e) => applyStyle('fontSize', e.target.value)}>
                            <option value="1">Tiny</option>
                            <option value="2">Small</option>
                            <option value="3">Normal</option>
                            <option value="4">Medium</option>
                            <option value="5">Large</option>
                            <option value="6">Very Large</option>
                            <option value="7">Huge</option>
                        </select>
                    </div>
                    <button className='button-4' onClick={() => applyStyle('bold')}><i className="bi bi-type-bold"></i></button>
                    <button className='button-4' onClick={() => applyStyle('italic')}><i className="bi bi-type-italic"></i></button>
                    <button className='button-4' onClick={() => applyStyle('underline')}><i className="bi bi-type-underline"></i></button>
                    <button className='button-4' onClick={() => applyStyle('strikeThrough')}><i className="bi bi-type-strikethrough"></i></button>
                    <button className='button-4' onClick={() => applyStyle('justifyLeft')}><i className="bi bi-justify-left"></i></button>
                    <button className='button-4' onClick={() => applyStyle('justifyCenter')}><i className="bi bi-text-center"></i></button>
                    <button className='button-4' onClick={() => applyStyle('justifyRight')}><i className="bi bi-justify-right"></i></button>
                    <button className='button-4' onClick={() => applyStyle('insertOrderedList')}><i className="bi bi-list-ol"></i></button>
                    <button className='button-4' onClick={() => applyStyle('insertUnorderedList')}><i className="bi bi-list-task"></i></button>
                    <button className='button-4' onClick={() => addImage(prompt('Enter image URL:') || '')}><i className="bi bi-images"></i></button>
                    <button className='button-4' onClick={() => addLink(prompt('Enter link URL:') || '')}><i className="bi bi-link-45deg"></i></button>
                    <button className='button-4' onClick={copyToClipboard}>Copy HTML</button>
                </div>
            </div>
            <div
                className="editable w-90 input-box my-3 editor margin"
                ref={editorRef}
                contentEditable
                onInput={handleChange}
                dangerouslySetInnerHTML={{ __html: htmlContent }}
                onKeyDown={handleKeyDown}
            ></div>
        </div>
    );
};

export default Editor;
