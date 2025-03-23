import type { GetServerSideProps } from "next";
import Link from "next/link";
import { getContactListAsync } from "@/services/contactService";
import { getGeneralSettingsAsync } from "@/services/generalSettingsService";
import { createContactDetailModel } from "@/models/contactModels";
import { createGeneralSettingsDetailModel } from "@/models/generalSettingsModels";
import { ContactType } from "@/enums/contactType";
import { getHomeRoutePath } from "@/utils/routeUtils";
import styles from "./index.module.css";

// Layout components.
import FrontPageSubPageLayout from "@/components/layout/frontPages/frontPageSubPageLayout";

// Type.
type Model = {
    contacts: ContactDetailModel[];
    generalSettings: GeneralSettingsDetailModel;
};

type ContactPageProps = {
    model: Model;
};

type ContactItemProps = {
    model: ContactDetailModel;
}

// Props.
export const getServerSideProps = (async () => {
    const [contactResponseDtos, generalSettingsResponseDto] = await Promise.all([
        getContactListAsync(),
        getGeneralSettingsAsync()
    ]);

    const model: Model = {
        contacts: contactResponseDtos.map(dto => createContactDetailModel(dto)),
        generalSettings: createGeneralSettingsDetailModel(generalSettingsResponseDto)
    };

    return { props: { model } };
}) satisfies GetServerSideProps<ContactPageProps>;

// Component.
export default function ContactPage(props: ContactPageProps) {
    // Computed.
    const googleMapEncodedUrl = ((): string | null => {
        for (const contact of props.model.contacts) {
            if (contact.type === ContactType.Address) {
                return `https://www.google.com/maps?q=${contact.encodedContent}&output=embed`;
            }
        }
        
        return null;
    })();

    const applicationNameElement = (
        <Link href={getHomeRoutePath()} className={styles.applicationName}>
            {props.model.generalSettings.applicationName}
        </Link>
    );


    return (
        <FrontPageSubPageLayout title="Liên hệ" description="Liên hệ">
            <div className="container-fluid py-5">
                <div className="container">
                    <div className="row gx-5 gy-4 justify-content-center my-5">
                        {/* Paragraph */}
                        <div className="col col-md-10 col-sm-11 col-12">
                            <p className="fs-2 text-success mb-5">
                                Vui lòng liên hệ với chúng tôi để được tư
                                vấn và chăm sóc tận tình.
                            </p>
                            <p>
                                Chúng tôi sẽ lắng nghe và phản hồi mọi thắc mắc
                                của Quý khách trong vòng 24 giờ.
                            </p>
                            <p>
                                Với đội ngũ lương y giàu kinh nghiệm và tận tâm trong lĩnh vực
                                y học cổ truyền, {applicationNameElement} luôn đồng hành cùng
                                Quý khách trên hành trình phục hồi sức khỏe xương khớp, giúp cơ
                                thể dẻo dai và khỏe mạnh theo phương pháp tự nhiên, an toàn.
                            </p>
                        </div>

                        {/* Left/Top flex-column */}
                        <div className="col col-xl-6 col-sm-10 col-12 d-flex flex-column">
                            {googleMapEncodedUrl && (
                                <iframe 
                                    width="100%"
                                    height="100%"
                                    className={`img-thumbnail rounded-4 shadow m-0
                                                ${styles.googleMapFrame}`}
                                    style={{ border: "none" }}
                                    loading="lazy"
                                    allowFullScreen
                                    src={googleMapEncodedUrl}>
                                </iframe>
                            )}
                        </div>

                        {/* Right/Bottom flex-column */}
                        <div className="col col-xl-6 col-sm-10 col-12">
                            <div className="row g-3">
                                {props.model.contacts.map(contact => (
                                    <ContactItem model={contact} key={contact.id} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FrontPageSubPageLayout>
    );
}

function ContactItem(props: ContactItemProps) {
    // Computed.
    const columnClassName = ((): string => {
        if (props.model.type == ContactType.Address) {
            return "col col-12";
        }

        return "col col-xl-6 col-12";
    })();

    function computeGoogleMapEncodedUrl(): string {
        return `https://www.google.com/maps?q=${props.model.encodedContent}`;
    };

    function computeZaloUrl(): string {
        return "https://zalo.me/" + props.model.content;
    };

    return (
        <div className={`d-flex flex-column ${columnClassName} ${styles.contactItem}`}>
            <span className="fw-bold opacity-75">
                <i className={`bi text-success me-2 ${props.model.iconClassName}`} />
                {props.model.typeDisplayName}
            </span>
            
            {props.model.type === ContactType.PhoneNumber && (
                <a href={`tel:${props.model.content}`}>
                    {props.model.content}
                </a>
            )}

            {props.model.type === ContactType.ZaloNumber && (
                <a href={computeZaloUrl()} target="_blank" rel="noopener noreferrer">
                    {props.model.content}
                </a>
            )}

            {props.model.type === ContactType.Email && (
                <a href={`mailto:${props.model.content}`}>
                    {props.model.content}
                </a>
            )}

            {props.model.type === ContactType.Address && (
                <a
                    href={computeGoogleMapEncodedUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {props.model.content}
                </a>
            )}
        </div>
    );
}