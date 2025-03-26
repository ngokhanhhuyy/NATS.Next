// Shared components.
import BaseModal, { type BaseModalProps } from "./baseModal";

// Props.
type NotFoundModalProps =
	Omit<BaseModalProps, "title" | "iconClassName" | "content" | "okButton" | "cancelButton">;

// Component.
export default function NotFoundModal(props: NotFoundModalProps) {
	return (
		<BaseModal
			isVisible={props.isVisible}
			title="Không tìm thấy dữ liệu"
			iconClassName="bi bi-x-octagon-fill fs-1 text-danger"
			content={["Dữ liệu bạn yêu cầu đã bị xoá hoặc không tồn tại.", "Vui lòng kiểm tra lại."]}
			okButton={{ className: "btn-secondary", text: "Quay lại trang chủ" }}
			onHidden={props.onHidden}
		/>
	);
}