import { useRef, useState, useMemo, useCallback } from "react";
import { createContext } from "react";
import type { ReactNode, ComponentPropsWithoutRef, KeyboardEvent, FormEvent } from "react";
import type { IModelState } from "@/hooks/modelStateHook";
import {
	AuthorizationError,
	DuplicatedError,
	NotFoundError,
	OperationError,
	ValidationError,
} from "@/errors";

// Modal components.
import SubmissionSuccessModal from "@/components/ui/modals/submissionSuccessModal";
import SubmimssionErrorModal from "@/components/ui/modals/submissionErrorModal";
import DeletionConfirmationModal from "@/components/ui/modals/deletionConfirmationModal";
import DeletionSuccessModal from "@/components/ui/modals/deletionSuccessModal";
import NotFoundModal from "@/components/ui/modals/notFoundModal";
import AuthorizationErrorModal from "@/components/ui/modals/authorizationErrorModal";

// Type.
type DisplayingModal =
	| "submissionSuccess"
	| "submissionError"
	| "deletionConfirmation"
	| "deletionSuccess"
	| "notFound"
	| "authorizationError";

// Context
export interface FormContext {
	formId: string | null;
	isSubmitting: boolean;
	isDeleting: boolean;
	delete: () => void;
	modelState: IModelState | null;
	isModelDirty: boolean;
}

export const FormContext = createContext<FormContext | null>(null);

// Props.
export type FormProps<TSubmissionResult> = {
	children: ReactNode | ReactNode[];
	modelState?: IModelState;
	formId?: string;
	disabled?: boolean;
	submittingAction: () => Promise<TSubmissionResult>;
	onSubmissionSucceeded: (submissionResult: TSubmissionResult) => any;
	submissionSucceededModal?: boolean;
	deletingAction?: () => Promise<void>;
	onDeletionSucceeded?: () => any;
	deletionSucceededModal?: boolean;
	isModelDirty: boolean;
	row?: boolean;
	gutter?: number;
	justifyContentEnd?: boolean;
} & Omit<ComponentPropsWithoutRef<"form">, "action">;

// Component.
const Form = <TSubmissionResult,>(props: FormProps<TSubmissionResult>) => {
	const {
		modelState,
		isModelDirty,
		submittingAction,
		onSubmissionSucceeded,
		deletingAction,
		onDeletionSucceeded,
	} = props;
	const submissionSucceededModal = props.submissionSucceededModal ?? true;
	const deletionSucceededModal = props.deletionSucceededModal ?? true;

	// State.
	const [isSubmitting, setSubmitting] = useState<boolean>(() => false);
	const [isDeleting, setDeleting] = useState<boolean>(() => false);
	const [displayingModal, setDisplayingModal] = useState<DisplayingModal | null>(() => null);
	const submissionResult = useRef<TSubmissionResult | null>(null);

	// Memo.
	const contextValue = useMemo<FormContext>(
		() => ({
			formId: props.id ?? null,
			isSubmitting,
			isDeleting,
			delete: async () => await showDeletionConfirmationModal(),
			modelState: modelState ?? null,
			isModelDirty: isModelDirty,
		}),
		[props.id, isSubmitting, isDeleting, props.modelState],
	);

	// Computed.
	const computeClassName = () => {
		const names: (string | number | boolean | undefined)[] = [
			props.className,
			props.row && "row",
			props.gutter && `g-${props.gutter}`,
			props.justifyContentEnd && "justify-content-end",
			(isSubmitting || isDeleting || props.disabled) && "pe-none opacity-50",
		];

		return names.filter((n) => n != null).join(" ");
	};

	const computeTabIndex = (): number | undefined => {
		if (isSubmitting || isDeleting) {
			return -1;
		}
	};

	// Callbacks.
	const handleSubmissionAsync = async (event?: FormEvent<HTMLFormElement>) => {
		event?.preventDefault();

		if (!submittingAction) {
			return;
		}

		setSubmitting(true);

		try {
			const submissionResult = await submittingAction();
			modelState?.clearErrors();
			if (submissionSucceededModal ?? true) {
				setDisplayingModal("submissionSuccess");
			}

			await onSubmissionSucceeded(submissionResult);
		} catch (error) {
			const isValidationError = error instanceof ValidationError;
			const isOperationError = error instanceof OperationError;
			const isDuplicatedError = error instanceof DuplicatedError;
			if (isValidationError || isOperationError || isDuplicatedError) {
				modelState?.setErrors(error.errors);
				setDisplayingModal("submissionError");
				return;
			}

			if (error instanceof AuthorizationError) {
				setDisplayingModal("authorizationError");
				return;
			}

			throw error;
		} finally {
			setSubmitting(false);
		}
	};

	const showDeletionConfirmationModal = useCallback(async () => {
		if (!deletingAction) {
			return;
		}

		setDisplayingModal("deletionConfirmation");
	}, [deletingAction]);

	const deleteAsync = useCallback(async () => {
		if (!deletingAction) {
			return;
		}

		setDeleting(true);

		try {
			await deletingAction();
			modelState?.clearErrors();
			setDisplayingModal("deletionSuccess");
		} catch (error) {
			if (error instanceof NotFoundError) {
				setDisplayingModal("notFound");
				return;
			}

			if (error instanceof OperationError) {
				modelState?.setErrors(error.errors);
				setDisplayingModal("submissionError");
				return;
			}

			if (error instanceof AuthorizationError) {
				setDisplayingModal("authorizationError");
				return;
			}

			throw error;
		} finally {
			setDeleting(false);
		}
	}, [onDeletionSucceeded, deletionSucceededModal]);

	const handleKeyPress = useCallback((event: KeyboardEvent<HTMLFormElement>) => {
		if (event.key === "Enter") {
			event.preventDefault();
		}
	}, []);

	return (
		<FormContext.Provider value={contextValue}>
			<form
				className={computeClassName()}
				id={props.id}
				tabIndex={computeTabIndex()}
				onKeyDown={handleKeyPress}
				onSubmit={handleSubmissionAsync}
			>
				{props.children}
			</form>

			{/* Modals */}
			<SubmissionSuccessModal
				isVisible={displayingModal === "submissionSuccess"}
				onHidden={() => {
					setDisplayingModal(null);
					props.onSubmissionSucceeded(submissionResult.current!);
				}}
			/>
			
			<SubmimssionErrorModal
				isVisible={displayingModal === "submissionError"}
				onHidden={() => setDisplayingModal(null)}
			/>

			<DeletionConfirmationModal
				isVisible={displayingModal === "deletionConfirmation"}
				onOkButtonClicked={deleteAsync}
				onHidden={() => setDisplayingModal(null)}
			/>

			<DeletionSuccessModal
				isVisible={displayingModal === "deletionConfirmation"}
				onHidden={() => {
					setDisplayingModal(null);
					props.onDeletionSucceeded?.();
				}}
			/>
			
			<NotFoundModal
				isVisible={displayingModal === "notFound"}
				onHidden={() => setDisplayingModal(null)}
			/>

			<AuthorizationErrorModal
				isVisible={displayingModal === "authorizationError"}
				onHidden={() => setDisplayingModal(null)}
			/>
		</FormContext.Provider>
	);
};

export default Form;
