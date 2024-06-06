import Header from '@/components/header/Header';
import AuthProtectedRoute from '@/components/protectedRoutes/AuthProtectedRoute';

export default function MainApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProtectedRoute>
      <Header />
      {children}
    </AuthProtectedRoute>
  );
}
