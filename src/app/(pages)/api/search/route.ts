import { createPool } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

// Initialize the connection pool
const pool = createPool({
    connectionString: process.env.POSTGRES_URL,
});

type Article = {
    articleid: number;
    title: string;
    summary: string;
    image: string;
};

// Handle GET requests
export async function GET(req: NextRequest) {
    try {
        // Parse the query parameters from the URL
        const { searchParams } = new URL(req.url);
        const q = searchParams.get("q"); // Extract the "q" parameter

        // Validate the "q" parameter
        if (!q) {
            return NextResponse.json(
                { message: "Search query is required" },
                { status: 400 }
            );
        }

        const decodedQuery = decodeURIComponent(q);

        const page = parseInt(searchParams.get('page') || '1', 10); // Default to page 1
        const limit = parseInt(searchParams.get('limit') || '12', 10); // Default to 12 items per page
        const offset = (page - 1) * limit;

        // Validate the "limit" parameter
        if (limit > 100) {
            return NextResponse.json(
                { message: "Limit exceeds maximum allowed value of 100." },
                { status: 400 }
            );
        }

        // Total count query with ILIKE (case insensitive)
        const totalQuery = `SELECT COUNT(articleid) AS count
                            FROM article 
                            WHERE LOWER(title) ILIKE $1`;
        const { rows: totalRows } = await pool.query(totalQuery, [`%${decodedQuery.toLocaleLowerCase()}%`]);
        const totalCount = parseInt(totalRows[0].count, 10);
        const totalPages = Math.ceil(totalCount / limit);

        // Paginated query with ILIKE (case insensitive)
        const { rows: results } = await pool.query<Article>(
            `SELECT articleid, title, summary, image 
             FROM article 
             WHERE LOWER(title) ILIKE $1
             LIMIT $2 OFFSET $3`,
            [`%${decodedQuery.toLocaleLowerCase()}%`, limit, offset]
        );

        console.log(results);

        return NextResponse.json(
            { results, totalPages, currentPage: page, totalCount },
            { status: 200 }
        );
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
