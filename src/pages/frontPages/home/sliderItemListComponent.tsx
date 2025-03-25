import { useState, useRef, useEffect, type CSSProperties } from "react";
import styles from "./sliderItemListComponent.module.css";
import type { Carousel } from "bootstrap";

// Props.
interface Props {
	model: SliderItemDetailModel[];
}

// Component.
export default function SliderItemList(props: Props) {
	// States.
	const carouselElementRef = useRef<HTMLDivElement | null>(null);
	const carouselControllerRef = useRef<Carousel | null>(null);
	const [currentIndex, setCurrentIndex] = useState<number | null>(() => {
		if (props.model.length === 0) {
			return null;
		}

		return props.model[0].id;
	});

	// Effect.
	useEffect(() => {
		import("bootstrap").then(({ Carousel }) => {
			if (carouselElementRef.current != null) {
				carouselControllerRef.current = new Carousel(carouselElementRef.current, {
					interval: 3000,
				});

				carouselElementRef.current
					.addEventListener("slide.bs.carousel", handleCarouselIndexChange);
			}
		});

		return () => {
			carouselControllerRef.current?.dispose();
			carouselControllerRef.current = null;
			carouselElementRef.current
				?.removeEventListener("slider.bs.carousel", handleCarouselIndexChange);
		};
	}, []);

	// Computed.
	function computeItemClassName(index: number): string {
		return index === 0 ? "active" : "";
	}

	function computeBlurredBackgroundStyle(): CSSProperties {
		if (currentIndex != null) {
			return { backgroundImage: `url(${props.model[currentIndex].thumbnailUrl})` };
		}

		return { };
	}

	// Callback.
	function handleCarouselIndexChange(event: Event): void {
		const currentIndex: number = (event as Event & { to: number }).to;
		setCurrentIndex(currentIndex);
	}

	return (
		<div className="container-fluid p-0 position-relative overflow-hidden bg-success">
			{/* Blurred background */}
			<div
				className={styles.blurredBackground}
				style={computeBlurredBackgroundStyle()}
			/>

			{/* Carousel */}
			<div
				className={`carousel slide ${styles.carousel}`}
				data-bs-ride="carousel"
				ref={carouselElementRef}
				id="sliderItemList"
			>
				{/* Photos */}
				<div className="carousel-inner">
					{props.model.map((sliderItem, index) => (
						<div className={`carousel-item ${computeItemClassName(index)}`} key={index}>
							<img
								src={sliderItem.thumbnailUrl}
								className={`carousel-img d-block w-100 ${styles.thumbnail}`}
								alt={sliderItem.title}
							/>
						</div>
					))}
				</div>

				{/* IndicatorButtons */}
				<div className="carousel-indicators">
					{props.model.map((_, index) => (
						<button
							type="button"
							className={computeItemClassName(index)}
							data-bs-target="#sliderItemList"
							data-bs-slide-to={index}
							aria-current={index == 0}
							aria-label={`Slider ${index + 1}`}
							key={index}
						></button>
					))}
				</div>

				{/* CarouoselControlButtons */}
				<button
					className="carousel-control-prev"
					type="button"
					data-bs-target="#sliderItemList"
					data-bs-slide="prev"
				>
					<span className="carousel-control-prev-icon" aria-hidden="true"></span>
					<span className="visually-hidden">Previous</span>
				</button>
				<button
					className="carousel-control-next"
					type="button"
					data-bs-target="#sliderItemList"
					data-bs-slide="next"
				>
					<span className="carousel-control-next-icon" aria-hidden="true"></span>
					<span className="visually-hidden">Next</span>
				</button>
			</div>
		</div>
	);
}