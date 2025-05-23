import { useContext, useMemo } from "react";
import type { ChangeEvent, ComponentPropsWithoutRef } from "react";
import { FormContext } from "./form";

type TextInputProps = {
	type?: "text" | "number" | "tel" | "email" | "url";
	regex?: string;
	value: string;
	onValueChanged: (newValue: string) => void;
} & ComponentPropsWithoutRef<"input">;

function TextInput(props: TextInputProps) {
	const { className, type, regex, name, value, onValueChanged, disabled, ...rest } = props;

	// Dependency.
	const formContext = useContext(FormContext);
	const modelState = formContext?.modelState;
	const isLoading = useMemo(() => {
		return formContext?.isSubmitting || formContext?.isDeleting;
	}, [formContext?.isSubmitting, formContext?.isDeleting]);

	// Computed.
	const getComputedClassName = () => {
		const classNames: (string | null | undefined)[] = ["form-control", className];
		if (name && !disabled && modelState?.inputClassName(name)) {
			classNames.push(modelState.inputClassName(name));
		}

		return classNames.filter((name) => name != null).join(" ");
	};

	// Callback.
	const handleInput = (event: ChangeEvent<HTMLInputElement>): void => {
		const inputElement = event.target;
		const value = inputElement.value;

		if (regex != null) {
			inputElement.value = value.replace(new RegExp(`[^${regex}]`, "g"), "");
		}

		if (type === "tel") {
			inputElement.value = value.replace(new RegExp("[^$0-9_]", "g"), "");
		}

		if (type === "email") {
			inputElement.value = value.replace(/[^$a-zA-Z0-9!#%&'*+/=?^_`{|}~@.\\-]/g, "");
		}

		onValueChanged?.(inputElement.value);
	};

	return (
		<input
			{...rest}
			className={getComputedClassName()}
			type={type}
			name={name}
			placeholder={isLoading ? "" : props.placeholder}
			value={isLoading ? "" : value}
			onChange={handleInput}
		/>
	);
}

export default TextInput;
