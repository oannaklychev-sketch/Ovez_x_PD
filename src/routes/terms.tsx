import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms of Use · Ovez" }] }),
  component: Terms,
});

function Terms() {
  return (
    <main className="bg-background text-foreground min-h-screen px-6 md:px-16 py-24 max-w-3xl mx-auto">
      <Link to="/" className="text-brand text-xs tracking-[0.3em] uppercase border-b border-brand">← Back</Link>
      <h1 className="font-display text-4xl md:text-6xl mt-8 mb-8">Terms of Use</h1>
      <p className="text-muted-foreground text-sm mb-6">Last updated: 12 May 2026</p>
      <div className="space-y-6 text-sm md:text-base leading-relaxed text-foreground/90">
        <h2 className="font-display text-xl">1. About</h2>
        <p>This Site is a personal portfolio of Ovez Annaklychev presenting professional experience in tech support. It is provided "as is" without warranties of any kind.</p>
        <h2 className="font-display text-xl mt-8">2. Intellectual Property</h2>
        <p>All text, graphics, layout and source code are © 2026 Ovez Annaklychev. The background music track was provided by the site owner and is used with permission. You may not copy or redistribute the content without prior written consent.</p>
        <h2 className="font-display text-xl mt-8">3. Acceptable Use</h2>
        <p>You agree not to attempt to disrupt the Site, perform unauthorized scans, or abuse the contact channels.</p>
        <h2 className="font-display text-xl mt-8">4. Liability</h2>
        <p>The owner shall not be liable for any indirect or consequential damages arising from the use of the Site.</p>
        <h2 className="font-display text-xl mt-8">5. Contact</h2>
        <p><a className="text-brand underline" href="mailto:o.annaklychev@finvk.com">o.annaklychev@finvk.com</a></p>
      </div>
    </main>
  );
}
