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
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const [scrollLeft, setScrollLeft] = React.useState(0);
  const [viewportWidth, setViewportWidth] = React.useState(0);
  const ICON_SIZE = 48;
  const OVERSCAN_PX = ICON_SIZE * 6;
  const renderItems: React.ReactNode[] = [];
  const groupedRows: string[][] = [];

  if (groupByElement) {
    let currentRow: string[] = [];
    let prevElement: CharacterForUI["element"] | null = null;

    for (const id of itemIds) {
      const c = charactersById.get(id);
      if (!c) continue;

      if (prevElement !== null && c.element !== prevElement) {
        if (currentRow.length > 0) groupedRows.push(currentRow);
        currentRow = [];
      }

      currentRow.push(id);
      prevElement = c.element;
    }

    if (currentRow.length > 0) groupedRows.push(currentRow);
  } else {
    for (const id of itemIds) {
      const c = charactersById.get(id);
      if (!c) continue;
      renderItems.push(<DraggableIcon key={id} id={id} character={c} />);
    }
  }

  React.useEffect(() => {
    if (!groupByElement) return;
    const node = scrollRef.current;
    if (!node) return;

    const updateSize = () => setViewportWidth(node.clientWidth);
    updateSize();

    const ro = new ResizeObserver(() => updateSize());
    ro.observe(node);

    return () => {
      ro.disconnect();
    };
  }, [groupByElement]);

  const onPoolScroll = React.useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollLeft(e.currentTarget.scrollLeft);
  }, []);

  return (
    <div ref={setNodeRef} className="poolRow" data-over={isOver ? "1" : "0"}>
      {groupByElement ? (
        <div ref={scrollRef} className="poolElementRows" onScroll={onPoolScroll}>
          <div className="poolElementRowsInner">
            {groupedRows.map((row, rowIdx) => {
              const startIndex = Math.max(0, Math.floor((scrollLeft - OVERSCAN_PX) / ICON_SIZE));
              const endIndex = Math.min(
                row.length,
                Math.ceil((scrollLeft + viewportWidth + OVERSCAN_PX) / ICON_SIZE)
              );
              const visibleIds = row.slice(startIndex, endIndex);

              return (
                <div key={`row-${rowIdx}`} className="elementRow">
                  <div className="elementItems" style={{ width: row.length * ICON_SIZE }}>
                    {visibleIds.map((id, visibleIndex) => {
                      const absoluteIndex = startIndex + visibleIndex;
                      const c = charactersById.get(id);
                      if (!c) return null;
                      return (
                        <div
                          key={id}
                          className="virtualItem"
                          style={{ left: absoluteIndex * ICON_SIZE }}
                        >
                          <DraggableIcon id={id} character={c} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="poolItems">{renderItems}</div>
      )}

      <style jsx>{`
        .poolRow {
          padding: 6px 12px 12px;
          border: 1px dashed var(--border);
          border-radius: var(--radius);
          background: rgba(255, 255, 255, 0.03);
          width: 100%;
          max-width: 100%;
          min-width: 0;
          overflow-x: hidden;
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

        .poolElementRows {
          display: grid;
          gap: 4px;
          width: 100%;
          max-width: 100%;
          min-width: 0;
          overflow-x: auto;
          overflow-y: hidden;
          -webkit-overflow-scrolling: touch;
        }

        .poolElementRowsInner {
          display: grid;
          gap: 4px;
          width: max-content;
          min-width: 100%;
        }

        .elementRow {
          width: max-content;
        }

        .elementItems {
          position: relative;
          height: 48px;
          min-width: max-content;
        }

        .virtualItem {
          position: absolute;
          top: 0;
        }
      `}</style>
    </div>
  );
}
