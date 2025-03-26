// Shared components.
import BaseModal, { type BaseModalProps } from "./baseModal";

// Props.
type SubmissionErrorModalProps =
	Omit<BaseModalProps, "title" | "iconClassName" | "content" | "okButton" | "cancelButton">;

// Component.
export default function SubmissionErrorModal(props: SubmissionErrorModalProps) {
	return (
		<BaseModal
			isVisible={props.isVisible}
			title="Dữ liệu không hợp lệ"
			iconClassName="bi bi-x-octagon-fill fs-1 text-danger"
			content={["Dữ liệu đã nhập không hợp lệ.", "Vui lòng kiểm tra lại."]}
			okButton={{ className: "btn-secondary", text: "Đã hiểu" }}
			onHidden={props.onHidden}
		/>
	);
}