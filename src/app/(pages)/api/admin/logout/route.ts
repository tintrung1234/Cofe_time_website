import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, respone: NextResponse) {
    try {
        const respone = NextResponse.json({ message: 'Logged out successfuly' });

        respone.cookies.set('auth_token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: -1,
            path: '/'
        });

        return respone
    } catch (error) {
        console.error('Error durring logout: ', error);
        return NextResponse.json({ error: 'Failed to logout ' })
    }
}