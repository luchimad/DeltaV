export default function Spinner({
  className = "",
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`${dark ? "spinner-dark" : "spinner"} ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}
