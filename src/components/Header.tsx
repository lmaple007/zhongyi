import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-emerald-700 flex items-center">
          <span className="mr-2">🌿</span>
          中医资格考试AI助手
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="/pharmacist" className="hover:text-emerald-600 transition-colors">
            中药师
          </Link>
          <Link href="/specialist" className="hover:text-emerald-600 transition-colors">
            中医确有专长
          </Link>
          <Link href="/assistant" className="hover:text-emerald-600 transition-colors">
            中医助理医师
          </Link>
          <Link href="/physician" className="hover:text-emerald-600 transition-colors">
            中医执业医师
          </Link>
          <Link href="/about" className="hover:text-emerald-600 transition-colors">
            关于我们
          </Link>
        </nav>
        <div className="md:hidden">
          {/* Mobile menu button - we would implement toggle functionality with useState */}
          <button className="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
} 