import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-cream-50 px-6 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="font-serif text-display-md font-light text-ink">
        Page <span className="italic font-extralight">not found</span>
      </h1>
      <p className="max-w-md text-ink-soft">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link href="/" className="btn-solid">
        Back to home
      </Link>
    </div>
  );
}
