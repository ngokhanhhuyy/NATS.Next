import { usePageLoadProgressBarStore } from "@/providers/pageLoadProgressBarStoreProvider";
import styles from "./pageLoadProgressBarComponent.module.css";

const progressBarClassNames = {
  pending: styles.pending,
  waiting: styles.waiting,
  finishing: styles.finishing,
  hiding: styles.hiding
};

const PageLoadProgressBarComponent = () => {
  // Dependencies.
  const store = usePageLoadProgressBarStore(store => store);

  // Computed.
  function computeProgressBarClassName(): string {
    return [
      "progress-bar progress-bar-striped progress-bar-animated h-100",
      styles.progressBar,
      progressBarClassNames[store.phase]
    ].join(" ");
  }

  return (
    <div
      className={`progress w-100 ${styles.progress} rounded-0`}
      role="progressbar"
      aria-label="Animated striped example"
      aria-valuenow={store.percentage}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={computeProgressBarClassName()}
        style={{ width: `${store.percentage}%` }}
      />
    </div>
  );
};

export default PageLoadProgressBarComponent;
