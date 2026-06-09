import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-brand-oatmilk px-6 text-center">
      <p className="eyebrow-brand">Error 404</p>
      <h1 className="font-cormorant text-display-md font-light text-brand-burgundy">
        Page <span className="italic font-extralight">not found</span>
      </h1>
      <p className="max-w-md font-jakarta text-brand-burgundy/65">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link href="/" className="btn-brand">
        Back to home
      </Link>
    </div>
  );
}
