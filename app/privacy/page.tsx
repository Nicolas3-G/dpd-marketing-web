import Link from "next/link";

import { createPageMetadata } from "@/lib/metadata";

const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

export const metadata = createPageMetadata("Privacy Policy", {
  description:
    "Read the DPD Framework privacy policy — how we collect, use, and protect your data in our mobile app.",
});

export default function PrivacyPage() {
  return (
    <main className="flex-1 bg-background pb-20 pt-28 sm:pb-24 sm:pt-32 lg:pb-28 lg:pt-36">
      <section className={pageInset}>
        <div className="mx-auto max-w-4xl">
          <h1 className="custom-lg-title text-custom-black">
            Privacy Policy for the DPD Framework Mobile App
          </h1>
          <p className="mt-4 custom-label-bold uppercase tracking-[0.08em] text-light">
            Effective Date: 01-January-2025
          </p>

          <div className="mt-10 space-y-8 custom-body leading-relaxed text-custom-black">
            <p>
              Kemit Group, LLC (doing business as &ldquo;DPD Framework&rdquo;)
              values your privacy. This Privacy Policy explains how the DPD
              Framework mobile application (&ldquo;the App&rdquo;) collects,
              uses, and protects any information provided by you. By using the
              App, you agree to the terms of this Privacy Policy.
            </p>

            <section>
              <h2 className="custom-xs-title-bold text-custom-black">
                1. Request for Information and Data Removal
              </h2>
              <p className="mt-3">
                You may request deletion of your data at any time by contacting{" "}
                <a
                  href="mailto:Privacy@DPDFramework.com"
                  className="underline underline-offset-2"
                >
                  Privacy@DPDFramework.com
                </a>
                .
              </p>
              <p className="mt-3">
                By default, all user data is stored locally on your device. We
                do not collect or store any personally identifiable information
                (PII) unless you voluntarily provide it in future versions (for
                example, to sync progress across devices or for account
                recovery).
              </p>
            </section>

            <section>
              <h2 className="custom-xs-title-bold text-custom-black">
                2. Age Restrictions
              </h2>
              <p className="mt-3">
                This service is not intended for children under 13.
              </p>
            </section>

            <section>
              <h2 className="custom-xs-title-bold text-custom-black">
                3. Information We Collect
              </h2>
              <p className="mt-3">
                We collect only the minimum amount of information necessary to
                provide core features of the DPD Framework app, such as
                generating your personalized persona profile and saving your
                progress.
              </p>
              <p className="mt-3">We may collect the following types of data:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  Assessment responses: used to calculate your Dreamer, Planner,
                  and Doer persona posture.
                </li>
                <li>
                  Device data: such as device type and operating system version
                  (for app performance and compatibility).
                </li>
                <li>
                  App usage preferences or settings: such as theme or
                  notification settings (if implemented).
                </li>
                <li>
                  User-created notes or inputs: optional fields you may fill in
                  during use.
                </li>
              </ul>
              <p className="mt-4 custom-body-bold text-custom-black">
                How We Use Your Information
              </p>
              <p className="mt-2">The data you provide is used only to:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Generate your personalized DPD Persona Readout.</li>
                <li>Save and retrieve your progress within the app.</li>
                <li>Improve the app&rsquo;s usability and performance.</li>
              </ul>
              <p className="mt-3">
                We do not sell, rent, or share your data with advertisers or
                any third parties for marketing or commercial purposes.
              </p>
            </section>

            <section>
              <h2 className="custom-xs-title-bold text-custom-black">
                4. Data Storage and Retention
              </h2>
              <p className="mt-3">
                By default, all user data is stored locally on your device. If
                you choose to enable future features such as account login or
                cloud sync, some data may be securely stored on our servers to
                ensure continuity across devices.
              </p>
              <p className="mt-3">
                We retain your data only for as long as necessary to provide
                the services described.
              </p>
            </section>

            <section>
              <h2 className="custom-xs-title-bold text-custom-black">
                5. No Tracking or Advertising
              </h2>
              <p className="mt-3">The DPD Framework app:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Does not track you across third-party apps or websites.</li>
                <li>Does not use third-party advertising or analytics SDKs.</li>
                <li>Does not share your data with third-party data brokers.</li>
              </ul>
            </section>

            <section>
              <h2 className="custom-xs-title-bold text-custom-black">
                6. User Control and Data Deletion
              </h2>
              <p className="mt-3">You have full control over your data:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  You may delete your persona profile and data directly within
                  the app (where available).
                </li>
                <li>
                  You may contact us at any time to request deletion of any
                  associated data.
                </li>
              </ul>
              <p className="mt-3">
                To request deletion, email:{" "}
                <a
                  href="mailto:Privacy@DPDFramework.com"
                  className="underline underline-offset-2"
                >
                  Privacy@DPDFramework.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="custom-xs-title-bold text-custom-black">
                7. Children&apos;s Privacy
              </h2>
              <p className="mt-3">
                The App is not intended for children under the age of 13. We do
                not knowingly collect data from children. If you are a parent
                or guardian and believe your child has provided us data, please
                contact{" "}
                <a
                  href="mailto:Privacy@DPDFramework.com"
                  className="underline underline-offset-2"
                >
                  Privacy@DPDFramework.com
                </a>{" "}
                for removal.
              </p>
            </section>

            <section>
              <h2 className="custom-xs-title-bold text-custom-black">
                8. Changes to This Policy
              </h2>
              <p className="mt-3">
                We may occasionally update this Privacy Policy. If changes are
                made, we will update the effective date and notify users via
                the app or our website.
              </p>
              <p className="mt-3">
                We encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="custom-xs-title-bold text-custom-black">
                9. Contact Us
              </h2>
              <p className="mt-3">
                If you have any questions or concerns about this Privacy Policy
                or your data, please contact us at:
              </p>
              <div className="mt-3 space-y-1">
                <p className="custom-body-bold text-custom-black">DPD Framework</p>
                <p>
                  <a
                    href="mailto:Privacy@DPDFramework.com"
                    className="underline underline-offset-2"
                  >
                    Privacy@DPDFramework.com
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:Support@DPDFramework.com"
                    className="underline underline-offset-2"
                  >
                    Support@DPDFramework.com
                  </a>
                </p>
              </div>
            </section>

            <p className="pt-2 custom-label text-custom-black">
              Looking for support resources? Visit{" "}
              <Link href="/support" className="underline underline-offset-2">
                App Support
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
