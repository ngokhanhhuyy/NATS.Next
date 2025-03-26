import type { ReactElement, ReactNode } from "react";
import { getAboutUsIntroductionAsync } from "@/services/aboutUsIntroductionService";
import { getMemberListAsync } from "@/services/memberService";
import { getCertificateListAsync } from "@/services/certificateService";
import { createAboutUsIntroductionDetailModel } from "@/models/aboutUsIntroductionModels";
import { createMemberDetailModel } from "@/models/memberModels";
import { createCertificateDetailModel } from "@/models/certificateModels";

// Layout components.
import FrontPageSubPageLayout from "@/components/layout/frontPages/frontPageSubPageLayout";

// Child components.
import Content from "./contentComponent";
import MemberList from "./memberListComponent";
import CertificateList from "./certificateListComponent";

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
	return (
		<div className="container p-4 py-5">
			<div className="row g-5 justify-content-center">
				<div className="col col-xl-6 col-lg-7 col-md-8 col-12 order-lg-0 order-1">
					<img
						src={props.model.aboutUsIntroduction.thumbnailUrl}
						className="w-100 rounded-4 shadow"
						alt="Về chúng tôi"
					/>
				</div>
			</div>

      <div className="row gx-5 gy-3 justify-content-center">
			  {/* AboutUsContent */}
        <Content
          model={props.model.aboutUsIntroduction.aboutUsContent}
          title="Về chúng tôi"
        />
        
        {/* WhyChooseUsContent */}
        <Content
          model={props.model.aboutUsIntroduction.whyChooseUsContent}
          title="Tại sao chọn chúng tôi"
        />
      
        {/* OurDifferenceContent */}
        <Content
          model={props.model.aboutUsIntroduction.ourDifferenceContent}
          title="Sự khác biệt của chúng tôi"
        />

        {/* OurCultureContent */}
        <Content
          model={props.model.aboutUsIntroduction.ourCultureContent}
          title="Văn hoá của chúng tôi"
        />
      </div>

      {/* Members */}
      <div className="row gx-5 gy-3 justify-content-center mt-2">
				<MemberList model={props.model.members} />
      </div>

			<CertificateList model={props.model.certificates} />
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