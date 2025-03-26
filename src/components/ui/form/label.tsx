import type { ComponentPropsWithoutRef } from "react";

type LabelProps = {
	required?: boolean;
	fontWeightBold?: boolean;
} & ComponentPropsWithoutRef<"label">;

const Label = (props: LabelProps) => {
	const getComputedClassName = (): string => {
		let className = "form-label small";
		if (props.required) {
			className += " required";
		}

		if (props.fontWeightBold == null || props.fontWeightBold) {
			className += " fw-bold";
		}

		return className;
	};

	return <label className={getComputedClassName()}>{props.children}</label>;
};

export default Label;