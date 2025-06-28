'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Article = {
    articleid: number;
    title: string;
    summary: string;
    image: string;
};

export default function Search() {
    const [query, setQuery] = useState<string>('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query) return;
        router.push(`/search-result?q=${encodeURIComponent(query.toLowerCase())}`);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setQuery(input);
    };

    return (
        <div>
            <form className="d-flex my-1 my-lg-0 hideOnMobile" onSubmit={handleSearch}>
                <input
                    className="form-control me-sm-1 search-click searchBox"
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Search articles..."
                    autoComplete="off"
                />
                <div className='align-items-center d-flex'>
                    <button className="btn btn-outline-success my-2 my-sm-0 searchBtn align-items-center"
                        type='submit'>
                        <i className="bi bi-search iconSearch"></i>
                    </button>
                </div>
            </form>
        </div>
    );
}
