import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@assessment/design-system";
import type { TradingChartProps } from "../types/trading";

/** Timeframe labels used in the chart toolbar — static mock, no real switching. */
const TIMEFRAMES = ["1m", "5m", "15m", "1H", "4H", "1D", "1W"] as const;

/** Chart layout constants — independent of container size via viewBox. */
const PADDING_LEFT = 8;
const PADDING_RIGHT = 64;
const PADDING_TOP = 20;
const PADDING_BOTTOM = 32;
const VIEWBOX_WIDTH = 800;
const VIEWBOX_HEIGHT = 680;
const VOLUME_BASELINE = VIEWBOX_HEIGHT - 38;
const MAX_VOLUME_BAR_HEIGHT = 54;

const CHART_WIDTH = VIEWBOX_WIDTH - PADDING_LEFT - PADDING_RIGHT;
const CHART_HEIGHT = VIEWBOX_HEIGHT - PADDING_TOP - PADDING_BOTTOM;

export function TradingChart({
  pair,
  data,
  currentPrice,
  change24h,
}: TradingChartProps) {
  const [isChartLoading, setIsChartLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsChartLoading(false);
    }, 1250);

    return () => window.clearTimeout(timer);
  }, []);

  const { priceMin, priceMax, lowPrice, highPrice, yScale, pathD, areaD } = useMemo(() => {
    if (data.length < 2) {
      return {
        priceMin: 0,
        priceMax: 0,
        lowPrice: 0,
        highPrice: 0,
        yScale: () => 0,
        pathD: "",
        areaD: "",
      };
    }

    const prices = data.map((d) => d.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    // Add scale padding so the static chart feels like a zoomed-out trading view.
    const range = max - min;
    const paddedMin = min - range * 0.18;
    const paddedMax = max + range * 0.18;
    const effectiveRange = paddedMax - paddedMin;

    const scaleY = (price: number) =>
      PADDING_TOP + CHART_HEIGHT * (1 - (price - paddedMin) / effectiveRange);

    // Build SVG path commands
    const stepX = CHART_WIDTH / (data.length - 1);
    let linePath = "";
    let areaPath = "";

    data.forEach((d, i) => {
      const x = PADDING_LEFT + i * stepX;
      const y = scaleY(d.price);
      const cmd = i === 0 ? "M" : "L";
      linePath += `${cmd}${x},${y} `;
    });

    // Area path: line path + return to bottom-right + bottom-left + close
    areaPath = linePath;
    const lastX = PADDING_LEFT + (data.length - 1) * stepX;
    const bottomY = PADDING_TOP + CHART_HEIGHT;
    areaPath += `L${lastX},${bottomY} L${PADDING_LEFT},${bottomY} Z`;

    return {
      priceMin: paddedMin,
      priceMax: paddedMax,
      lowPrice: min,
      highPrice: max,
      yScale: scaleY,
      pathD: linePath.trim(),
      areaD: areaPath.trim(),
    };
  }, [data]);

  // Horizontal grid lines — 13 evenly spaced price levels
  const gridLines = useMemo(() => {
    const lines: number[] = [];
    const steps = 12;
    for (let i = 0; i <= steps; i++) {
      const price = priceMin + ((priceMax - priceMin) * i) / steps;
      lines.push(price);
    }
    return lines;
  }, [priceMin, priceMax]);

  // Time labels — every 6 hours
  const timeLabels = useMemo(() => {
    if (data.length < 2) return [];
    const step = Math.max(1, Math.floor(data.length / 4));
    return data
      .map((d, i) => ({ ...d, i }))
      .filter((_, i) => i % step === 0 || i === data.length - 1);
  }, [data]);

  const stepX = data.length > 1 ? CHART_WIDTH / (data.length - 1) : 0;

  const volumeBars = useMemo(() => {
    if (data.length < 2) return [];

    const changes = data.map((d, i) =>
      i === 0 ? 0 : Math.abs(d.price - data[i - 1].price)
    );
    const maxChange = Math.max(...changes, 1);

    return data.map((d, i) => {
      const previousPrice = i === 0 ? d.price : data[i - 1].price;
      const height = 8 + (changes[i] / maxChange) * MAX_VOLUME_BAR_HEIGHT;

      return {
        x: PADDING_LEFT + i * stepX,
        y: VOLUME_BASELINE - height,
        height,
        isUp: d.price >= previousPrice,
      };
    });
  }, [data, stepX]);

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(p);

  const formatAxisPrice = (p: number) =>
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(p);

  const formatTime = (ms: number) => {
    const totalMinutes = Math.floor(ms / 60000);
    const hours = String(Math.floor(totalMinutes / 60) % 24).padStart(2, "0");
    const minutes = String(totalMinutes % 60).padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  const isPositive = change24h >= 0;
  const trendColor = "var(--deriv-positive-green)";
  const openPrice = data[0]?.price ?? currentPrice;

  return (
    <Card className="h-full flex flex-col border-l-0 border-r-0 border-t-0 md:border-l md:border-r md:border-t bg-[var(--deriv-bg-dark)]">
      {/* Chart toolbar — timeframe selector */}
      <div className="flex items-center justify-between gap-2 border-b border-[var(--deriv-input-dark)] px-3 py-2 md:px-4">
        <div className="flex items-center gap-1">
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf}
              type="button"
              className={`rounded-sm px-2.5 py-1 text-xs font-medium transition-colors ${
                tf === "1H"
                  ? "bg-[var(--deriv-alert-blue)] text-white"
                  : "text-[var(--deriv-icon-grey)] hover:text-white"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <CardContent className="relative flex-1 overflow-hidden p-0">
        <div
          className={`flex h-full flex-col transition-[filter,opacity] duration-300 ${
            isChartLoading ? "blur-sm opacity-80" : "blur-0 opacity-100"
          }`}
        >
          {/* Price info bar */}
          <div className="flex items-baseline gap-4 px-4 pt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-semibold tabular-nums text-white md:text-2xl">
                {formatPrice(currentPrice)}
              </span>
              <span
                className={`text-sm font-medium tabular-nums ${
                  isPositive
                    ? "text-[var(--deriv-positive-green)]"
                    : "text-[var(--deriv-negative-red)]"
                }`}
              >
                {isPositive ? "+" : ""}
                {change24h}%
              </span>
            </div>
            <div className="hidden items-center gap-3 text-[10px] tabular-nums text-[var(--deriv-icon-grey)] lg:flex">
              <span>O {formatAxisPrice(openPrice)}</span>
              <span>H {formatAxisPrice(highPrice)}</span>
              <span>L {formatAxisPrice(lowPrice)}</span>
              <span>C {formatAxisPrice(currentPrice)}</span>
            </div>
          </div>

          {/* SVG Chart */}
          <div className="flex-1 min-h-0 px-1 pt-0 pb-0">
            <svg
              viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
              preserveAspectRatio="xMidYMid meet"
              className="w-full h-full"
              role="img"
              aria-label={`${pair} price chart — 24h`}
            >
              <defs>
                <linearGradient
                  id="chart-area-gradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={trendColor} stopOpacity="0.25" />
                  <stop offset="100%" stopColor={trendColor} stopOpacity="0.02" />
                </linearGradient>
              </defs>

              <rect
                x="0"
                y="0"
                width={VIEWBOX_WIDTH}
                height={VIEWBOX_HEIGHT}
                fill="var(--deriv-bg-dark)"
              />

              {/* Horizontal grid lines */}
              {gridLines.map((price) => {
                const y = yScale(price);
                return (
                  <g key={price}>
                    <line
                      x1={PADDING_LEFT}
                      y1={y}
                      x2={VIEWBOX_WIDTH - PADDING_RIGHT}
                      y2={y}
                      stroke="var(--deriv-input-dark)"
                      strokeWidth="0.6"
                      opacity="0.75"
                    />
                    <text
                      x={VIEWBOX_WIDTH - PADDING_RIGHT + 4}
                      y={y + 4}
                      fill="var(--deriv-icon-grey)"
                      fontSize="7"
                      fontFamily="Inter, sans-serif"
                      textAnchor="start"
                    >
                      {formatAxisPrice(price)}
                    </text>
                  </g>
                );
              })}

              {/* Vertical session grid lines */}
              {timeLabels.map((d) => {
                const x = PADDING_LEFT + d.i * stepX;
                return (
                  <line
                    key={`grid-${d.time}`}
                    x1={x}
                    y1={PADDING_TOP}
                    x2={x}
                    y2={VOLUME_BASELINE}
                    stroke="var(--deriv-input-dark)"
                    strokeWidth="0.6"
                    opacity="0.55"
                  />
                );
              })}

              {/* Volume histogram */}
              {volumeBars.map((bar, index) => (
                <rect
                  key={`volume-${index}`}
                  x={bar.x - Math.max(2, stepX * 0.28)}
                  y={bar.y}
                  width={Math.max(2, stepX * 0.56)}
                  height={bar.height}
                  rx="1"
                  fill={
                    bar.isUp
                      ? "var(--deriv-positive-green)"
                      : "var(--deriv-negative-red)"
                  }
                  opacity="0.22"
                />
              ))}

              {/* Time labels (X axis) */}
              {timeLabels.map((d) => {
                const x = PADDING_LEFT + d.i * stepX;
                return (
                  <text
                    key={d.time}
                    x={x}
                    y={VIEWBOX_HEIGHT - 6}
                    fill="var(--deriv-icon-grey)"
                    fontSize="7"
                    fontFamily="Inter, sans-serif"
                    textAnchor="middle"
                  >
                    {formatTime(d.time)}
                  </text>
                );
              })}

              {/* Area fill under line */}
              <path
                d={areaD}
                fill="url(#chart-area-gradient)"
                stroke="none"
              />

              {/* Price line */}
              <path
                d={pathD}
                fill="none"
                stroke={trendColor}
                strokeWidth="1.5"
                strokeLinejoin="round"
                strokeLinecap="round"
              />

              {/* Current price dot */}
              {data.length > 0 && (() => {
                const last = data[data.length - 1];
                const cx = PADDING_LEFT + (data.length - 1) * stepX;
                const cy = yScale(last.price);
                return (
                  <g>
                    {/* Glow ring */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r="6"
                      fill={trendColor}
                      opacity="0.2"
                    />
                    {/* Solid dot */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r="3.5"
                      fill={trendColor}
                      stroke="var(--deriv-bg-dark)"
                      strokeWidth="1.5"
                    />
                  </g>
                );
              })()}

              {/* Current price horizontal guide line */}
              {data.length > 0 && (() => {
                const last = data[data.length - 1];
                const y = yScale(last.price);
                return (
                  <line
                    x1={PADDING_LEFT}
                    y1={y}
                    x2={PADDING_LEFT + CHART_WIDTH}
                    y2={y}
                    stroke={trendColor}
                    strokeWidth="0.5"
                    strokeDasharray="6 3"
                    opacity="0.6"
                  />
                );
              })()}

              {/* Current price marker on the price ladder */}
              {data.length > 0 && (() => {
                const y = yScale(currentPrice);
                return (
                  <g>
                    <rect
                      x={VIEWBOX_WIDTH - PADDING_RIGHT + 3}
                      y={y - 9}
                      width="58"
                      height="18"
                      rx="3"
                      fill={trendColor}
                    />
                    <text
                      x={VIEWBOX_WIDTH - PADDING_RIGHT + 32}
                      y={y + 4}
                      fill="white"
                      fontSize="8"
                      fontFamily="Inter, sans-serif"
                      fontWeight="600"
                      textAnchor="middle"
                    >
                      {formatAxisPrice(currentPrice)}
                    </text>
                  </g>
                );
              })()}
            </svg>
          </div>
        </div>

        {isChartLoading && (
          <div
            className="absolute inset-0 z-10 flex items-center justify-center bg-[color-mix(in_srgb,var(--surface-card)_42%,transparent)] backdrop-blur-sm"
            role="status"
            aria-live="polite"
          >
            <span className="sr-only">Loading chart</span>
            <span
              className="size-9 animate-spin rounded-full border-2 border-[var(--border-default)] border-t-[var(--action-primary)] motion-reduce:animate-none"
              aria-hidden="true"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
