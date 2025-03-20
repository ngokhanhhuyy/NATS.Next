import Link from "next/link";
import Image from "next/image";
import { getListAsync as getContactListAsync } from "@/services/contactService";
import { getAsync as getGeneralSettingsAsync } from "@/services/generalSettingsService";
import { ContactType } from "@/enums/contactType";
import { createContactDetailModel } from "@/models/contactModels";
import { createGeneralSettingsDetailModel } from "@/models/generalSettingsModels";
import { getPhotoUrl } from "@/utils/photoUtils";
import * as routeUtils from "@/utils/routeUtils";
import styles from "./footer.module.css";


export default async function Footer() {
    const [contactResponseDtos, generalSettingsResponseDto] = await Promise.all([
        getContactListAsync(),
        getGeneralSettingsAsync()
    ]);

    const contacts = contactResponseDtos.map(dto => createContactDetailModel(dto));
    const generalSettings = createGeneralSettingsDetailModel(generalSettingsResponseDto);

    return (
        <footer className={`container-fluid bg-dark ${styles.footer}`} id="footer">
            <div className="container text-white">
                <div className="row gx-4 gy-5 justify-content-center
                                align-items-stretch px-3 py-5 pb-4">
                    {/* Links - Left/Top column */} 
                    <div className={`col col-xl-2 col-lg-3 col-sm-6 col-12
                                    ${styles.linksColumn}`}>
                        <span className="fw-bold fs-5 opacity-75">
                            Công ty
                        </span>
                
                        {/* SummaryItems */}
                        <Link href={routeUtils.getSummaryItemsRoutePath()}>
                            Giới thiệu
                        </Link>
                        
                        {/* AboutUs */}
                        <Link href={routeUtils.getAboutUsRoutePath()}>
                            Về chúng tôi
                        </Link>
                
                        {/* News */}
                        <a href="#" type="button">
                            Tin tức
                        </a>
                        
                        {/* Contacts */}
                        <Link href={routeUtils.getContactsRoutePath()}>
                            Liên hệ
                        </Link>
                    </div>
                    
                    {/* Links - Right/Bottom column */} 
                    <div className={`col col-xl-2 col-lg-3 col-sm-6 col-12 ${styles.linksColumn}`}>
                        <span className="fw-bold fs-5 opacity-75">
                            Lĩnh vực
                        </span>
                
                        {/* Services */}
                        <Link href={routeUtils.getServiceListRoutePath()}>
                            Dịch vụ
                        </Link>
                        
                        {/* Courses */}
                        <Link href={routeUtils.getCourseListRoutePath()}>
                            Khóa học
                        </Link>
                    </div>

                    {/* Contacts */} 
                    <div className="col col-xl-5 col-lg-6 col-12">
                        <span className="fw-bold fs-5 opacity-75">
                            Liên hệ
                        </span>
                        {contacts.map(contact => <Contact model={contact} key={contact.id} />)}
                    </div>
                    

                    {/* Logo */}
                    <div className="col d-flex flex-column justify-content-center
                                    align-items-center">
                        <div className={`border border-4 rounded-circle d-flex
                                        justify-content-center align-items-center
                                        ${styles.logoContainer}`}
                        >
                            <Image
                                src={getPhotoUrl("/images/main-logo-transparent-white.png")}
                                width={500}
                                height={500}
                                alt="Logo"
                            />
                        </div>
                        
                        <div className="fw-bold fs-5 text-center mt-3 text-white">
                            {generalSettings.applicationName}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function Contact(props: { model: ContactDetailModel }) {
    // Computed.
    function computeZaloUrl(): string {
        return "https://zalo.me/" + props.model.content
            .replaceAll(" ", "")
            .replaceAll("+84", "0");
    }

    function ContactLink() {
        switch (props.model.type) {
            case ContactType.PhoneNumber:
                return (
                    <a href={`tel:${props.model.content}`}>
                        {props.model.content}
                    </a>
                );
            case ContactType.ZaloNumber:
                return (
                    <a href={computeZaloUrl()} target="_blank" rel="noopener noreferrer">
                        {props.model.content}
                    </a>
                );
            case ContactType.Email:
                return (
                    <a href={`mailto:${props.model.content}`}>
                        {props.model.content}
                    </a>
                );
            case ContactType.Address:
                return (
                    <a
                        href={`https://maps.google.com/?q=${props.model.encodedContent}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {props.model.content}
                    </a>
                );
            default:
                return null;
        }
    }

    return (
        <div className="my-2">
            {/* Label */}
            <i className={`bi ${props.model.iconClassName} me-2`}></i>

            {/* Content */}
            <ContactLink />
        </div>
    );
}