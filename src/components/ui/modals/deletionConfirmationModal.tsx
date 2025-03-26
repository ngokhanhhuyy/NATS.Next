// Shared components.
import BaseModal, { type BaseModalProps } from "./baseModal";

// Props.
type DeletionConfirmationModalProps = {
	onOkButtonClicked?: () => any;
	onCancelButtonClicked?: () => any;
} & Omit<BaseModalProps, "title" | "iconClassName" | "content" | "okButton" | "cancelButton">;

// Component.
export default function DeletionConfirmationModal(props: DeletionConfirmationModalProps) {
	return (
		<BaseModal
			isVisible={props.isVisible}
			title="Xác nhận xoá bỏ"
			iconClassName="bi bi-exclamation-triangle-fill fs-1 text-warning"
			content={[
				"Dữ liệu sau khi xoá có thể sẽ không thể khôi phục lại được.",
			  "Bạn có chắc chắn muốn xoá bỏ?"]}
			cancelButton={{
				className: "btn-secondary",
				text: "Huỷ bỏ",
				onClick: () => {
					props.onCancelButtonClicked?.();
				}
			}}
			okButton={{
				className: "btn-outline-danger",
				text: "Chắc chắn",
				onClick: () => {
					props.onOkButtonClicked?.();
				}
			}}
			onHidden={props.onHidden}
		/>
	);
}