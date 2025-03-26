import styles from "./index.module.css";

export default function CertificateList(props: { model: CertificateDetailModel[] }) {
  // Computed.
  function computeItemContainerClassName() {
    return "d-flex flex-column justify-content-stretch\
            align-items-stretch rounded-4 shadow overflow-hidden";
  };

  return (
			<div className="row gx-5 justify-content-center mt-4">
        <div className="col col-lg-12 col-md-10 col-12">
          <h2 className={`text-center ${styles.contentLabel}`}>
            Chứng chỉ
          </h2>
        </div>

        {props.model.map(certificate => (
          <div className="col col-xl-5 col-md-10 col-12" key={certificate.id}>
            <div className={computeItemContainerClassName()}>
              {/* Thumbnail */}
              <img src={certificate.thumbnailUrl} alt={certificate.name} />
              

              {/* TitleContainer */}
              <div className={styles.certificateTitleContainer}>
                {/* TitleBackground */}
                <div
                  className={styles.certificateTitleBackground}
                  style={{ backgroundImage: `url(${certificate.thumbnailUrl})` }}
                />
                
                {/* Title */}
                <div className={styles.certificateTitle}>
                  {certificate.name}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
  );
}