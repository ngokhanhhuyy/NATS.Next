import { Fragment } from "react";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getAboutUsIntroductionAsync } from "@/services/aboutUsIntroductionService";
import { getMemberListAsync } from "@/services/memberService";
import { getCertificateListAsync } from "@/services/certificateService";
import { createAboutUsIntroductionDetailModel } from "@/models/aboutUsIntroductionModels";
import { createMemberDetailModel } from "@/models/memberModels";
import { createCertificateDetailModel } from "@/models/certificateModels";
import styles from "./index.module.css";

// Layout components.
import FrontPageSubPageLayout from "../frontPageSubPageLayout";

// Type.
type Model = {
    aboutUsIntroduction: AboutUsIntroductionDetailModel,
    members: MemberDetailModel[],
    certificates: CertificateDetailModel[]
};

// Props.
export const getServerSideProps = (async () => {
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
}) satisfies GetServerSideProps<{ model: Model }>;

// Component.
export default function AboutUs(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
        <FrontPageSubPageLayout title="Về chúng tôi">
            <div className="container p-5">
                {/* MainContent */}
                <div className="row g-5 justify-content-center">
                    <div className="col col-md-10 col-12">
                        <div className="fs-2 text-success text-center mb-4">
                            Về chúng tôi
                        </div>

                        {aboutUsParagraphs.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>

                    
                    <div className="col col-md-10 col-12">
                        <img
                            src={props.model.aboutUsIntroduction.thumbnailUrl}
                            className="w-100 rounded-4 shadow"
                            alt="Về chúng tôi"
                        />
                    </div>
                </div>

                {/* WhyChooseUsContent */}
                <div className="row g-5 justify-content-center my-5">
                    <div className="col col-md-10 col-12">
                        <div className="fs-2 text-success text-center mb-4">
                            Tại sao chọn chúng tôi
                        </div>
                        
                        {whyChooseUsParagraphs.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </div>

                {/* OurCultureContent */} 
                <div className="row g-5 justify-content-center my-5">
                    <div className="col col-md-10 col-12">
                        <div className="fs-2 text-success text-center mb-4">
                            Sự khác biệt của chúng tôi
                        </div>
                        
                        {ourDifferenceParagraphs.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </div>

                {/* OurCultureContent */} 
                <div className="row g-5 justify-content-center my-5">
                    <div className="col col-md-10 col-12">
                        <div className="fs-2 text-success text-center mb-4">
                            Văn hoá của chúng tôi
                        </div>
                        
                        {ourCultureParagraphs.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </div>

                {/* Members */}
                <div className="row g-5 justify-content-center my-5">
                    <div className="col col-md-10 col-12">
                        <div className="fs-2 text-success text-center mb-2">
                            Đội ngũ của chúng tôi
                        </div>
                    </div>

                    {props.model.members.map(member => (
                        <div
                            className="col col-xl-5 col-lg-6 col-md-8 col-sm-10 col-12
                                        d-flex flex-column align-items-center"
                            key={member.id}
                        >
                            <img
                                src={member.thumbnailUrl}
                                className={`rounded-circle flex-shrink-0 mb-3 shadow
                                            ${styles.memberThumbnail}`}
                                alt={member.fullName}
                            />

                            {/* FullName */}
                            <span className="fs-4 fw-bold bg-success-subtle border
                                            border-success-subtle rounded
                                            text-success px-2 text-success">
                                {member.fullName}
                            </span>

                            {/* RoleName */}
                            <span className="my-2 text-success">
                                {member.roleName}
                            </span>

                            {/* Description */}
                            {splitToParagraphs(member.description)
                                .map((paragraph, index, paragraphs) => (
                                    <Fragment key={index}>
                                        {paragraph}
                                        {index < paragraphs.length - 1 && <br/>}
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
                            <div className="d-flex flex-column justify-content-stretch
                                        align-items-stretch rounded-4 shadow overflow-hidden">
                                <img src={certificate.thumbnailUrl} alt={certificate.name} />
                                <div className="bg-success p-3 text-center
                                                text-white fs-5 fw-bold">
                                    {certificate.name}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </FrontPageSubPageLayout>
    );
}