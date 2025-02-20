import * as z from 'zod';

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, 'name must be at least 3 characters')
    .max(20, 'name cannot exceed 20 characters'),
  email: z.string().email('Please provide a valid email'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    ),
});

export const registerInviteSchema = z.object({
  name: z
    .string()
    .min(3, 'name must be at least 3 characters')
    .max(20, 'name cannot exceed 20 characters'),
  email: z.string().email('Please provide a valid email'),
});

export const loginSchema = z.object({
  email: z.string().email('Please provide a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Please provide a valid email'),
});

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    ),
});

export const createNewsSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, "Title can't exceed 100 characters"),
  description: z
    .string()
    .min(20, 'Description must be at least 20 characters')
    .max(2000, "Description can't exceed 2000 characters"),
  image: z.string().optional(),
});
