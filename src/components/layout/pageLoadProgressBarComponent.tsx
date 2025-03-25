import { usePageLoadProgressBarStore } from "@/providers/pageLoadProgressBarStoreProvider";
import styles from "./pageLoadProgressBarComponent.module.css";

const progressBarClassNames = {
  pending: styles.pending,
  waiting: styles.waiting,
  finishing: styles.finishing,
  hiding: styles.hiding
};

<<<<<<< HEAD:src/components/pageLoadProgressBarComponent.tsx
const PageLoadProgressBarComponent = () => {
  // Dependencies.
  const store = usePageLoadProgressBarStore(store => store);

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
        className={`progress-bar progress-bar-striped progress-bar-animated h-100\
                  ${styles.progressBar} ${progressBarClassNames[store.phase]}`}
        style={{ width: `${store.percentage}%` }}
      />
    </div>
  );
};

export default PageLoadProgressBarComponent;
=======
export default function PageLoadProgressBarComponent() {
    // Dependencies.
    const store = usePageLoadProgressBarStore(store => store);

    return (
        <div
            className={`progress w-100 rounded-0 ${styles.progress}`}
            role="progressbar"
            aria-label="Animated striped example"
            aria-valuenow={store.percentage}
            aria-valuemin={0}
            aria-valuemax={100}
        >
            <div
                className={`progress-bar progress-bar-striped progress-bar-animated h-100
                            ${styles.progressBar} ${progressBarClassNames[store.phase]}`}
                style={{ width: `${store.percentage}%` }}
            />
        </div>
    );
};
>>>>>>> a75df80811d83d142c28532c745e93962b3468d7:src/components/layout/pageLoadProgressBarComponent.tsx
