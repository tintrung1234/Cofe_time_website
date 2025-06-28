import { NextRequest, NextResponse } from "next/server";
import { createPool } from "@vercel/postgres";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";

// Initialize PostgreSQL connection pool
const pool = createPool({
    connectionString: process.env.POSTGRES_URL,
});

const secretKey: string = process.env.SECRET_KEY || '5abd7212eb1a31914078162393963b67d7c30e2cc23e903d90b708e3b269b366e1d1e79fb0146d805970455bc29cc048';

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json();

        const encryptPassword = CryptoJS.AES.decrypt(password, secretKey);
        const decryptedPassword = encryptPassword.toString(CryptoJS.enc.Utf8);

        const encryptUsername = CryptoJS.AES.decrypt(username, secretKey);
        const decryptedUsername = encryptUsername.toString(CryptoJS.enc.Utf8);

        if (!username || !password) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        const query = `
            SELECT password FROM users WHERE username = $1
        `;
        const result = await pool.query(query, [decryptedUsername]);

        if (result.rowCount === 0) {
            return NextResponse.json(
                { message: "Invalid username or password" },
                { status: 401 }
            );
        }

        const user = result.rows[0];
        const isPasswordValid = await bcrypt.compare(decryptedPassword, user.password);

        console.log(decryptedPassword)
        console.log(user.password);
        console.log(isPasswordValid)

        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Invalid username or password" },
                { status: 401 }
            );
        }

        if (!secretKey) {
            throw new Error("Secret key is not defined");
        }

        const token = jwt.sign({ username }, secretKey, { expiresIn: "1d" });

        const response = NextResponse.json(
            { message: "Login successful" },
            { status: 200 }
        );

        response.cookies.set("auth_token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24,
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json(
            { message: "An error occurred during login" },
            { status: 500 }
        );
    }
}