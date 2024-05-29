/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
    ];
  },
  env: {
    REACT_APP_FIREBASE_API_KEY: 'AIzaSyBmLgKo_PfzPcHED7tiADE_jap0j4eXZsg',
    REACT_APP_FIREBASE_DOMAIN: 'financial-wallet-eca73.firebaseapp.com',
    REACT_APP_FIREBASE_PROJECT_ID: 'financial-wallet-eca73',
    REACT_APP_FIREBASE_STORAGE_BUCKET: 'financial-wallet-eca73.appspot.com',
    REACT_APP_FIREBASE_MSG_SENDER_ID: '714822544579',
    REACT_APP_FIREBASE_APP_ID: '1:714822544579:web:e8065762a9a74326400676',
  },
};

export default nextConfig;
