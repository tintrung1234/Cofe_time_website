import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        // Đọc body của request một lần và lưu vào biến
        const body = await req.json();
        const { prompt } = body;

        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required.' }, { status: 400 });
        }

        const apiKey = process.env.API_AI_KEY;  // Đảm bảo biến này có trong file .env
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            { text: prompt }  // Sử dụng prompt trực tiếp ở đây
                        ]
                    }
                ]
            }),
        });

        if (!response.ok) {
            const errorResponse = await response.text();
            console.log('Response Body:', errorResponse);
            return NextResponse.json({ error: errorResponse || 'API Error' }, { status: 500 });
        }

        const data = await response.json();

        const generatedContent = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No content generated.';

        return NextResponse.json({ generatedContent }, { status: 200 });
    } catch (error) {
        console.error('Error details:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
