import Link from "next/link";

// Props.
type DetailPageProps = {
    model: CatalogItemDetailModel;
}

type OtherItemListProps = {
    model: CatalogItemBasicModel[];
}

// Component.
function DetailPage(props: DetailPageProps) {
    return (
        <>
            <div className="container p-4" id="catalog-item-detail-view">
                <div className="row g-4 justify-content-center">
                    {/* Name and summary */}
                    <div className="col col-md-10 col-12">
                        {/* Name */} 
                        <h2 className="text-success">
                            {props.model.name}
                        </h2>

                        {/* Summary */}
                        <span className="d-inline-block my-2">
                            {props.model.summary}
                        </span>
                    </div>

                    {/* Thumbnail */}
                    <div className="col col-xl-4 col-md-5 col-10">
                        {props.model.thumbnailUrl && (
                            <img
                                src={props.model.thumbnailUrl}
                                className="w-100 img-thumbnail rounded-4 shadow"
                                alt={props.model.name}
                            />
                        )}
                    </div>

                    {/* Detail */}
                    <div className="col col-sm-10 col-12 pt-4">
                        {props.model.detail.split(/\r?\n/).map((paragraph, index) => (
                            <p key={index}>
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>

                {props.model.photos.length > 0 && (
                    <div className="row g-4 justify-content-center my-4">
                        {props.model.photos.map((photo, index) => (
                            <div className="col col-md-7 col-sm-10 col-12" key={photo.id}>
                                <img
                                    src={photo.url}
                                    className="w-100 rounded-4 shadow"
                                    alt={`${props.model.name} - Hình ảnh ${index}`}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* EnquiryLink */}
            <div className="container-fluid py-5 bg-success text-white mt-5">
                <div className="container d-flex flex-column justify-content-center align-items-center">
                    <span className="fs-1 text-center">
                        Hãy để chúng tôi tư vấn cho bạn!
                    </span>
                    <a href="#" className="btn btn-outline-light btn-lg mt-3">
                        Liên hệ
                    </a>
                </div>
            </div>

            {/* OtherItems */}
            <div className="container my-5">
                <div className="row g-4 justify-content-center align-items-stretch">
                    <div className="col col-md-10 col-12 fs-2 text-success">
                        {props.model.typeDisplayName} khác
                    </div>
                    
                    <OtherItemList model={props.model.otherItems} />
                </div>
            </div>
        </>
    );
}

function OtherItemList(props: OtherItemListProps) {
    return props.model.map(item => (
        <div className="col col-xl-3 col-sm-5 col-10" key={item.id}>
            <div className="card w-100 h-100">
                <img
                    src={item.thumbnailUrl}
                    className="card-img-top"
                    alt="@catalogItem.Name"
                />
                <div className="card-body d-flex flex-column justify-content-start">
                    {/* Name */}
                    <h5 className="card-title text-success">
                        {item.name}
                    </h5>

                    {/* Summary */}
                    <div className="card-text d-block flex-fill">
                        {item.summary}
                    </div>

                    {/* DetailLink */}
                    <Link
                        href={item.detailRoute}
                        className="btn btn-outline-success align-self-end mt-3"
                    >
                        Chi tiết
                    </Link>
                </div>
            </div>
        </div>
    ));
}

export default DetailPage;