import ProtectedRoute from '@/components/ProtectedRoute';
import Header from '@/components/header/Header';

export default function MainApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <Header />
      {children}
    </ProtectedRoute>
  );
}
