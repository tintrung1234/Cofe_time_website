import { createPool } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

const pool = createPool({
    connectionString: process.env.POSTGRES_URL,
});

interface ArticleProps {
    params: Promise<{
        articleId: string
    }>;
}

// Handler function for GET requests to fetch an article by ID
export async function GET(request: NextRequest, { params }: ArticleProps) {
    const { articleId } = await params;

    try {
        const { rows: articles } = await pool.query(
            'SELECT * FROM article WHERE articleid = $1',
            [articleId] // Using parameterized query to prevent SQL injection
        );

        if (articles.length === 0) {
            return NextResponse.json({ message: 'Article not found.' }, { status: 404 });
        }

        return NextResponse.json(articles[0], { status: 200 });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
    }
}

// Handler function for POST requests to update or insert an article by ID
export async function POST(request: NextRequest, { params }: ArticleProps) {
    const { articleId } = await params;

    try {

        const { title, summary, content, image, category, price } = await request.json();

        // Validate required fields
        if (!title || !summary || !content || !image || !category || !price) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        console.log('Request body:', { title, summary, content, image, category, price });

        const query = `
                        INSERT INTO article (
                        ${articleId !== '-1' ? 'articleid, ' : ''}title, summary, content, image, category, price
                        ) VALUES (
                            ${articleId !== '-1' ? '$1, $2, $3, $4, $5, $6, $7' : '$1, $2, $3, $4, $5, $6'}
                        )
                        ${articleId !== '-1' ? `
                            ON CONFLICT (articleid) 
                            DO UPDATE SET 
                                title = EXCLUDED.title,
                                summary = EXCLUDED.summary,
                                content = EXCLUDED.content,
                                image = EXCLUDED.image,
                                category = EXCLUDED.category
                                ${price ? ', price = EXCLUDED.price' : ''}
                        ` : ''}
                    `;


        // Execute the SQL query with parameterized values
        const paramsArray = articleId !== '-1'
            ? [articleId, title, summary, content, image, category, price]
            : [title, summary, content, image, category, price];

        const result = await pool.query(query, paramsArray);

        return NextResponse.json(
            { message: `Article ${title} saved successfully`, result: result.rowCount },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error saving article:', error);
        return NextResponse.json({ error: 'Failed to save article from method.' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: ArticleProps) {
    const { articleId } = await params;
    try {
        const query = await pool.query(`
            DELETE FROM article 
            WHERE articleid = ${articleId}`)
        return NextResponse.json(
            { mess: `Article delete successfull` },
            { status: 200 },
        );
    } catch (error) {
        console.error(`Error deletee article:`, error);
        return NextResponse.json({ error: `Failed to delete` });
    }
}

