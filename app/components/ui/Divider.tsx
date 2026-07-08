export function Divider() {
  return (
    <div className="flex items-center my-0">
      <div
        className="h-px flex-1"
        style={{ background: "linear-gradient(to right, transparent, var(--border-col), transparent)" }}
      />
    </div>
  );
}