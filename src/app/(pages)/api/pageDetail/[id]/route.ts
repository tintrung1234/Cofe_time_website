import { createPool } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

// Initialize the connection pool
const pool = createPool({
    connectionString: process.env.POSTGRES_URL,
});

interface ArticleProps {
    params: Promise<{
        id: string
    }>;
}

type Article = {
    articleid: number;
    title: string;
    summary: string;
    content: string;
    image: string;
    category: string;
    views: number;
};

export async function GET(req: NextRequest, { params }: ArticleProps) {
    const { id } = await params;
    try {
        // const articleId = (await params).articleId;
        console.log(id)
        if (!id) {
            return NextResponse.json({ error: "Invalid article ID" }, { status: 400 });
        }

        console.log("API called with articleId:", id);

        // Increment views
        await pool.query(`UPDATE article SET views = views + 1 WHERE articleid = $1`, [id]);

        // Fetch article details
        const { rows: articleDetails } = await pool.query<Article>(
            `
            SELECT *, TO_CHAR(time_public, 'DD/MM/YYYY') AS formatted_date 
            FROM article 
            WHERE articleid = $1
        `,
            [id]
        );

        if (articleDetails.length === 0) {
            return NextResponse.json({ error: "Article not found" }, { status: 404 });
        }

        const article = articleDetails[0];

        // Fetch related articles
        const { rows: relevantArticles } = await pool.query<Article>(
            `
            SELECT * FROM article 
            WHERE category = $1 
            AND articleid != $2 
            LIMIT 4
        `,
            [article.category, id]
        );

        // Return the combined data
        return NextResponse.json({ article, relevantArticles });
    } catch (error) {
        console.error("Error fetching article data:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
