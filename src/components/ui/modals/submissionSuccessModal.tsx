// Shared components.
import BaseModal, { type BaseModalProps } from "./baseModal";

// Props.
type SubmissionSuccessModalProps =
	Omit<BaseModalProps, "title" | "iconClassName" | "content" | "okButton" | "cancelButton">;

// Component.
export default function SubmissionSuccessModal(props: SubmissionSuccessModalProps) {
	return (
		<BaseModal
			isVisible={props.isVisible}
			title="Lưu thành công"
			iconClassName="bi bi-exclamation-circle-fill fs-1 text-success"
			content="Dữ liệu đã được lưu thành công."
			okButton={{ className: "btn-success", text: "Xác nhận" }}
			onHidden={props.onHidden}
		/>
	);
}