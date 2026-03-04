import Link from "next/link";

export default function HomePage() {
  return (
    <section style={{ maxWidth: "960px", margin: "0 auto", padding: "24px 16px", color: "#111111" }}>
      <h1 style={{ margin: "0 0 14px", fontSize: "34px", fontWeight: 800 }}>MSオプティマイズ</h1>

      <p style={{ margin: "0 0 20px", color: "#374151", lineHeight: 1.6 }}>
        MSオプティマイズは、ゲーム「モンスターストライク」のプレイをより充実させるために運営しているサイトです。
        <br />
        ゲームプレイを最適化（optimize）するための補助ツールを公開しています。
      </p>

      <Link
        href="/tier"
        style={{
          display: "inline-block",
          border: "1px solid #1d4ed8",
          background: "#3b82f6",
          color: "#ffffff",
          borderRadius: "10px",
          padding: "10px 14px",
          fontWeight: 700,
          textDecoration: "none",
        }}
      >
        Tierメーカーへ
      </Link>
    </section>
  );
}
