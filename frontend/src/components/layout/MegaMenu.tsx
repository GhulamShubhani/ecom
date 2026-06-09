'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { MEGA_MENU } from '@/constants/nav';
import type { MegaMenuKey } from '@/types/nav';
import { cn } from '@/lib/utils';

interface MegaMenuProps {
  /** Currently open menu, or null when closed. */
  openKey: MegaMenuKey | null;
  /** Called when the user moves their mouse outside the panel area. */
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

/**
 * Slide-in sidebar mega menu — opens from the left when hovering
 * Shop or Pihl Denim. Curated / Jewelry navigate directly without opening.
 */
export function MegaMenu({ openKey, onMouseEnter, onMouseLeave }: MegaMenuProps) {
  const isOpen = openKey !== null;
  const content = openKey ? MEGA_MENU[openKey] : null;

  return (
    <>
      {/* Backdrop — covers everything below the sticky header (announcement + header bar) */}
      <div
        aria-hidden
        className={cn(
          'fixed inset-x-0 bottom-0 top-[104px] z-30 bg-ink/30 backdrop-blur-[2px] transition-opacity duration-300 ease-soft',
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      {/* Panel */}
      <aside
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        aria-hidden={!isOpen}
        className={cn(
          'fixed bottom-0 left-0 top-[104px] z-40 w-[88vw] max-w-[380px] overflow-y-auto border-r border-ink/10 bg-cream-50 shadow-[8px_0_28px_-12px_rgba(0,0,0,0.18)] transition-transform duration-500 ease-soft',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-full flex-col px-8 py-10">
          {content && (
            <>
              {/* Render every menu's content; only the active one is in the DOM normally,
                  but we want height transitions to feel instant when re-opening. */}
              <div className="space-y-7">
                {content.sections.map((section, idx) => (
                  <ul
                    key={idx}
                    className={cn(
                      'space-y-3',
                      idx > 0 && 'border-t border-ink/10 pt-7',
                    )}
                  >
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="group flex items-center justify-between text-[16px] text-ink transition-colors hover:text-ink-soft"
                        >
                          <span className="link-underline">{link.label}</span>
                          {link.arrow && (
                            <ChevronRight
                              className="h-4 w-4 text-ink-muted transition-transform group-hover:translate-x-0.5"
                              strokeWidth={1.5}
                            />
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>

              {content.cta && (
                <div className="mt-auto pt-10">
                  <Link
                    href={content.cta.href}
                    className="inline-flex items-center gap-2 text-[12px] uppercase tracking-wider2 text-ink"
                  >
                    <span className="link-underline">{content.cta.label}</span>
                    <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </aside>
    </>
  );
}
