import { RouterProvider, useRouter } from '@/router';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { ServicesPage } from '@/pages/ServicesPage';
import { ContactPage } from '@/pages/ContactPage';
import { InstagramFollow } from '@/components/InstagramFollow';
import { AdminApp } from '@/admin/AdminApp';

function PublicPages() {
  const { page } = useRouter();
  switch (page) {
    case 'home':
      return <HomePage />;
    case 'about':
      return <AboutPage />;
    case 'services':
      return <ServicesPage />;
    case 'contact':
      return <ContactPage />;
    default:
      return <HomePage />;
  }
}

function App() {
  const { route } = useRouter();

  if (route.kind === 'admin') {
    return <AdminApp />;
  }

  return (
    <div className="min-h-screen bg-ink-950">
      <Navbar />
      <main>
        <PublicPages />
      </main>
      <InstagramFollow />
      <Footer />
    </div>
  );
}

export default function AppWithRouter() {
  return (
    <RouterProvider>
      <App />
    </RouterProvider>
  );
}
