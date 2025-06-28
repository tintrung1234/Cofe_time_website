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
    views: number;
    category_name: string;
};

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const type = searchParams.get("type");
        const category = searchParams.get("category");
        const all = searchParams.get('all');
        const categoryName = searchParams.get('categoryName');
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '2', 10);
        const offset = (page - 1) * limit;

        let query = '';
        let values: any[] = [];

        if (type === "popular") {
            query = `SELECT articleid, title, summary, image, views FROM article ORDER BY views DESC LIMIT 2`;
        } else if (type === "highlight") {
            query = `SELECT articleid, title, summary, image, views FROM article ORDER BY views DESC LIMIT 1 OFFSET 1`;
        } else if (type === "recent") {
            query = `SELECT articleid, title, summary, image FROM article ORDER BY articleid DESC LIMIT $1`;
            values = [limit];
        } else if (type === "highlightCategory") {
            const limit = parseInt(searchParams.get('limit') || '1', 10);
            const OFFSET = parseInt(searchParams.get('offset') || '0', 10);
            query = `SELECT articleid, title, summary, image, views, category FROM article WHERE category = $1 ORDER BY views DESC LIMIT $2 OFFSET $3`;
            values = [category, limit, OFFSET];
        } else if (category) {
            if (limit > 100) {
                return NextResponse.json({ message: "Limit exceeds maximum allowed value of 100." }, { status: 400 });
            }
            const totalQuery = `SELECT COUNT(*) FROM article WHERE category = $1`;
            const { rows: totalRows } = await pool.query(totalQuery, [category]);
            const totalCount = parseInt(totalRows[0].count, 10);
            const totalPages = Math.ceil(totalCount / limit);
            query = `SELECT articleid, title, summary, image FROM article WHERE category = $1 LIMIT $2 OFFSET $3`;
            values = [category, limit, offset];
            const { rows: results } = await pool.query<Article>(query, values);
            return NextResponse.json({ results, totalPages, currentPage: page, totalCount }, { status: 200 });
        } else if (categoryName) {
            query = `SELECT name AS category_name FROM category WHERE category_code = $1`;
            values = [categoryName];
            const { rows } = await pool.query(query, values);
            if (rows.length > 0) {
                return NextResponse.json({ result: rows[0] }, { status: 200 });
            } else {
                return NextResponse.json({ message: "Category not found" }, { status: 404 });
            }
        } else if (all) {
            if (limit > 100) {
                return NextResponse.json({ message: "Limit exceeds maximum allowed value of 100." }, { status: 400 });
            }
            const totalQuery = `SELECT COUNT(*) FROM article`;
            const { rows: totalRows } = await pool.query(totalQuery);
            const totalCount = parseInt(totalRows[0].count, 10);
            const totalPages = Math.ceil(totalCount / limit);
            query = `SELECT articleid, title, summary, image, views FROM article LIMIT $1 OFFSET $2`;
            values = [limit, offset];
            const { rows: results } = await pool.query<Article>(query, values);
            return NextResponse.json({ results, totalPages, currentPage: page, totalCount }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Invalid request" }, { status: 400 });
        }

        const { rows: results } = await pool.query<Article>(query, values);
        return NextResponse.json({ results }, { status: 200 });
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ message: "Database error occurred." }, { status: 500 });
    }
}
