function BulletMarker() {
  return (
    <span
      className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange mx-2 sm:mt-[11px]"
      aria-hidden
    />
  );
}

export function UnlockBullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 flex max-w-[26rem] flex-col items-start gap-2 text-left">
      {items.map((item) => (
        <li key={item} className="flex items-start custom-body text-white">
          <BulletMarker />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
