type LayerListProps = {
  items: string[];
  className: string;
};

export default function LayerList({ items, className }: LayerListProps) {
  return (
    <div>
      <ul className={className}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
