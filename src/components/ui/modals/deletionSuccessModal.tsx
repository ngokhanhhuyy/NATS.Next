// Shared components.
import BaseModal, { type BaseModalProps } from "./baseModal";

// Props.
type DeletionSuccessModalProps =
	Omit<BaseModalProps, "title" | "iconClassName" | "content" | "okButton" | "cancelButton">;

// Component.
export default function DeletionSuccessModal(props: DeletionSuccessModalProps) {
	return (
		<BaseModal
			isVisible={props.isVisible}
			title="Xoá thành công"
			iconClassName="bi bi-exclamation-circle-fill fs-1 text-success"
			content="Dữ liệu đã được xoá thành công."
			okButton={{ className: "btn-success", text: "Đã hiểu" }}
			onHidden={props.onHidden}
		/>
	);
}