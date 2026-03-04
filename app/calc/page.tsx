export default function CalcPage() {
  return (
    <main style={{ width: "100%", height: "calc(100vh - 90px)", minHeight: "680px" }}>
      <iframe
        src="/calc-legacy/index.html"
        title="ダメージ計算ツール"
        style={{ width: "100%", height: "100%", border: "none", display: "block" }}
      />
    </main>
  );
}
