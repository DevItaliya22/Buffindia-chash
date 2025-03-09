import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './db';
import formSchema from './zod';

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the TypeScript Express API' });
});

app.post("/form", async (req: Request, res: Response) => {
  const { name, email , message } = formSchema.parse(req.body);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password:message,
    },
  });
  res.json({ message: "Form submitted successfully" });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

