import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './db';
import {ContactFormSchema,newsletterSchema, PartnerProgramFormSchema} from './zod';

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the TypeScript Express API' });
});


app.post("/add_email_for_newsletter", async (req: Request, res: Response) => {
  console.log(req.body);
  const data = newsletterSchema.safeParse(req.body);
  console.log(data.success);
  if(!data.success){
    return res.status(400).json({ message: "Invalid data" });
  }
  try{
    const newsletter = await prisma.newsletter.create({
      data: { email: data.data.email },
    });
    res.json({ message: "Email added to newsletter", newsletter });
  }catch(error){
    res.json({ message: "Email already exists" });
  }
});


app.post("/partner_program_form", async (req: Request, res: Response) => {
  console.log(req.body);
  const { success,data} = PartnerProgramFormSchema.safeParse(req.body);
  console.log(success);
  if(!success){
    return res.status(400).json({ message: "Invalid data" });
  } 
  const { name, email, phone, message, city } = data;
  const form = await prisma.partnerProgramForm.create({
    data: {
      name,
      email,
      mobile:phone,
      message,
      city,
    },
  });
  console.log("Form submitted successfully", form);
  res.json({ message: "Form submitted successfully", form });
});

app.post("/contact_form", async (req: Request, res: Response) => {
  console.log(req.body);
  const { success,data} = ContactFormSchema.safeParse(req.body);
  console.log(success);
  if(!success){
    return res.status(400).json({ message: "Invalid data" });
  }
  const { name, email, phone, message } = data;
  const form = await prisma.contactForm.create({
    data: {
      name,
      email,
      mobile:phone,
      message,
    },
  });
  console.log("Form submitted successfully", form);
  res.json({ message: "Form submitted successfully", form });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

