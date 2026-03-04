"use client";

import React from "react";
import type { CharacterForUI } from "@/app/tier/types";
import DraggableIcon from "./DraggableIcon";

import { useDroppable } from "@dnd-kit/core";

type Props = {
  itemIds: string[];
  charactersById: Map<string, CharacterForUI>;
  groupByElement?: boolean;
};

export default function PoolRow({ itemIds, charactersById, groupByElement = false }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: "pool" });
  const renderItems: React.ReactNode[] = [];
  let prevElement: CharacterForUI["element"] | null = null;

  for (const id of itemIds) {
    const c = charactersById.get(id);
    if (!c) continue;

    if (groupByElement && prevElement !== null && c.element !== prevElement) {
      renderItems.push(<div key={`break-${id}`} className="elementBreak" aria-hidden="true" />);
    }

    renderItems.push(<DraggableIcon key={id} id={id} character={c} />);
    prevElement = c.element;
  }

  return (
    <div ref={setNodeRef} className="poolRow" data-over={isOver ? "1" : "0"}>
      <div className="poolItems">
        {renderItems}
      </div>

      <style jsx>{`
        .poolRow {
          padding: 6px 12px 12px;
          border: 1px dashed var(--border);
          border-radius: var(--radius);
          background: rgba(255, 255, 255, 0.03);
        }

        .poolRow[data-over="1"] {
          background: rgba(255, 255, 255, 0.07);
        }

        .poolItems {
          display: flex;
          flex-wrap: wrap;
          gap: 0;
          min-height: 72px;
        }

        .elementBreak {
          flex-basis: 100%;
          width: 100%;
          height: 0;
        }
      `}</style>
    </div>
  );
}
