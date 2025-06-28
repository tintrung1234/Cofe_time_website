import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// Define the GET handler
export async function GET() {
    try {
        const { rows: categories } = await sql`
            SELECT c.name, a.articleid, a.title, a.image, a.summary, c.category_code
            FROM category c
            FULL JOIN article a ON c.category_code = a.category
            ORDER BY c.name, a.category
        `;

        // Check if categories is valid
        if (!categories || categories.length === 0) {
            return NextResponse.json({ message: 'No categories available.' }, { status: 404 });
        }

        // Group articles by category
        const groupedCategories = categories.reduce((acc, { name, articleid, title, image, summary, category_code }) => {
            if (!acc[name]) {
                acc[name] = [];
            }
            acc[name].push({ articleid, title, image, summary, category_code });
            return acc;
        }, {} as Record<string, Array<{ articleid: number; title: string; image: string; summary: string; category_code: string }>>);

        // Send the grouped categories as a response
        return NextResponse.json(groupedCategories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}