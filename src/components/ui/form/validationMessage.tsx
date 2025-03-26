import { useMemo, useContext } from "react";
import { FormContext } from "./form";

interface ValidationMessageProps {
	htmlFor: string;
}

function ValidationMessage(props: ValidationMessageProps) {
	// Depdencies.
	const formContext = useContext(FormContext);
	const modelState = useMemo(() => formContext?.modelState, [formContext?.modelState]);

	// Computed.
	const message = modelState?.getMessage(props.htmlFor) ?? "";
	const className = modelState?.messageClass(props.htmlFor) ?? undefined;
	const style = { display: modelState?.isValidated ? "inline" : "none" };

	return (
		<span className={className} style={style}>
			{message}
		</span>
	);
}

export default ValidationMessage;