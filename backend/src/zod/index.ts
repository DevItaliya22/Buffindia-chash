import { z } from 'zod';

const ContactFormSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    message: z.string(),
});


const newsletterSchema = z.object({
    email: z.string().email(),
});

const PartnerProgramFormSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    message: z.string(),
    city: z.string(),
});

export  {newsletterSchema,ContactFormSchema,PartnerProgramFormSchema};

