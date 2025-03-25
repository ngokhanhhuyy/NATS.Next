import { createStore } from "zustand/vanilla";

type Phase = "pending" | "waiting" | "finishing" | "hiding";

export type PageLoadProgressBarStore = {
	readonly percentage: number;
	readonly phase: Phase;
	readonly isLoading: boolean;
	readonly start: () => void;
	readonly finish: () => void;
};

export function createPageLoadProgressBarStore() {
	return createStore<PageLoadProgressBarStore>((set, get) => ({
		percentage: 75,
		phase: "waiting",
		get isLoading() {
			return get().phase === "waiting";
		},
		start(): void {
			const percentage = get().percentage;
			if (percentage === 100) {
				set({ phase: "pending", percentage: 0 });
			}
			set({ phase: "waiting", percentage: 75 });
		},
		finish(): void {
			set({ phase: "finishing", percentage: 100 });
			setTimeout(() => {
				set({ phase: "hiding" });
				setTimeout(() => set({ phase: "pending", percentage: 0 }), 205);
			}, 100);
		}
	}));
}