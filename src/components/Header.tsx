import Link from 'next/link';
import { useRouter } from 'next/router';

export const Header = () => {
  const router = useRouter();

  return (
    <header className="max-w-2xl mx-auto w-full">
      <nav className="bg-gray-500 px-4 py-2">
        <Link
          className={router.pathname === '/' ? 'text-red-600' : ''}
          href="/"
        >
          Glowna
        </Link>
        <Link
          className={router.pathname === '/about' ? 'text-red-600' : ''}
          href="/about"
        >
          About
        </Link>
      </nav>
    </header>
  );
};
