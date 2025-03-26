import { useEffect, useRef, type ReactNode } from "react";
import { type Modal as BootstrapModal } from "bootstrap";

type ButtonProps = {
	className?: string;
	text: string;
	onClick?: () => any;
};

export type BaseModalProps = {
	isVisible: boolean;
	title: string;
	iconClassName: string;
	content: string | string[];
	okButton?: ButtonProps;
	cancelButton?: ButtonProps;
	onHidden(): any;
}

export default function BaseModal(props: BaseModalProps) {
	// Dependencies.
	const modalElementRef = useRef<HTMLDivElement | null>(null);
	const modalRef = useRef<BootstrapModal | null>(null);

	// Effect.
	useEffect(() => {
		import("bootstrap").then(({ Modal: BootstrapModal }) => {
			if (modalElementRef.current) {
				modalRef.current = new BootstrapModal(modalElementRef.current);
			}
		});

		return () => {
			modalRef.current?.dispose();
			modalRef.current = null;
		};
	}, []);

	useEffect(() => {
		if (modalRef.current) {
			modalRef.current.show();
		}
	}, [props.isVisible]);

	// Computed.
	function computeContentElement(): ReactNode {
		const sentences = Array.isArray(props.content) ? props.content : [props.content];
		return sentences.map((sentence, index) => (
			<span className="text-start" key={index}>
				{sentence}
			</span>
		));
	}

	function computeOkButtonClassName(): string {
		let className = "btn";
		if (props.okButton?.className) {
			className += ` ${props.okButton.className}`;
		}

		return className;
	}

	function computeCancelButtonClassName(): string {
		let className = "btn ms-2";
		if (props.okButton?.className) {
			className += ` ${props.okButton.className}`;
		}

		return className;
	}

	// Template.
	return (
		<div
			className="modal fade text-center px-2"
			tabIndex={-1}
			data-bs-backdrop="static"
			aria-labelledby="modal-label"
			aria-hidden={!props.isVisible}
		>
			<div className="modal-dialog modal-dialog-centered mx-auto">
				<div className="modal-content">
					{/* Header */}
					<div className="modal-header d-flex flex-row justify-content-between">
						<h1 className="modal-title fs-5" id="modal-label">
							{props.title}
						</h1>

						{props.cancelButton && (
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
								onClick={props.cancelButton.onClick}
							/>
						)}
					</div>

					{/* Body */}
					<div className="modal-body">
						<div className="row px-4">
							<div className="col col-auto pe-3">
								<i className={props.iconClassName}></i>
							</div>
							<div className="col d-flex flex-column justify-content-center align-items-start">
								{computeContentElement()}
							</div>
						</div>
					</div>

					{/* Footer */}
					<div className="modal-footer">
						{/* Cancel button */}
						{props.cancelButton && (
							<button
								className={computeCancelButtonClassName()}
								onClick={() => {
									props.cancelButton?.onClick?.();
									props.onHidden?.();
								}}
							>
								{props.cancelButton.text}
							</button>
						)}

						{/* Ok button */}
						{props.okButton && (
							<button
								className={computeOkButtonClassName()}
								onClick={() => {
									props.okButton?.onClick?.();
									props.onHidden?.();
								}}
							>
								{props.okButton.text}
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
