import { Fragment, type ReactElement, type ReactNode } from "react";
import { getAboutUsIntroductionAsync } from "@/services/aboutUsIntroductionService";
import { getMemberListAsync } from "@/services/memberService";
import { getCertificateListAsync } from "@/services/certificateService";
import { createAboutUsIntroductionDetailModel } from "@/models/aboutUsIntroductionModels";
import { createMemberDetailModel } from "@/models/memberModels";
import { createCertificateDetailModel } from "@/models/certificateModels";
import styles from "./index.module.css";

// Layout components.
import FrontPageSubPageLayout from "@/components/layout/frontPages/frontPageSubPageLayout";

// Type.
type Model = {
	aboutUsIntroduction: AboutUsIntroductionDetailModel;
	members: MemberDetailModel[];
	certificates: CertificateDetailModel[];
};

// Props.
type AboutUsPageProps = {
  model: {
    aboutUsIntroduction: AboutUsIntroductionDetailModel;
    members: MemberDetailModel[];
    certificates: CertificateDetailModel[];
  }
};

export async function getServerSideProps() {
  const [
    aboutUsResponseDto,
    memberResponseDtos,
    certificateResponseDtos
  ] = await Promise.all([
    getAboutUsIntroductionAsync(),
    getMemberListAsync(),
    getCertificateListAsync()
  ]);
  const model: Model = {
    aboutUsIntroduction: createAboutUsIntroductionDetailModel(aboutUsResponseDto),
    members: memberResponseDtos.map(dto => createMemberDetailModel(dto)),
    certificates: certificateResponseDtos.map(dto => createCertificateDetailModel(dto))
  };

	return { props: { model } };
}

// Component.
export default function AboutUsPage(props: AboutUsPageProps) {
  const aboutUsModel = props.model.aboutUsIntroduction;
  const aboutUsParagraphs = splitToParagraphs(aboutUsModel.aboutUsContent);
  const whyChooseUsParagraphs = splitToParagraphs(aboutUsModel.whyChooseUsContent);
  const ourDifferenceParagraphs = splitToParagraphs(aboutUsModel.ourDifferenceContent);
  const ourCultureParagraphs = splitToParagraphs(aboutUsModel.ourCultureContent);

	// Computed.
	function splitToParagraphs(content: string): string[] {
		return content.split(/\r?\n/);
	}

	return (
		<div className="container p-4 py-5">
			{/* MainContent */}
			<div className="row g-5 justify-content-center">
				<div className="col col-xl-7 col-lg-6 col-md-10 col-12 order-lg-1 order-0">
					<div className="fs-2 text-success mb-2">
            Về chúng tôi
          </div>

					{aboutUsParagraphs.map((paragraph, index) => (
						<p key={index}>{paragraph}</p>
					))}
				</div>

				<div className="col col-xl-5 col-lg-6 col-md-8 col-12 order-lg-0 order-1">
					<img
						src={props.model.aboutUsIntroduction.thumbnailUrl}
						className="w-100 rounded-4 shadow"
						alt="Về chúng tôi"
					/>
				</div>
			</div>

      <div className="row g-5 justify-content-center my-5">
        {/* WhyChooseUsContent */}
        <div className="col col-lg-6 col-md-10 col-12">
          <div className="fs-2 text-success mb-2">
            Tại sao chọn chúng tôi
          </div>

          {whyChooseUsParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      
        {/* OurDifferenceContent */}
        <div className="col col-lg-6 col-md-10 col-12">
          <div className="fs-2 text-success mb-2">
            Sự khác biệt của chúng tôi
          </div>

          {ourDifferenceParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* OurCultureContent */}
        <div className="col col-lg-6 col-md-10 col-12">
          <div className="fs-2 text-success mb-2">
            Văn hoá của chúng tôi
          </div>

          {ourCultureParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

			  {/* Members */}
				<div className="col col-lg-6 col-md-10 col-12">
					<div className="fs-2 text-success mb-2">
            Đội ngũ của chúng tôi
          </div>
				</div>

        {props.model.members.map(member => (
          <div
            className={[
              "col col-xl-5 col-lg-6 col-md-8 col-sm-10 col-12",
              "d-flex flex-column align-items-center"
            ].join(" ")}
            key={member.id}
          >
            <img
              src={member.thumbnailUrl}
              className={`mb-3 shadow ${styles.memberThumbnail}`}
              alt={member.fullName}
            />

            {/* FullName */}
            <span
              className={[
                "fs-4 fw-bold bg-success-subtle border border-success-subtle",
                "rounded text-success px-2 text-success"
              ].join(" ")}
            >
              {member.fullName}
            </span>
            {/* RoleName */}
            <span className="my-2 text-success">{member.roleName}</span>

            {/* Description */}
            {splitToParagraphs(member.description).map((paragraph, index, paragraphs) => (
              <Fragment key={index}>
                {paragraph}
                {index < paragraphs.length - 1 && <br />}
              </Fragment>
            ))}
          </div>
        ))}
      </div>

			{/* Certificates */}
			<div className="row g-5 justify-content-center my-5">
				<div className="col col-md-10 col-12">
					<div className="fs-2 text-success text-center mb-2">
            Chứng chỉ
            </div>
				</div>

        {props.model.certificates.map(certificate => (
          <div className="col col-xl-5 col-md-10 col-12" key={certificate.id}>
            <div className={
              "d-flex flex-column justify-content-stretch " +
              "align-items-stretch rounded-4 shadow overflow-hidden"
            }>
              <img src={certificate.thumbnailUrl} alt={certificate.name} />
              <div className="bg-success p-3 text-center text-white fs-5 fw-bold">
                {certificate.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

AboutUsPage.getLayout = (page: ReactElement): ReactNode => {
  return (
    <FrontPageSubPageLayout title="Về chúng tôi" description="Về chúng tôi">
      {page}
    </FrontPageSubPageLayout>
  );
};