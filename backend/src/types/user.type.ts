import z from 'zod';

export const UserSchema = z.object({
    email: z.string().email().min(5),
    password: z.string().min(5),
    username: z.string().min(3).max(30),
    fullName: z.string().optional(),
    phoneNumber: z.string().optional(), // ✅ Changed from z.int() to z.string().optional()
    gender: z.enum(['male', 'female', 'other']),
    profilePicture: z.string().optional(),
    bio: z.string().max(160).optional(),
    role: z.enum(['user', 'admin']).default('user'),
});

export type UserType = z.infer<typeof UserSchema>;