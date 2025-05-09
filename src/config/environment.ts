export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    timeout: 5000,
  },
  auth: {
    cookieName: 'auth-token',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
  features: {
    enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  },
};