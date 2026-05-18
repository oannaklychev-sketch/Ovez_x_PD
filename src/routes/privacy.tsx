import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy · Ovez" }] }),
  component: Privacy,
});

function Privacy() {
  return (
    <main className="bg-background text-foreground min-h-screen px-6 md:px-16 py-24 max-w-3xl mx-auto">
      <Link to="/" className="text-brand text-xs tracking-[0.3em] uppercase border-b border-brand">← Back</Link>
      <h1 className="font-display text-4xl md:text-6xl mt-8 mb-8">Privacy Policy</h1>
      <p className="text-muted-foreground text-sm mb-6">Last updated: 12 May 2026</p>
      <div className="space-y-6 text-sm md:text-base leading-relaxed text-foreground/90">
        <p>This personal portfolio website ("the Site") is operated by Ovez Annaklychev. We respect your privacy and are committed to protecting any personal data you share with us.</p>
        <h2 className="font-display text-xl mt-8">1. Data We Collect</h2>
        <p>The Site does not require registration and does not knowingly collect personal data. Anonymous technical data (browser type, viewport, referrer) may be processed by the hosting provider for security and performance purposes.</p>
        <h2 className="font-display text-xl mt-8">2. Cookies</h2>
        <p>The Site does not set tracking or advertising cookies. Strictly necessary cookies may be used by the hosting infrastructure.</p>
        <h2 className="font-display text-xl mt-8">3. Contact</h2>
        <p>If you contact us via email or messaging links, your message and contact details are processed only to reply to your enquiry. They are not shared with third parties.</p>
        <h2 className="font-display text-xl mt-8">4. Your Rights (GDPR)</h2>
        <p>You may request access, correction or deletion of any personal data we hold about you by writing to <a className="text-brand underline" href="mailto:o.annaklychev@finvk.com">o.annaklychev@finvk.com</a>.</p>
        <h2 className="font-display text-xl mt-8">5. Changes</h2>
        <p>We may update this policy. The current version is always available at this URL.</p>
      </div>
    </main>
  );
}
