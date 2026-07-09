import type { Metadata } from "next";

import { isInternalDocUnlocked } from "./actions";
import { TypographyGuideContent } from "./typography-guide-content";
import { UnlockForm } from "./unlock-form";

export const metadata: Metadata = {
  title: "Typography Guide",
  robots: { index: false, follow: false },
};

export default async function TypographyGuidePage() {
  const unlocked = await isInternalDocUnlocked();

  return (
    <main className="flex-1 bg-background pt-24 sm:pt-28 lg:pt-36">
      {unlocked ? <TypographyGuideContent /> : <UnlockForm />}
    </main>
  );
}
