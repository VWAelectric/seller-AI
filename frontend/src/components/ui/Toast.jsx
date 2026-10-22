export default function Toast({
  message,
  type = "success",
}) {
  const colors = {
    success: "#16a34a",
    error: "#dc2626",
    warning: "#f59e0b",
  };

  return (
    <div
      style={{
        background: colors[type],
        color: "#fff",

        padding: "12px 16px",

        borderRadius: "10px",

        minWidth: "300px",

        boxShadow:
          "0 4px 12px rgba(0,0,0,.15)",
      }}
    >
      {message}
    </div>
  );
}