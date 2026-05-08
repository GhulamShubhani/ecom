import { ANNOUNCEMENTS } from '@/constants/nav';

export function AnnouncementBar() {
  const items = [...ANNOUNCEMENTS, ...ANNOUNCEMENTS];

  return (
    <div className="overflow-hidden bg-ink text-cream-50">
      <div className="flex animate-marquee gap-12 whitespace-nowrap py-2 text-[11px] uppercase tracking-widest2">
        {items.map((msg, i) => (
          <span key={`${msg}-${i}`} className="inline-flex items-center gap-3">
            <span className="h-1 w-1 rounded-full bg-cream-50/50" aria-hidden />
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}
