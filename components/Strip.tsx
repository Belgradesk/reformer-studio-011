type StripProps = {
  items: string[];
};

export function Strip({ items }: StripProps) {
  const doubled = [...items, ...items];
  return (
    <div className="strip">
      <div className="strip-inner">
        {doubled.map((text, i) => (
          <span key={`${text}-${i}`}>{text}</span>
        ))}
      </div>
    </div>
  );
}
