import { MagicCard, MAGIC_CARD_DARK_PROPS, MAGIC_CARD_OVERLAY_CLASS } from "@/components/ui/magic-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { useTheme } from "@/hooks/useTheme";
import { timeline } from "@/data/resume";
import { useState, useEffect } from "react";
import { SECTION_CARD_BASE } from "@/lib/constants";

/** True when viewport < 1024px: line left, all branches and cards on the right. */
function useIsCompact() {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setCompact(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return compact;
}

type TimelineItem = (typeof timeline)[number];

const CARD_CLASS = `${SECTION_CARD_BASE} p-4 sm:p-5`;

/**
 * Diagram branch cards: which branch shows a card and with which timeline item.
 * Uses the same timeline entries as the timeline below so card content is identical.
 * gapIndex: 0 = between circles 1–2, 1 = between 2–3, … (top to bottom).
 * Work → right (blue); Education → left (purple).
 */
/* Order top→bottom: 1.Software Eng(R) 2.Full-stack(L) 3.Certificate(L) 4.Research Assoc(R) 5.Lecturer(R) 6.PhD(L). Diagram branches R,L,L,R,R,L. */
const DIAGRAM_CARDS: Array<{ side: "left" | "right"; gapIndex: number; item: TimelineItem }> = [
  { side: "right", gapIndex: 0, item: timeline[5] }, /* 1. Software Engineer */
  { side: "left", gapIndex: 1, item: timeline[4] }, /* 2. Full-Stack Developer Internship */
  { side: "left", gapIndex: 2, item: timeline[3] }, /* 3. Certificate III & IV in Fitness */
  { side: "right", gapIndex: 3, item: timeline[2] }, /* 4. Research Associate – Aerospace Engineering */
  { side: "right", gapIndex: 4, item: timeline[1] }, /* 5. Lecturer (Full-Time, Fixed-Term) */
  { side: "left", gapIndex: 5, item: timeline[0] }, /* 6. PhD - Aerospace Engineering */
];

function TimelineCardBody({ item }: { item: TimelineItem }) {
  const isWork = item.type === "work";
  return (
    <>
      <div className="flex flex-wrap items-baseline gap-2">
        <span
          className={`text-xs font-medium uppercase tracking-wider ${
            isWork ? "text-blue-600 dark:text-blue-400" : "text-violet-600 dark:text-violet-400"
          }`}
        >
          {isWork ? "Work" : "Education"}
        </span>
        <span className="text-xs text-zinc-500">{item.period}</span>
      </div>
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mt-1">{item.title}</h3>
      <p className="text-sm text-zinc-500 mt-0.5">{item.org}</p>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">{item.description}</p>
    </>
  );
}

function TimelineCard({ item, isDark }: { item: TimelineItem; isDark: boolean }) {
  const body = <TimelineCardBody item={item} />;
  if (isDark) {
    return (
      <MagicCard {...MAGIC_CARD_DARK_PROPS}>
        <div className={MAGIC_CARD_OVERLAY_CLASS} aria-hidden />
        <div className="relative z-10 p-4 sm:p-5">{body}</div>
      </MagicCard>
    );
  }
  return <div className={CARD_CLASS}>{body}</div>;
}

/* ---- Diagram layout constants (shared by BranchDiagram and branch components) ---- */
const DIAGRAM = {
  cx: 180, /* center line; viewBox is tight around branch circles */
  cornerR: 38, /* larger radius = rounder, less sharp curves */
  branchRadius: 88,
  mainStroke: "#3f3f46", /* zinc-700 */
  curveStroke: "#3f3f46", /* zinc-700, same as mainStroke so overlaps are invisible */
  mainNodeFill: "#93c5fd", /* blue-300 */
  nodeStroke: "#3f3f46", /* zinc-700 */
  nodeR: 22, /* larger branch/main circles */
} as const;

type BranchPart = "paths" | "circle";

/** Reusable right branch: connects main line (nodeBelow → branch → nodeAbove) with two rounded paths. */
type RightBranchProps = {
  nodeBelowY: number;
  nodeAboveY: number;
  branchY: number;
  label: string;
  circleFill: string;
  part: BranchPart;
  hideLabel?: boolean;
};
function RightBranch({ nodeBelowY, nodeAboveY, branchY, label, circleFill, part, hideLabel }: RightBranchProps) {
  const { cx, cornerR, branchRadius, curveStroke, nodeStroke } = DIAGRAM;
  const branchX = cx + branchRadius;
  const cornerY = (nodeBelowY + branchY) / 2;
  const mirror = (y: number) => 2 * branchY - y;
  const cornerYMirror = mirror(cornerY);

  if (part === "paths") {
    return (
      <>
        <path
          d={`M ${cx} ${nodeBelowY} L ${cx} ${cornerY + cornerR} Q ${cx} ${cornerY} ${cx + cornerR} ${cornerY} L ${branchX - cornerR} ${cornerY} Q ${branchX} ${cornerY} ${branchX} ${cornerY - cornerR} L ${branchX} ${branchY}`}
          stroke={curveStroke}
          strokeWidth="5"
          fill="none"
        />
        <path
          d={`M ${branchX} ${branchY} L ${branchX} ${mirror(cornerY - cornerR)} Q ${branchX} ${cornerYMirror} ${branchX - cornerR} ${cornerYMirror} L ${cx + cornerR} ${cornerYMirror} Q ${cx} ${cornerYMirror} ${cx} ${mirror(cornerY + cornerR)} L ${cx} ${nodeAboveY}`}
          stroke={curveStroke}
          strokeWidth="5"
          fill="none"
        />
      </>
    );
  }

  return (
    <>
      <circle cx={branchX} cy={branchY} r={DIAGRAM.nodeR} fill={circleFill} stroke={nodeStroke} strokeWidth="5" />
      {!hideLabel && (
        <text x={branchX + 22} y={branchY} dominantBaseline="middle" className="fill-current text-sm font-medium" style={{ fontFamily: "inherit" }}>{label}</text>
      )}
    </>
  );
}

/** Reusable left branch: connects main line (nodeBelow → branch → nodeAbove) with two rounded paths. */
type LeftBranchProps = {
  nodeBelowY: number;
  nodeAboveY: number;
  branchY: number;
  label: string;
  circleFill: string;
  part: BranchPart;
  hideLabel?: boolean;
};
function LeftBranch({ nodeBelowY, nodeAboveY, branchY, label, circleFill, part, hideLabel }: LeftBranchProps) {
  const { cx, cornerR, branchRadius, curveStroke, nodeStroke } = DIAGRAM;
  const branchX = cx - branchRadius;
  const cornerYToBranch = (nodeBelowY + branchY) / 2;
  const cornerYToAbove = (branchY + nodeAboveY) / 2;

  if (part === "paths") {
    return (
      <>
        <path
          d={`M ${cx} ${nodeBelowY} L ${cx} ${cornerYToBranch + cornerR} Q ${cx} ${cornerYToBranch} ${cx - cornerR} ${cornerYToBranch} L ${branchX + cornerR} ${cornerYToBranch} Q ${branchX} ${cornerYToBranch} ${branchX} ${cornerYToBranch - cornerR} L ${branchX} ${branchY}`}
          stroke={curveStroke}
          strokeWidth="5"
          fill="none"
        />
        <path
          d={`M ${branchX} ${branchY} L ${branchX} ${cornerYToAbove + cornerR} Q ${branchX} ${cornerYToAbove} ${branchX + cornerR} ${cornerYToAbove} L ${cx - cornerR} ${cornerYToAbove} Q ${cx} ${cornerYToAbove} ${cx} ${cornerYToAbove - cornerR} L ${cx} ${nodeAboveY}`}
          stroke={curveStroke}
          strokeWidth="5"
          fill="none"
        />
      </>
    );
  }
  return (
    <>
      <circle cx={branchX} cy={branchY} r={DIAGRAM.nodeR} fill={circleFill} stroke={nodeStroke} strokeWidth="5" />
      {!hideLabel && (
        <text x={branchX - 22} y={branchY} textAnchor="end" dominantBaseline="middle" className="fill-current text-sm font-medium" style={{ fontFamily: "inherit" }}>{label}</text>
      )}
    </>
  );
}

/** Sequence of branches from top to bottom: left, right, right, left, left, right. */
const BRANCH_SEQUENCE: Array<"left" | "right"> = ["left", "right", "right", "left", "left", "right"];

const RIGHT_FILL = "#3b82f0"; /* blue-500 (work) */
const LEFT_FILL = "#8b5cf6"; /* violet-500 (education) */

/** Vertical line and viewBox: large gaps so cards fit between branches and columns get height. */
const MAIN_LINE_TOP = 24;
const GAP_SIZE = 320;
const GAPS_COUNT = 6;
const MAIN_LINE_BOTTOM = MAIN_LINE_TOP + GAPS_COUNT * GAP_SIZE;
/** Min height for compact layout so card % positioning matches diagram (6 rows × ~220px). */
const COMPACT_MIN_HEIGHT_PX = 1320;

/** Git-branch style diagram: main vertical line, nodes, and reusable right/left branches. */
function BranchDiagram() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isCompact = useIsCompact();
  const { cx, mainStroke, mainNodeFill, nodeStroke } = DIAGRAM;
  const mainNodes = [
    MAIN_LINE_TOP,
    MAIN_LINE_TOP + GAP_SIZE,
    MAIN_LINE_TOP + 2 * GAP_SIZE,
    MAIN_LINE_TOP + 3 * GAP_SIZE,
    MAIN_LINE_TOP + 4 * GAP_SIZE,
    MAIN_LINE_TOP + 5 * GAP_SIZE,
    MAIN_LINE_BOTTOM,
  ]; /* 7 nodes, top to bottom */

  const gapsCount = mainNodes.length - 1;
  const branches = mainNodes.slice(0, -1).map((nodeAboveY, i) => {
    const nodeBelowY = mainNodes[i + 1];
    const branchY = (nodeAboveY + nodeBelowY) / 2;
    const side = BRANCH_SEQUENCE[gapsCount - 1 - i];
    const label = `${side === "right" ? "Right" : "Left"} ${i + 1}`;
    const circleFill = side === "right" ? RIGHT_FILL : LEFT_FILL;
    const cardConfig = DIAGRAM_CARDS.find((c) => c.gapIndex === i && c.side === side);
    return {
      nodeAboveY,
      nodeBelowY,
      branchY,
      side,
      label,
      circleFill,
      hideLabel: !!cardConfig,
      cardItem: cardConfig?.item,
    };
  });

  /* Per-gap card slots: leftCol[i] / rightCol[i] = card to show in row i. Cards in flow so all 6 are visible. */
  const leftColByGap: (TimelineItem | null)[] = Array(GAPS_COUNT).fill(null);
  const rightColByGap: (TimelineItem | null)[] = Array(GAPS_COUNT).fill(null);
  DIAGRAM_CARDS.forEach(({ side, gapIndex, item }) => {
    if (side === "left") leftColByGap[gapIndex] = item;
    else rightColByGap[gapIndex] = item;
  });

  /* ViewBox padding: horizontal so circles aren’t cut off; vertical ~1rem from circle edge */
  const diagramPadding = 10;
  const diagramMinX = DIAGRAM.cx - DIAGRAM.branchRadius - DIAGRAM.nodeR - diagramPadding;
  const diagramWidth = 2 * (DIAGRAM.branchRadius + DIAGRAM.nodeR) + 2 * diagramPadding;
  const verticalPadding = 16; /* ~1rem from top/bottom circle edge */
  const topCircleEdge = mainNodes[0] - DIAGRAM.nodeR;
  const bottomCircleEdge = mainNodes[mainNodes.length - 1] + DIAGRAM.nodeR;
  const viewBoxMinY = topCircleEdge - verticalPadding;
  const viewBoxHeight = bottomCircleEdge + verticalPadding - viewBoxMinY;
  const viewBox = `${diagramMinX} ${viewBoxMinY} ${diagramWidth} ${viewBoxHeight}`;

  /* Card vertical position as % of column height so it aligns with branch circle in SVG */
  const branchTopPercent = (branchY: number) => ((branchY - viewBoxMinY) / viewBoxHeight) * 100;

  /* Shared SVG content: paths first, then circles so circles always appear on top */
  const mainLine = (
    <line x1={cx} y1={mainNodes[0]} x2={cx} y2={mainNodes[mainNodes.length - 1]} stroke={mainStroke} strokeWidth="5" />
  );
  const mainNodeCircles = mainNodes.map((y, i) => (
    <g key={i}>
      <circle cx={cx} cy={y} r={DIAGRAM.nodeR} fill={mainNodeFill} stroke={nodeStroke} strokeWidth="5" />
    </g>
  ));

  /* Compact (< 1024px): line left, all branches and cards on the right; viewBox includes full main circles */
  if (isCompact) {
    const compactViewBoxMinX = cx - DIAGRAM.nodeR - diagramPadding;
    const compactViewBoxWidth = DIAGRAM.branchRadius + 2 * DIAGRAM.nodeR + 2 * diagramPadding;
    const viewBoxCompact = `${compactViewBoxMinX} ${viewBoxMinY} ${compactViewBoxWidth} ${viewBoxHeight}`;
    const cardsInOrder = branches.map((_, i) => leftColByGap[i] ?? rightColByGap[i]) as TimelineItem[];
    const circleFillCompact = (i: number) =>
      (DIAGRAM_CARDS.find((c) => c.gapIndex === i)!.item.type === "work" ? RIGHT_FILL : LEFT_FILL);
    const compactMinH = COMPACT_MIN_HEIGHT_PX;
    return (
      <figure
        className="flex flex-row gap-2 my-10 sm:my-12 px-0 overflow-visible items-stretch"
        style={{ minHeight: compactMinH } as React.CSSProperties}
        aria-hidden
      >
        <div className={`relative w-20 flex-shrink-0 flex justify-start items-stretch z-10`} style={{ minHeight: compactMinH } as React.CSSProperties}>
          <svg
            viewBox={viewBoxCompact}
            className="h-full w-auto text-zinc-800 dark:text-zinc-200 flex-shrink-0"
            style={{ minHeight: compactMinH } as React.CSSProperties}
            fill="none"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            preserveAspectRatio="xMinYMid meet"
          >
            {/* Paths first, then circles so circles are on top */}
            {mainLine}
            {branches.map((b, i) => (
              <RightBranch
                key={`path-${i}`}
                part="paths"
                nodeBelowY={b.nodeBelowY}
                nodeAboveY={b.nodeAboveY}
                branchY={b.branchY}
                label=""
                circleFill={circleFillCompact(i)}
              />
            ))}
            {mainNodeCircles}
            {branches.map((b, i) => (
              <RightBranch
                key={`circle-${i}`}
                part="circle"
                nodeBelowY={b.nodeBelowY}
                nodeAboveY={b.nodeAboveY}
                branchY={b.branchY}
                label=""
                circleFill={circleFillCompact(i)}
                hideLabel
              />
            ))}
          </svg>
        </div>
        <div className="relative flex-1 min-w-0" style={{ minHeight: compactMinH } as React.CSSProperties}>
          {cardsInOrder.map(
            (item, i) =>
              item && (
                <div
                  key={i}
                  className="absolute left-0 right-0 flex justify-start pointer-events-none pl-2"
                  style={{ top: `${branchTopPercent(branches[i].branchY)}%`, transform: "translateY(-50%)" } as React.CSSProperties}
                >
                  <div className="w-full max-w-[calc(100%-1rem)] pointer-events-auto">
                    <TimelineCard item={item} isDark={isDark} />
                  </div>
                </div>
              )
          )}
        </div>
      </figure>
    );
  }

  return (
    <figure
      className="flex flex-col lg:grid my-10 sm:my-12 px-0 overflow-visible gap-4 lg:gap-x-0 lg:gap-y-0"
      style={{
        gridTemplateColumns: "1fr auto 1fr",
        gridTemplateRows: `repeat(${GAPS_COUNT}, minmax(220px, 1fr))`,
      } as React.CSSProperties}
      aria-hidden
    >
      {/* Left column: on lg one cell spanning 6 rows, cards at branch Y; on mobile 6 rows in flow */}
      <div
        className="order-2 relative min-h-0 lg:h-full flex flex-col gap-4 lg:gap-0"
        style={{ gridColumn: 1, gridRow: `1 / span ${GAPS_COUNT}` } as React.CSSProperties}
      >
        {leftColByGap.map((item, i) => (
          <div key={`left-row-${i}`} className="lg:hidden flex items-center justify-end min-h-[220px]">
            {item ? (
              <div className="w-full max-w-[calc(100%-1rem)]">
                <TimelineCard item={item} isDark={isDark} />
              </div>
            ) : null}
          </div>
        ))}
        {leftColByGap.map((item, i) =>
          item ? (
            <div
              key={`left-abs-${i}`}
              className="hidden lg:flex absolute left-0 right-0 justify-end pointer-events-none"
              style={{ top: `${branchTopPercent(branches[i].branchY)}%`, transform: "translateY(-50%)" } as React.CSSProperties}
            >
              <div className="w-full max-w-[calc(100%-1rem)] lg:max-w-none lg:mr-1.5 pointer-events-auto">
                <TimelineCard item={item} isDark={isDark} />
              </div>
            </div>
          ) : null
        )}
      </div>
      {/* Middle: diagram spans all 6 rows; z-10 so SVG draws in front of cards */}
      <div
        className="order-1 flex justify-center min-h-0 h-full relative z-10"
        style={{ gridColumn: 2, gridRow: `1 / span ${GAPS_COUNT}` } as React.CSSProperties}
      >
        <svg
          viewBox={viewBox}
          className="h-full w-auto max-w-[320px] text-zinc-800 dark:text-zinc-200"
          fill="none"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Paths first, then circles so circles are on top */}
          {mainLine}
          {branches.map((b) =>
            b.side === "right" ? (
              <RightBranch
                key={b.label}
                part="paths"
                nodeBelowY={b.nodeBelowY}
                nodeAboveY={b.nodeAboveY}
                branchY={b.branchY}
                label={b.label}
                circleFill={b.circleFill}
              />
            ) : (
              <LeftBranch key={b.label} part="paths" nodeBelowY={b.nodeBelowY} nodeAboveY={b.nodeAboveY} branchY={b.branchY} label={b.label} circleFill={b.circleFill} />
            )
          )}
          {mainNodeCircles}
          {branches.map((b) =>
            b.side === "right" ? (
              <RightBranch
                key={b.label}
                part="circle"
                nodeBelowY={b.nodeBelowY}
                nodeAboveY={b.nodeAboveY}
                branchY={b.branchY}
                label={b.label}
                circleFill={b.circleFill}
                hideLabel={b.hideLabel}
              />
            ) : (
              <LeftBranch key={b.label} part="circle" nodeBelowY={b.nodeBelowY} nodeAboveY={b.nodeAboveY} branchY={b.branchY} label={b.label} circleFill={b.circleFill} hideLabel={b.hideLabel} />
            )
          )}
        </svg>
      </div>
      {/* Right column: on lg one cell spanning 6 rows, cards at branch Y; on mobile 6 rows in flow */}
      <div
        className="order-3 relative min-h-0 lg:h-full flex flex-col gap-4 lg:gap-0"
        style={{ gridColumn: 3, gridRow: `1 / span ${GAPS_COUNT}` } as React.CSSProperties}
      >
        {rightColByGap.map((item, i) => (
          <div key={`right-row-${i}`} className="lg:hidden flex items-center justify-start min-h-[220px]">
            {item ? (
              <div className="w-full max-w-[calc(100%-1rem)]">
                <TimelineCard item={item} isDark={isDark} />
              </div>
            ) : null}
          </div>
        ))}
        {rightColByGap.map((item, i) =>
          item ? (
            <div
              key={`right-abs-${i}`}
              className="hidden lg:flex absolute left-0 right-0 justify-start pointer-events-none"
              style={{ top: `${branchTopPercent(branches[i].branchY)}%`, transform: "translateY(-50%)" } as React.CSSProperties}
            >
              <div className="w-full max-w-[calc(100%-1rem)] lg:max-w-none lg:ml-1.5 pointer-events-auto">
                <TimelineCard item={item} isDark={isDark} />
              </div>
            </div>
          ) : null
        )}
      </div>
    </figure>
  );
}

export function Journey() {
  return (
    <section id="journey" className="section-pad">
      <div className="container-narrow">
        <SectionHeading className="mb-12">Journey</SectionHeading>

        <BranchDiagram />
      </div>
    </section>
  );
}
