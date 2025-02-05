import { isInFuture, isValidDate } from '@/lib/utils';
import { z } from 'zod';

export const EVENT_SCHEMA = z.object({
  organizerName: z
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .max(30, 'Name must be at most 30 characters long'),
  organizationName: z
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .max(30, 'Name must be at most 30 characters long'),
  organizationPhoneNumber: z.string().min(11),
  organizationEmail: z.string().email().optional(),
  organizationWebsite: z.string().url().optional(),
  organizerPlan: z
    .enum(['free', 'basic', 'standard', 'premium'])
    .default('free'),
  eventName: z
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .max(30, 'Name must be at most 30 characters long'),
  eventAddress: z.string().optional(),
  eventCategory: z.array(z.string()).refine((val) => val.length > 0, {
    message: 'Please select at least one category',
  }),
  eventDate: z
    .string()
    .refine((date) => isValidDate(date), {
      message: 'Invalid date',
    })
    .refine((date) => isInFuture(date), {
      message: 'Start time must be in the future',
    }),
  eventStartTime: z
    .string()
    .refine((date) => isValidDate(date), {
      message: 'Invalid date',
    })
    .refine((date) => isInFuture(date), {
      message: 'Start time must be in the future',
    })
    .transform((val) => (val.length > 0 ? new Date(val).toISOString() : '')),
  eventEndTime: z
    .string()
    .refine((date) => isValidDate(date), {
      message: 'Invalid date',
    })
    .refine((date) => isInFuture(date), {
      message: 'Start time must be in the future',
    })
    .transform((val) => (val.length > 0 ? new Date(val).toISOString() : '')),
  eventLocation: z.string().min(3),
  ticketEventLink: z.string().url(),
  eventPrice: z
    .string()
    .refine((val) => parseFloat(val) > 0 && val.length > 0, {
      message: 'Price must be a positive number',
    })
    .transform((val) => parseFloat(val)),
  eventDescription: z.string().optional(),
  eventPlace: z.string().optional(),
});

export const USER_SCHEMA = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .max(30, 'Name must be at most 30 characters long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  confirmPassword: z
    .string()
    .min(8, 'Confirm Password must be at least 8 characters long'),
  location: z
    .string()
    .min(3, 'Location must be at least 3 characters long')
    .max(50, 'Location must be at most 50 characters long'),
  gender: z.enum(['male', 'female']).default('male'),
  role: z.enum(['user', 'admin']).default('user'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 characters long')
    .max(15, 'Phone number must be at most 15 characters long'),
  interests: z.array(z.string()).optional(),
});

export const LOGIN_SCHEMA = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  fcmToken: z.string().optional(),
});

export const ORGANIZER_SCHEMA = z.object({
  organizerName: z.string().min(3).max(30),
  organizationName: z.string().min(3).max(30),
  organizationField: z.string().min(3).max(30),
  organizationPhoneNumber: z.string().min(11),
  organizationEmail: z.string().email(),
  organizationWebsite: z.string().url(),
  advice: z.string().optional(),
});
