import { useState, useEffect, useContext } from "react";
import { ReactNode, ComponentPropsWithoutRef } from "react";

// Form component.
import { FormContext } from "./form";

// Props.
type SubmitButtonProps = {
	children?: ReactNode | ReactNode[];
} & Omit<ComponentPropsWithoutRef<"button">, "type">;

// Component.
const SubmitButton = ({ children }: SubmitButtonProps) => {
	const formContext = useContext(FormContext);

	// States.
	const [isMounted, setIsMounted] = useState(() => false);

	// Effect.
	useEffect(() => {
		setIsMounted(true);
	}, []);

	// Computed.
	const isDisabled =
		!isMounted ||
		formContext?.isSubmitting ||
		formContext?.isDeleting ||
		(formContext && !formContext.isModelDirty);

	return (
		<button type="submit" className="btn btn-primary" disabled={!!isDisabled}>
			{children ?? (
				<>
					<i className="bi bi-floppy mx-2" />
					<span className="me-2">Lưu</span>
				</>
			)}
		</button>
	);
};

export default SubmitButton;
