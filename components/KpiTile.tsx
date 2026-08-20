import CountUp from "./CountUp";
import styles from "./KpiTile.module.css";

type Props = {
  label: string;
  value: string;
  trend?: string;
  trendDown?: boolean;
  spark?: number[];
  animate?: boolean;
};

export default function KpiTile({
  label,
  value,
  trend,
  trendDown,
  spark,
  animate = true,
}: Props) {
  return (
    <div className={styles.tile}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>
        {animate ? <CountUp value={value} /> : value}
      </div>
      {trend && (
        <div className={`${styles.trend} ${trendDown ? styles.down : ""}`}>
          <span className={styles.arrow} aria-hidden>
            {trendDown ? "▾" : "▴"}
          </span>
          {trend}
        </div>
      )}
      {spark && spark.length > 1 && <Sparkline data={spark} />}
    </div>
  );
}

function Sparkline({ data }: { data: number[] }) {
  const w = 120;
  const h = 34;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = w / (data.length - 1);
  const points = data
    .map((v, i) => `${(i * step).toFixed(2)},${(h - ((v - min) / range) * h).toFixed(2)}`)
    .join(" ");
  const areaPoints = `0,${h} ${points} ${w},${h}`;

  return (
    <svg
      className={styles.spark}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      aria-hidden
    >
      <polygon points={areaPoints} fill="rgba(82,211,234,0.14)" />
      <polyline
        points={points}
        fill="none"
        stroke="#52d3ea"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
