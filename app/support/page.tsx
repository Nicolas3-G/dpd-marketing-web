import Link from "next/link";

import { createPageMetadata } from "@/lib/metadata";

const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

export const metadata = createPageMetadata("App Support");

export default function SupportPage() {
  return (
    <main className="flex-1 bg-background pb-20 pt-28 sm:pb-24 sm:pt-32 lg:pb-28 lg:pt-36">
      <section className={pageInset}>
        <div className="mx-auto max-w-4xl">
          <p className="custom-label-bold uppercase tracking-[0.08em] text-light">
            What is The DPD Framework?
          </p>
          <h1 className="mt-3 custom-lg-title text-custom-black">
            DPD Framework App Support
          </h1>
          <p className="mt-4 custom-body text-custom-black">
            Welcome to the official support page for the DPD Framework Mobile
            App.
          </p>

          <section className="mt-10 border border-custom-black/10 bg-white p-6 sm:p-8">
            <h2 className="custom-xs-title-bold text-custom-black">
              Need Help?
            </h2>
            <p className="mt-3 custom-body text-custom-black">
              Email us anytime:{" "}
              <a
                href="mailto:support@dpdframework.com"
                className="underline underline-offset-2"
              >
                support@dpdframework.com
              </a>
            </p>
          </section>

          <section className="mt-10">
            <h2 className="custom-xs-title-bold text-custom-black">
              Frequently Asked Questions
            </h2>

            <div className="mt-6 space-y-8 custom-body text-custom-black">
              <article>
                <h3 className="custom-body-bold text-custom-black">
                  Q: What is the DPD Framework App?
                </h3>
                <p className="mt-2">
                  A: The DPD Framework helps individuals switch between
                  Dreamer, Planner, and Doer personas to improve collaboration,
                  communication, and personal productivity.
                </p>
              </article>

              <article>
                <h3 className="custom-body-bold text-custom-black">
                  Q: Do I need to create an account to use the app?
                </h3>
                <p className="mt-2">
                  A: No account is necessary to complete the Quick
                  Self-Assessment and receive your basic persona readout.
                </p>
                <p className="mt-2">
                  However, to unlock the full features of the app, including
                  progress tracking, advanced persona reports, and cloud sync,
                  you will need to create an account.
                </p>
              </article>

              <article>
                <h3 className="custom-body-bold text-custom-black">
                  Q: Can I delete my data?
                </h3>
                <p className="mt-2">
                  A: Yes. You can delete your assessment results from within
                  the app. For data removal requests (including any cloud-based
                  information), contact us at{" "}
                  <a
                    href="mailto:support@dpdframework.com"
                    className="underline underline-offset-2"
                  >
                    support@dpdframework.com
                  </a>
                  .
                </p>
              </article>
            </div>
          </section>

          <section className="mt-10 border border-custom-black/10 bg-white p-6 sm:p-8">
            <h2 className="custom-xs-title-bold text-custom-black">
              Privacy &amp; Security
            </h2>
            <p className="mt-3 custom-body text-custom-black">
              We do not sell or share your data. For full details, please
              review our{" "}
              <Link href="/privacy" className="underline underline-offset-2">
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          <section className="mt-10 border border-custom-black/10 bg-white p-6 sm:p-8">
            <h2 className="custom-xs-title-bold text-custom-black">
              Latest Version
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 custom-body text-custom-black">
              <li>Current App Version: 1.0.61</li>
              <li>Last Updated: March 27, 2026</li>
              <li>Compatible with iOS 15 and above</li>
            </ul>
          </section>
        </div>
      </section>
    </main>
  );
}
