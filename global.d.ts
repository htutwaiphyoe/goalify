declare namespace NodeJS {
  interface ProcessEnv {
    DB_CONNECTION_STRING: string;
    DB_CONNECTION_STRING: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;

    DEV_API_BASE_URL: string;
    PROD_API_BASE_URL: string;
    DEV_DOMAIN_URL: string;
    PROD_DOMAIN_URL: string;

    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;

    NEXTAUTH_SECRET: string;

    SMTP_HOST: string;
    SMTP_PORT: number;
    SMTP_USER: string;
    SMTP_PASS: string;

    GMAIL_HOST: string;
    GMAIL_PORT: number;
    GMAIL_USER: string;
    GMAIL_PASS: string;

    STRIPE_PUBLISHABLE_KEY: string;
    STRIPE_SECRET_KEY: string;
    DEV_STRIPE_WEBHOOK_KEY: string;
    PROD_STRIPE_WEBHOOK_KEY: string;

    SENDER_EMAIL: string;
  }
}
