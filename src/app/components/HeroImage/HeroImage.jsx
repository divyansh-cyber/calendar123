'use client';

import { useState } from 'react';
import { MONTH_NAMES } from '../../utils/dateUtils';
import { getMonthImage } from '../../utils/monthImages';
import styles from './HeroImage.module.css';

export default function HeroImage({ year, month }) {
  const monthData = getMonthImage(month);
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={styles.heroContainer}
      style={imgError ? { background: monthData.gradient } : undefined}
    >
      {!imgError && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={monthData.url}
          alt={monthData.alt}
          className={styles.heroImage}
          onError={() => setImgError(true)}
          loading="eager"
        />
      )}

      <div className={styles.heroOverlay} />

      {/* Wave SVG separator — mimics the reference blue wave */}
      <div className={styles.waveContainer}>
        <svg
          className={styles.waveSvg}
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,40 C150,100 350,0 600,50 C850,100 1050,10 1200,60 L1200,120 L0,120 Z"
            fill="var(--calendar-bg, #ffffff)"
          />
          <path
            d="M0,60 C200,110 400,20 600,70 C800,120 1000,30 1200,80 L1200,120 L0,120 Z"
            fill="var(--accent-color, #2196F3)"
            opacity="0.3"
          />
        </svg>
      </div>

      {/* Month / Year label */}
      <div className={styles.monthLabel}>
        <div className={styles.yearText}>{year}</div>
        <div className={styles.monthText}>{MONTH_NAMES[month]}</div>
      </div>
    </div>
  );
}
