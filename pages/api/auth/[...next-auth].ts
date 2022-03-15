import EmailProvider from 'next-auth/providers/email';
import NextAuth from 'next-auth/next';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { NextApiHandler } from 'next';

const prisma = new PrismaClient();

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);

export default authHandler;

const options = {
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  adapter: PrismaAdapter(prisma),
};
