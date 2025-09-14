export function PassageView({ text }: { text: string }) {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-2">Read this aloud</h2>
      <p className="text-lg leading-8">{text}</p>
    </section>
  );
}
