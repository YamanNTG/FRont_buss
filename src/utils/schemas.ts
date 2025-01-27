import { z } from 'zod';

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
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
});

export const loginSchema = z.object({
  email: z.string().email('Please provide a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
