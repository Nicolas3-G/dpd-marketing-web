import { createPageMetadata } from "@/lib/metadata";

import { TestHero } from "./test-hero";

export const metadata = createPageMetadata("Test");

export default function TestPage() {
  return (
    <main className="flex-1 overflow-x-clip bg-background">
      <TestHero />
      <section className="min-h-[100vh] px-6 py-16 sm:px-10">
        <p className="text-custom-black">test</p>
      </section>
    </main>
  );
}
