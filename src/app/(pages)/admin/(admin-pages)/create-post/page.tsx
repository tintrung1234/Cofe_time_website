'use client'
import Head from 'next/head'
import Editor from '@/components/EditorAdmin'
import './create-post.css'

const Home = () => {
    return (
        <div className='d-flex w-85 mr-auto w-100 flex-column'>
            <Head>
                <title>Document Editor</title>
                <meta name="description" content="A simple document editor" />
            </Head>

            <Editor />
        </div>
    )
}

export default Home;
