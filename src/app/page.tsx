import * as authenticationService from "@/services/authenticationService";
import styles from "./page.module.css";
import TestingAuthenticationComponent from "@/components/frontPages/home/testingAuthentication";

export default async function Home() {
    const isAuthenticated = await authenticationService.checkAuthenticationStatusAsync();
    return (
        <div className={styles.page}>
            <span>{isAuthenticated}</span>
            <TestingAuthenticationComponent />
        </div>
    );
}