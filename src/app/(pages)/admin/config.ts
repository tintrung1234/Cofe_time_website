import { z } from 'zod'

const configScheme = z.object({
    NEXT_PUBLIC_API_AUTH: z.string()
})

const configProject = configScheme.safeParse({
    NEXT_PUBLIC_API_AUTH: process.env.NEXT_PUBLIC_API_AUTH
})

if (!configProject.success) {
    console.log(configProject.error.issues)
    throw new Error('Các giá trị khai báo trong file .env không hợp lệ')
}

const envConfig = configProject.data
export default envConfig