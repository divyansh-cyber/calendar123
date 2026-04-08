import styles from './SpiralBinding.module.css';

export default function SpiralBinding({ count = 15 }) {
  return (
    <div className={styles.spiralContainer}>
      <div className={styles.spiralTrack}>
        {Array.from({ length: count }, (_, i) => (
          <div key={i} className={styles.ring} />
        ))}
      </div>
    </div>
  );
}
