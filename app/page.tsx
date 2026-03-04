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
          border: "1px solid #1f2937",
          background: "#f3f4f6",
          color: "#111827",
          borderRadius: "10px",
          padding: "10px 14px",
          fontWeight: 700,
          textDecoration: "none",
        }}
      >
        Tierメーカーへ
      </Link>

      <div style={{ marginTop: "10px" }}>
        <Link
          href="/calc"
          style={{
            display: "inline-block",
            border: "1px solid #1f2937",
            background: "#f3f4f6",
            color: "#111827",
            borderRadius: "10px",
            padding: "10px 14px",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          ダメージ計算ツールへ
        </Link>
      </div>
    </section>
  );
}
