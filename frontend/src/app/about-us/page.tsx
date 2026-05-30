import {
  Heart,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  RefreshCw,
} from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'About Us | VELVETLUX',
  description:
    'Learn more about VELVETLUX, your destination for stylish dresses, clothing, belts, and bags.',
};

const values = [
  {
    icon: Sparkles,
    title: 'Modern Style',
    description:
      'We bring you fashion pieces that feel fresh, stylish, and easy to wear every day.',
  },
  {
    icon: Heart,
    title: 'Made for Confidence',
    description:
      'Our collection is selected to help you feel comfortable, confident, and ready for every occasion.',
  },
  {
    icon: ShieldCheck,
    title: 'Trusted Quality',
    description:
      'From dresses to bags, every product is chosen with attention to quality, comfort, and detail.',
  },
];

const features = [
  {
    icon: ShoppingBag,
    title: 'Curated Fashion',
    description: 'Dresses, clothing, belts, and bags selected for everyday style.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Quick and reliable shipping for a smooth shopping experience.',
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    description: 'Simple return and exchange support on eligible products.',
  },
];

export default function AboutUsPage() {
  return (
    <main className="bg-white text-black dark:bg-black dark:text-white">
      {/* Hero Section */}
      <section className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950">
          <div className="grid gap-10 p-8 md:p-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="mb-4 inline-flex rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
                About APNA DUKAN
              </span>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Fashion made for your everyday confidence.
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-neutral-600 dark:text-neutral-400 sm:text-lg">
                VELVETLUX is your destination for stylish dresses, clothing,
                belts, and bags. We believe fashion should be comfortable,
                expressive, and easy to style for every moment of your life.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/"
                  className="rounded-full bg-black px-7 py-3 text-center text-sm font-semibold text-white transition hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                >
                  Shop Collection
                </Link>

                <Link
                  href="/contact"
                  className="rounded-full border border-neutral-300 px-7 py-3 text-center text-sm font-semibold transition hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-neutral-200 dark:bg-neutral-900">
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80"
                  alt="Fashion shopping collection"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="absolute -bottom-6 left-6 right-6 rounded-2xl border border-neutral-200 bg-white p-5 shadow-xl dark:border-neutral-800 dark:bg-black">
                <p className="text-sm font-semibold">Premium Fashion Essentials</p>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  Designed for style, comfort, and everyday confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="mx-auto max-w-screen-xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Our Story
            </h2>

            <p className="mt-5 text-neutral-600 dark:text-neutral-400">
              VELVETLUX was created with one simple idea: make fashion shopping
              easier, cleaner, and more inspiring. We focus on products that can
              upgrade your wardrobe without making style complicated.
            </p>

            <p className="mt-4 text-neutral-600 dark:text-neutral-400">
              Whether you are looking for a dress for a special day, a stylish
              bag for daily use, a belt to complete your outfit, or comfortable
              clothing for your routine, our collection is built to help you
              look and feel your best.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-3xl bg-neutral-100 p-6 dark:bg-neutral-900">
              <h3 className="text-4xl font-bold">100+</h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                Curated fashion products
              </p>
            </div>

            <div className="rounded-3xl bg-neutral-100 p-6 dark:bg-neutral-900">
              <h3 className="text-4xl font-bold">4+</h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                Main fashion categories
              </p>
            </div>

            <div className="rounded-3xl bg-neutral-100 p-6 dark:bg-neutral-900">
              <h3 className="text-4xl font-bold">24/7</h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                Online shopping experience
              </p>
            </div>

            <div className="rounded-3xl bg-neutral-100 p-6 dark:bg-neutral-900">
              <h3 className="text-4xl font-bold">Easy</h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                Returns and support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="mx-auto max-w-screen-xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            What We Believe
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-neutral-600 dark:text-neutral-400">
            Our goal is to make fashion simple, stylish, and accessible for
            everyone.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {values.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-3xl border border-neutral-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-950"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 dark:bg-neutral-900">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-screen-xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-black p-8 text-white dark:bg-white dark:text-black md:p-12">
          <div className="grid gap-8 lg:grid-cols-3">
            {features.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title}>
                  <Icon className="h-8 w-8" />
                  <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-neutral-300 dark:text-neutral-700">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-screen-xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Ready to upgrade your style?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-neutral-600 dark:text-neutral-400">
          Explore stylish dresses, clothing, belts, and bags designed for every
          occasion.
        </p>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex rounded-full bg-black px-8 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
          >
            Start Shopping
          </Link>
        </div>
      </section>
    </main>
  );
}