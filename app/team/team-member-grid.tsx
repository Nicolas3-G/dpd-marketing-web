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

const bioPanelWidth = "xl:w-56";
const siblingShift = "xl:translate-x-[calc(14rem+1.25rem)]";

export function TeamMemberGrid({
  members,
}: {
  members: readonly TeamMember[];
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="min-w-0 max-w-full">
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
                    "max-xl:overflow-hidden transition-opacity duration-500 ease-out",
                    "max-xl:w-full max-xl:transition-[margin,opacity]",
                    bioPanelWidth,
                    "xl:absolute xl:left-[calc(100%+1.25rem)] xl:top-0 xl:z-10",
                    open
                      ? "max-xl:mt-4 max-xl:opacity-100 xl:opacity-100"
                      : "max-xl:max-h-0 max-xl:opacity-0 max-xl:mt-0 xl:pointer-events-none xl:opacity-0",
                  )}
                >
                  <p className="custom-label leading-relaxed text-custom-black lg:pr-1">
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
                  "custom-body-bold  leading-snug text-red",
                  hasBio && "cursor-default",
                )}
              >
                {member.name}
              </p>
              <p className="custom-label leading-snug text-custom-black">
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
