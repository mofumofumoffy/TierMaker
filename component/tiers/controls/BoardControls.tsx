"use client";

import React from "react";
import ExportButton from "./ExportButton";

type Props = {
  onReset: () => void;
  exportTargetRef: React.RefObject<HTMLDivElement | null>;
};

export default function BoardControls({ onReset, exportTargetRef }: Props) {
  return (
    <div className="controlsRow">
      <div className="left">
        <div className="brandText">モンストTierMaker</div>
      </div>

      <div className="right">
        <button className="btn" type="button" onClick={onReset}>
          リセット
        </button>
        <ExportButton targetRef={exportTargetRef} />
      </div>

      <style jsx>{`
        .controlsRow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }

        .left,
        .right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .brandText {
          font-size: 18px;
          font-weight: 800;
          color: #111111;
          letter-spacing: 0.2px;
        }

        .btn {
          border: 1px solid #1f2937;
          background: #f3f4f6;
          color: #111827;
          padding: 10px 12px;
          border-radius: 14px;
          cursor: pointer;
          font-weight: 700;
        }

        .btn:hover {
          background: #e5e7eb;
        }
      `}</style>
    </div>
  );
}
