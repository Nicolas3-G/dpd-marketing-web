"use client";

import Image from "next/image";
import { useState } from "react";

export type TeamMember = {
  name: string;
  title: string;
  image?: string;
  hoverBio?: string;
};

function joinClasses(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const gridClass =
  "grid list-none grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-6 xl:gap-x-8";

const bioPanelWidth = "lg:w-52 xl:w-60";
const siblingShift = "lg:translate-x-[calc(13rem+1.25rem)] xl:translate-x-[calc(15rem+1.5rem)]";

export function TeamMemberGrid({
  members,
}: {
  members: readonly TeamMember[];
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="min-w-0 max-w-full overflow-x-clip">
      <ul className={gridClass}>
        {members.map((member, i) => {
          const hasBio = Boolean(member.hoverBio);
          const open = hasBio && activeIndex === i;
          const shiftSibling = activeIndex !== null && i > activeIndex;

          return (
            <li
              key={member.name}
              className={joinClasses(
                "flex min-w-0 flex-col gap-3 transition-transform duration-500 ease-out",
                shiftSibling && siblingShift,
              )}
              onMouseLeave={() => activeIndex === i && setActiveIndex(null)}
            >
            <div className="relative">
              <div
                className="relative aspect-square w-full overflow-hidden border border-custom-black/8 bg-[#ebe8df]"
                onMouseEnter={() => hasBio && setActiveIndex(i)}
              >
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  />
                ) : (
                  <span className="sr-only">Photo coming soon</span>
                )}
              </div>

              {hasBio ? (
                <div
                  aria-hidden={!open}
                  className={joinClasses(
                    "overflow-hidden transition-opacity duration-500 ease-out",
                    "max-lg:w-full max-lg:transition-[margin,opacity]",
                    bioPanelWidth,
                    "lg:absolute lg:left-[calc(100%+1.25rem)] lg:top-0 lg:z-10",
                    open
                      ? "max-lg:mt-4 max-lg:opacity-100 lg:opacity-100"
                      : "max-lg:max-h-0 max-lg:opacity-0 max-lg:mt-0 lg:pointer-events-none lg:opacity-0",
                  )}
                >
                  <p className="text-sm font-normal leading-relaxed text-custom-black/65 lg:pr-1">
                    {member.hoverBio}
                  </p>
                </div>
              ) : null}
            </div>

            <div
              className="flex flex-col gap-1"
              onMouseEnter={() => hasBio && setActiveIndex(i)}
            >
              <p
                className={joinClasses(
                  "text-[15px] font-semibold leading-snug text-custom-black sm:text-base",
                  hasBio && "cursor-default",
                )}
              >
                {member.name}
              </p>
              <p className="text-sm font-normal leading-snug text-custom-black/70">
                {member.title}
              </p>
            </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
