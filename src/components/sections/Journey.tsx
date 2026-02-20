import { MagicCard, MAGIC_CARD_DARK_PROPS, MAGIC_CARD_OVERLAY_CLASS } from "@/components/ui/magic-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { useTheme } from "@/hooks/useTheme";
import { useLocale } from "@/hooks/useLocale";
import React, { useState, useEffect } from "react";
import { SECTION_CARD_BASE } from "@/lib/constants";

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return matches;
}

const MQ_COMPACT = "(max-width: 1023px)";   /* line left, branches + cards right */
const MQ_NARROW = "(max-width: 639px)";       /* flow-based layout, dynamic card heights */

type TimelineItem = {
  type: "work" | "education";
  title: string;
  org: string;
  period: string;
  description: string;
};

const CARD_CLASS = `${SECTION_CARD_BASE} p-4 sm:p-5`;

/**
 * Diagram branch cards: which branch shows a card and with which timeline item.
 * Uses the same timeline entries as the timeline below so card content is identical.
 * gapIndex: 0 = between circles 1–2, 1 = between 2–3, … (top to bottom).
 * Work → right (blue); Education → left (purple).
 */
function getDiagramCards(timeline: TimelineItem[]): Array<{ side: "left" | "right"; gapIndex: number; item: TimelineItem }> {
  return [
    { side: "right", gapIndex: 0, item: timeline[5] },
    { side: "left", gapIndex: 1, item: timeline[4] },
    { side: "left", gapIndex: 2, item: timeline[3] },
    { side: "right", gapIndex: 3, item: timeline[2] },
    { side: "right", gapIndex: 4, item: timeline[1] },
    { side: "left", gapIndex: 5, item: timeline[0] },
  ];
}

