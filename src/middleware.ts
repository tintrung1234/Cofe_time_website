import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    console.log('Middleware is running');
    const token = request.cookies.get('auth_token');

    if (!token) {
        return NextResponse.redirect(new URL('/'))
    }

    console.log(NextResponse);

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/dasboard', '/admin/create-post', '/admin/thong_ke']
};
