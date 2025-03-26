// Shared components.
import BaseModal, { type BaseModalProps } from "./baseModal";

// Props.
type AuthorizationErrorModalProps =
	Omit<BaseModalProps, "title" | "iconClassName" | "content" | "okButton" | "cancelButton">;

// Component.
export default function AuthorizationErrorModal(props: AuthorizationErrorModalProps) {
	return (
		<BaseModal
			isVisible={props.isVisible}
			title="Không đủ quyền truy cập"
			iconClassName="bi bi-x-octagon-fill fs-1 text-danger"
			content="Bạn không đủ quyền hạn để truy cập trang này."
			okButton={{ className: "btn-secondary", text: "Quay lại trang chủ" }}
			onHidden={props.onHidden}
		/>
	);
}