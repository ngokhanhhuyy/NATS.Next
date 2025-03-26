import { useContext, type ComponentPropsWithoutRef } from "react";
import { FormContext } from "./form";

type TextArea = {
	name: string;
	value: string;
	onValueChanged: (newValue: string) => void;
} & ComponentPropsWithoutRef<"textarea">

function TextArea(props: TextArea) {

	// Dependencies.
	const formContext = useContext(FormContext);
	const modelState = formContext?.modelState;

	// Memo.
	const computeClassName = () => {
		const classNames = ["form-control", props.className];
		if (props.name) {
			classNames.push(modelState?.inputClassName(props.name) ?? "");
		}

		return classNames.filter((name) => name != null).join(" ");
	};

	return (
		<textarea
			{...props}
			className={computeClassName()}
			name={props.name}
			style={{ minHeight: 200 }}
			placeholder={props.placeholder}
			value={props.value}
			onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
				props.onValueChanged?.(event?.target.value);
			}}
		/>
	);
}

export default TextArea;
