export default function Card({
  children,
}) {
  return (
    <div
      style={{
        background:
          "var(--surface)",

        borderRadius:
          "var(--radius)",

        boxShadow:
          "var(--shadow)",

        padding: "20px",
      }}
    >
      {children}
    </div>
  );
}
