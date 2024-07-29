type TableCellProps = {
  content: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export default function TableCell({
  content,
  className,
  onClick,
}: TableCellProps) {
  return (
    <div onClick={onClick}>
      <span className={className}>{content}</span>
    </div>
  );
}
