import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient, Db } from "mongodb";
import nodemailer from "nodemailer";

let dbInstance: Db | null = null;

function getDb(): Db {
  if (!dbInstance) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      // Return a dummy object during build time if URI is not yet set
      return {} as Db;
    }
    const client = new MongoClient(uri);
    dbInstance = client.db();
  }
  return dbInstance;
}

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export const auth = betterAuth({
  database: mongodbAdapter(getDb()),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    async sendResetPassword({ user, url }) {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: "পাসওয়ার্ড রিসেট করুন - Bazrdor",
        html: `<p>আপনার পাসওয়ার্ড রিসেট করতে নিচের লিংকে ক্লিক করুন:</p><a href="${url}">রিসেট পাসওয়ার্ড</a>`,
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    async sendVerificationEmail({ user, url }) {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: "ইমেইল যাচাই করুন - Bazrdor",
        html: `<p>আপনার Bazrdor অ্যাকাউন্ট ভেরিফাই করতে নিচের লিংকে ক্লিক করুন:</p><a href="${url}">ইমেইল ভেরিফাই করুন</a>`,
      });
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
});