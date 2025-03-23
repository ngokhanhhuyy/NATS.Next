import { CSSProperties } from "react";

// Props.
type ItemProps = {
    model: SummaryItemDetailModel;
    index: number;
}

export default function Item(props: ItemProps) {
    // Computed.
    function computeThumbnailStyle(): CSSProperties {
        return {
            width: 250,
            height: "auto",
            aspectRatio: 1,
            objectFit: "cover",
            objectPosition: "50%"
        };
    }

    function computeThumbnailColumnClassName(): string {
        return `order-lg-${props.index % 2}`;
    }

    function computeDetailColumnClassName(): string {
        return `order-lg-${(props.index + 1) % 2}`;
    }

    function computeNameClassName(): string {
        let className: string = "text-center";
        if (props.index % 2 == 0) {
            className += " text-lg-start";
        } else {
            className += " text-lg-end";
        }

        return className;
    }

    return (
        <div
            className="row g-5 justify-content-center mb-5"
            id={`summary-item-${props.model.id}`}
        >
            {/* Thumbnail */}
            <div className={`col col-lg-auto col-md-10 col-12 d-flex justify-content-center
                            align-items-start ${computeThumbnailColumnClassName()}`}>
                <img
                    src={props.model.thumbnailUrl}
                    className="rounded-circle shadow"
                    style={computeThumbnailStyle()}
                    alt={props.model.name}
                />
            </div>

            {/* Detail */}
            <div className={`col col-lg col-md-10 col-12 ${computeDetailColumnClassName()}`}>
                {/* Name */}
                <div className={`fs-2 text-success mb-3 ${computeNameClassName()}`}>
                    {props.model.name}
                </div>

                {/* DetailContent */}
                {props.model.detailContent.split(/\r?\n/).map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
        </div>
    );
}