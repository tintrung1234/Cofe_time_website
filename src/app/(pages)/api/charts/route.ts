import { createPool } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

// Initialize the connection pool
const pool = createPool({
    connectionString: process.env.POSTGRES_URL,
});

interface DashboardData {
    totalArticles: number;
    totalViews: number;
    totalViewsMonth: number;
    chartMonthly: { month: string; total_views: number }[];
    chartCategory: { name: string; total_views: number }[];
    maxViewArticle: Article | null;
    minViewArticle: Article | null;
}

interface Article {
    title: string;
    views: number;
    image: string;
    time_public: string;
    formatted_date: string;
}

export async function GET() {
    try {
        // Execute all queries in parallel
        const queries = await Promise.all([
            pool.query(`SELECT COUNT(articleid) AS total_articles FROM article`),
            pool.query(`SELECT SUM(views) AS total_views FROM article`),
            pool.query(`SELECT SUM(views) AS total_views_month 
                        FROM article
                        WHERE DATE_TRUNC('month', time_public) = DATE_TRUNC('month', CURRENT_DATE)`),
            pool.query(`SELECT DATE_TRUNC('month', time_public) AS month, 
                               SUM(views) AS total_views
                        FROM article
                        GROUP BY month
                        ORDER BY month`),
            pool.query(`SELECT SUM(a.views) AS total_views, 
                               a.category, 
                               c.name, 
                               c.category_code
                        FROM category c
                        FULL JOIN article a 
                            ON c.category_code = a.category
                        GROUP BY a.category, c.name, c.category_code
                        ORDER BY c.name, a.category`),
            pool.query(`SELECT articleid, title, views, image, time_public, 
                               TO_CHAR(time_public, 'DD/MM/YYYY') AS formatted_date
                        FROM article 
                        ORDER BY views DESC 
                        LIMIT 1`),
            pool.query(`SELECT articleid, title, views, image, time_public, 
                               TO_CHAR(time_public, 'DD/MM/YYYY') AS formatted_date
                        FROM article 
                        ORDER BY views ASC 
                        LIMIT 1`),
        ]);

        // Destructure query results
        const [
            sumArticle,
            sumView,
            sumViewMonth,
            chartMonthly,
            chartCategory,
            maxViewArticle,
            minViewArticle,
        ] = queries;

        // Structure the response data
        const data: DashboardData = {
            totalArticles: sumArticle.rows[0]?.total_articles || 0,
            totalViews: sumView.rows[0]?.total_views || 0,
            totalViewsMonth: sumViewMonth.rows[0]?.total_views_month || 0,
            chartMonthly: chartMonthly.rows.map((item) => ({
                month: new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long' }).format(item.month),
                total_views: item.total_views,
            })),
            chartCategory: chartCategory.rows.map((item) => ({
                name: item.name,
                total_views: item.total_views,
            })),
            maxViewArticle: maxViewArticle.rows[0] || null,
            minViewArticle: minViewArticle.rows[0] || null,
        };

        // Return response using NextResponse
        return NextResponse.json(data);
    } catch (error: unknown) {
        console.error('Error fetching dashboard data:', error);

        // Return error response
        return NextResponse.json(
            { error: 'Internal Server Error', details: (error as Error).message },
            { status: 500 }
        );
    }
}
