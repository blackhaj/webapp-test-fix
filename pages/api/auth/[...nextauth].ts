import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '~/prisma';

// Check if I can log when working locally
export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
        headers: {
          'X-PM-Message-Stream': 'outbound',
        },
      },
      from: 'hi@henryblack.co',
    }),
  ],
  theme: {
    colorScheme: 'light',
  },
});