/** Renders description text, turning [label](url) into a real link. */
function DescriptionWithLinks({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  const linkRe = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = linkRe.exec(text)) !== null) {
    if (m.index > lastIndex) {
      parts.push(text.slice(lastIndex, m.index));
    }
    parts.push(
      <a
        key={m.index}
        href={m[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 underline hover:no-underline"
      >
        {m[1]}
      </a>
    );
    lastIndex = linkRe.lastIndex;
  }
  if (parts.length === 0) return <>{text}</>;
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return <>{parts}</>;
}

function TimelineCardBody({ item, workLabel, educationLabel }: { item: TimelineItem; workLabel: string; educationLabel: string }) {
  const isWork = item.type === "work";
  return (
    <>
      <div className="flex flex-wrap items-baseline gap-2">
        <span
          className={`text-xs font-medium uppercase tracking-wider ${
            isWork ? "text-blue-600 dark:text-blue-400" : "text-violet-600 dark:text-violet-400"
          }`}
        >
          {isWork ? workLabel : educationLabel}
        </span>
        <span className="text-xs text-zinc-500">{item.period}</span>
      </div>
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mt-1">{item.title}</h3>
      <p className="text-sm text-zinc-500 mt-0.5">{item.org}</p>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
        <DescriptionWithLinks text={item.description} />
      </p>
    </>
  );
}

function TimelineCard({ item, isDark, workLabel, educationLabel }: { item: TimelineItem; isDark: boolean; workLabel: string; educationLabel: string }) {
  const body = <TimelineCardBody item={item} workLabel={workLabel} educationLabel={educationLabel} />;
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
/** Fixed height for compact SVG layout (640px–1023px) so card % positioning matches diagram. */
const COMPACT_MIN_HEIGHT_PX = 1320;

type JourneyLabels = {
  headLabel: string;
  initialCommitLine1: string;
  initialCommitLine2: string;
  work: string;
  education: string;
};

/** < 640px: flow-based diagram – line + circles, one row per card; spacing follows card height. */
function CompactFlowDiagram({
  cardsInOrder,
  isDark,
  labels,
}: {
  cardsInOrder: TimelineItem[];
  isDark: boolean;
  labels: JourneyLabels;
}) {
  const diagramColWidth = "4rem";
  const lineClass = "absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-zinc-700 dark:bg-zinc-600";
  const circleBaseClass = "absolute left-1/2 top-1/2 w-7 h-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-zinc-700 dark:border-zinc-600";
  const mainNodeCircleClass = "absolute left-1/2 w-7 h-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-zinc-700 dark:border-zinc-600 bg-blue-200 dark:bg-blue-300";
  const labelClass = "text-zinc-800 dark:text-zinc-200 text-base font-semibold text-center";
  const cellCol1 = "col-start-1";
  const cellCol2 = "col-start-2";

  return (
    <figure className="my-10 sm:my-12 px-0 overflow-visible" aria-hidden>
      <div className="grid gap-x-6" style={{ gridTemplateColumns: `${diagramColWidth} 1fr` } as React.CSSProperties}>
        <div className={`relative flex flex-col items-center pt-16 pb-4 min-h-[3rem] ${cellCol1}`}>
          <div className={lineClass} aria-hidden />
          <div className={`${mainNodeCircleClass} top-0`} aria-hidden style={{ zIndex: 1 }} />
          <span className={`${labelClass} absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[calc(100%+1rem)]`} style={{ zIndex: 1 }}>{labels.headLabel}</span>
        </div>
        <div className={cellCol2} />
        {cardsInOrder.map((item, i) => {
          if (!item) return null;
          const circleFillClass = item.type === "work" ? "bg-blue-300 dark:bg-blue-400" : "bg-violet-400 dark:bg-violet-500";
          return (
            <React.Fragment key={i}>
              <div className={`relative flex items-stretch min-h-[120px] py-4 ${cellCol1}`}>
                <div className={lineClass} aria-hidden />
                <div className={`${circleBaseClass} ${circleFillClass}`} aria-hidden style={{ zIndex: 1 }} />
              </div>
              <div className={`min-w-0 flex items-center py-2 ${cellCol2}`}>
                <TimelineCard item={item} isDark={isDark} workLabel={labels.work} educationLabel={labels.education} />
              </div>
            </React.Fragment>
          );
        })}
        <div className={`relative flex flex-col items-center pt-4 pb-16 min-h-[3.5rem] ${cellCol1}`}>
          <div className={lineClass} aria-hidden />
          <div className={`${mainNodeCircleClass} bottom-0 translate-y-1/2`} aria-hidden style={{ zIndex: 1 }} />
          <span className={`${labelClass} absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-[calc(100%+1rem)]`} style={{ zIndex: 1 }}>{labels.initialCommitLine1}</span>
          <span className={`${labelClass} absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-[calc(100%+2.25rem)] text-sm`} style={{ zIndex: 1 }}>{labels.initialCommitLine2}</span>
        </div>
        <div className={cellCol2} />
      </div>
    </figure>
  );
}

/** Git-branch style diagram: main vertical line, nodes, and reusable right/left branches. */
function BranchDiagram() {
  const { theme } = useTheme();
  const { t } = useLocale();
  const isDark = theme === "dark";
  const isCompact = useMediaQuery(MQ_COMPACT);
  const isNarrow = useMediaQuery(MQ_NARROW);
  const timeline = t.timeline;
  const DIAGRAM_CARDS = getDiagramCards(timeline);
  const journeyLabels: JourneyLabels = {
    headLabel: t.ui.journey.headLabel,
    initialCommitLine1: t.ui.journey.initialCommitLine1,
    initialCommitLine2: t.ui.journey.initialCommitLine2,
    work: t.ui.journey.work,
    education: t.ui.journey.education,
  };
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
  const labelOffset = 18; /* gap between circle edge and HEAD label */
  const bottomLabelOffset = 36; /* gap between bottom circle and Initial Commit */
  const labelSpace = 20; /* extra space for top label */
  const bottomLabelSpace = bottomLabelOffset + 52; /* room for two-line "Initial" / "commit" */
  const topCircleEdge = mainNodes[0] - DIAGRAM.nodeR;
  const bottomCircleEdge = mainNodes[mainNodes.length - 1] + DIAGRAM.nodeR;
  const viewBoxMinY = topCircleEdge - verticalPadding - labelSpace;
  const viewBoxHeight = bottomCircleEdge + verticalPadding + Math.max(labelSpace, bottomLabelSpace) - viewBoxMinY;
  const viewBox = `${diagramMinX} ${viewBoxMinY} ${diagramWidth} ${viewBoxHeight}`;
  const topLabelY = mainNodes[0] - DIAGRAM.nodeR - labelOffset;
  const bottomLabelY = mainNodes[mainNodes.length - 1] + DIAGRAM.nodeR + bottomLabelOffset;

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
  const mainLineLabels = (
    <>
      <text x={cx} y={topLabelY} textAnchor="middle" className="fill-current text-2xl font-semibold" style={{ fontFamily: "inherit" }}>{journeyLabels.headLabel}</text>
      <text textAnchor="middle" className="fill-current text-2xl font-semibold" style={{ fontFamily: "inherit" }}>
        <tspan x={cx} y={bottomLabelY}>{journeyLabels.initialCommitLine1}</tspan>
        <tspan x={cx} dy="1.2em">{journeyLabels.initialCommitLine2}</tspan>
      </text>
    </>
  );

  /* Compact (< 1024px): < 640px = flow-based (dynamic heights); 640–1023px = SVG with fixed height */
  if (isCompact) {
    const cardsInOrder = branches.map((_, i) => leftColByGap[i] ?? rightColByGap[i]) as TimelineItem[];
    const circleFillCompact = (i: number) =>
      (DIAGRAM_CARDS.find((c) => c.gapIndex === i)!.item.type === "work" ? RIGHT_FILL : LEFT_FILL);

    if (isNarrow) return <CompactFlowDiagram cardsInOrder={cardsInOrder} isDark={isDark} labels={journeyLabels} />;

    /* 640px–1023px: SVG compact – fixed height, diagram + absolute-positioned cards */
    const compactExtraLeft = 48;
    const compactViewBoxMinX = cx - DIAGRAM.nodeR - diagramPadding - compactExtraLeft;
    const compactViewBoxWidth = DIAGRAM.branchRadius + 2 * DIAGRAM.nodeR + 2 * diagramPadding + compactExtraLeft;
    const viewBoxCompact = `${compactViewBoxMinX} ${viewBoxMinY} ${compactViewBoxWidth} ${viewBoxHeight}`;
    const compactMinH = COMPACT_MIN_HEIGHT_PX;
    const compactDiagramMinWidthPx = Math.ceil((compactMinH * compactViewBoxWidth) / viewBoxHeight);

    return (
      <figure
        className="flex flex-row gap-6 my-10 sm:my-12 px-0 overflow-visible items-stretch"
        style={{ height: compactMinH } as React.CSSProperties}
        aria-hidden
      >
        <div
          className="relative flex-shrink-0 flex justify-start items-stretch z-10 h-full"
          style={{ height: "100%", minWidth: compactDiagramMinWidthPx } as React.CSSProperties}
        >
          <svg
            viewBox={viewBoxCompact}
            className="h-full w-auto text-zinc-800 dark:text-zinc-200 flex-shrink-0 max-w-full"
            style={{ height: "100%" } as React.CSSProperties}
            fill="none"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            preserveAspectRatio="xMinYMid meet"
          >
            {mainLine}
            {branches.map((b, i) => (
              <RightBranch key={`path-${i}`} part="paths" nodeBelowY={b.nodeBelowY} nodeAboveY={b.nodeAboveY} branchY={b.branchY} label="" circleFill={circleFillCompact(i)} />
            ))}
            {mainNodeCircles}
            {mainLineLabels}
            {branches.map((b, i) => (
              <RightBranch key={`circle-${i}`} part="circle" nodeBelowY={b.nodeBelowY} nodeAboveY={b.nodeAboveY} branchY={b.branchY} label="" circleFill={circleFillCompact(i)} hideLabel />
            ))}
          </svg>
        </div>
        <div className="relative flex-1 min-w-0 pl-8 h-full" style={{ height: "100%" } as React.CSSProperties}>
          {cardsInOrder.map(
            (item, i) =>
              item && (
                <div
                  key={i}
                  className="absolute left-0 right-0 flex justify-start pointer-events-none"
                  style={{ top: `${branchTopPercent(branches[i].branchY)}%`, transform: "translateY(-50%)" } as React.CSSProperties}
                >
                  <div className="w-full max-w-[calc(100%-1rem)] pointer-events-auto">
                    <TimelineCard item={item} isDark={isDark} workLabel={journeyLabels.work} educationLabel={journeyLabels.education} />
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
                <TimelineCard item={item} isDark={isDark} workLabel={journeyLabels.work} educationLabel={journeyLabels.education} />
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
                <TimelineCard item={item} isDark={isDark} workLabel={journeyLabels.work} educationLabel={journeyLabels.education} />
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
          {mainLineLabels}
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
                <TimelineCard item={item} isDark={isDark} workLabel={journeyLabels.work} educationLabel={journeyLabels.education} />
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
                <TimelineCard item={item} isDark={isDark} workLabel={journeyLabels.work} educationLabel={journeyLabels.education} />
              </div>
            </div>
          ) : null
        )}
      </div>
    </figure>
  );
}

export function Journey() {
  const { t } = useLocale();
  return (
    <section id="journey" className="section-pad">
      <div className="container-narrow">
        <SectionHeading className="mb-12">{t.ui.sections.journey}</SectionHeading>

        <BranchDiagram />
      </div>
    </section>
  );
}
