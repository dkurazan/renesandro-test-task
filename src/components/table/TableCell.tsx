type TableCellProps = {
  content: React.ReactNode;
  className?: string;
};

export default function TableCell({ content, className }: TableCellProps) {
  return (
    <div>
      <span className={className}>{content}</span>
    </div>
  );
}
