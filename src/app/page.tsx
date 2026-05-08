import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { OccasionEdit } from '@/components/home/OccasionEdit';
import { FroyaJuliana } from '@/components/home/FroyaJuliana';
import { May17Outfits } from '@/components/home/May17Outfits';
import { PihlDenim } from '@/components/home/PihlDenim';
import { DenimGuideEssentials } from '@/components/home/DenimGuideEssentials';
import { Newsletter } from '@/components/home/Newsletter';

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-cream-50">
        <Hero />
        <OccasionEdit />
        <FroyaJuliana />
        <May17Outfits />
        <PihlDenim />
        <DenimGuideEssentials />
        <Newsletter />
      </main>

      <Footer />
    </>
  );
}
