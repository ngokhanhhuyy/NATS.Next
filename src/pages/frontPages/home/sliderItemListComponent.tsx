import { useRef, useEffect } from "react";
import styles from "./sliderItemListComponent.module.css";
import type { Carousel } from "bootstrap";

// Props.
interface Props {
    model: SliderItemDetailModel[];
}

// Component.
export default function SliderItemList(props: Props) {

    // States.
    const templateRef = useRef<HTMLDivElement | null>(null);
    const carouselControllerRef = useRef<Carousel | null>(null);

    // Effect.
    useEffect(() => {
        import("bootstrap").then(({ Carousel }) => {
            carouselControllerRef.current = new Carousel(templateRef.current!, {
                interval: 2000
            });
            carouselControllerRef.current.cycle();
        });
    }, []);

    // Computed.
    function computeItemClassName(index: number): string {
        return index === 0 ? "active" : "";
    }

    return (
        <div
            className="carousel slide overflow-visible m-0 w-100 position-relative"
            ref={templateRef}
            id="sliderItemList"
        >
            {/* Photos */}
            <div className="carousel-inner">
                {props.model.map((sliderItem, index) => (
                    <div
                        className={`carousel-item ${computeItemClassName(index)}`}
                        key={index}
                    >
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
                        key={index}>
                    </button>
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
    );
}