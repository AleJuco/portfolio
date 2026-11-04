import type { CSSProperties } from "react";
import { Sticker } from "@/components/art/Sticker";
import styles from "./CounterSign.module.css";

// Panel with a rolling counter. `digits` pads the value with leading zeros.
export function CounterSign({ label, value, digits }: { label: string; value: number; digits: number }) {
  const padded = String(value).padStart(digits, "0");

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.emblem}>
          <Sticker name="panda" className="size-full" />
        </span>
        <span className="caption">{label}</span>
      </div>
      <div className={styles.odometer} role="img" aria-label={`${label}: ${value.toLocaleString("en-US")}`}>
        {padded.split("").map((digit, i) => (
          <span key={i} className={styles.cell} aria-hidden="true">
            {/* Two rows of 0-9 so every digit spins at least one full turn before stopping. */}
            <span className={styles.reel} style={{ "--d": Number(digit), "--i": i } as CSSProperties}>
              {[...Array(20)].map((_, n) => (
                <span key={n}>{n % 10}</span>
              ))}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
