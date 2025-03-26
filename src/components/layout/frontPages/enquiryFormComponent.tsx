import { useState } from "react";
import { createEnquiryAsync } from "@/services/enquiryService";
import { createEnquiryCreateModel } from "@/models/enquiryModels";
import { useModelState } from "@/hooks/modelStateHook";
import { useDirtyModelChecker } from "@/hooks/dirtyModelCheckerHook";
import styles from "./enquiryFormComponent.module.css";

// Form components.
import Form from "@/components/ui/form/form";
import Label from "@/components/ui/form/label";
import TextInput from "@/components/ui/form/textInput";
import TextArea from "@/components/ui/form/textArea";
import ValidationMessage from "@/components/ui/form/validationMessage";
import SubmitButton from "@/components/ui/form/submitButton";

export default function EnquiryForm() {
	// Model and states.
	const [model, setModel] = useState(() => createEnquiryCreateModel());
	const [isSubmissionSucceeded, setIsSubmissionSuceeded] = useState<boolean>(() => false);
	const modelState = useModelState();
	const isModelDirty = useDirtyModelChecker(createEnquiryCreateModel(), model);

	// // Computed.
	// function computeFormClassName(): string {
	// 	return "bg-white rounded-4 shadow p-3 w-100 d-flex flex-column align-items-stretch";
	// }

	// Callback.
	async function submitAsync(): Promise<void> {
		await createEnquiryAsync(model.toRequestDto());
	}

	function handleSucceededSubmission(): void {
		setIsSubmissionSuceeded(true);
	};

	// Template.
	if (isSubmissionSucceeded) {
		return null;
	}

	return (
		<div className="container-fluid bg-success">
			<div className="row justify-content-center p-4 pb-5">
				<div className="col col-xxl-4 col-xl-5 col-lg-6 col-md-7 col-12">
					<div className="mb-3 text-white fs-5 d-flex flex-column">
						<div className="fs-2">Bạn cần tư vấn?</div>
						<span>Hãy gửi câu hỏi cho chúng tôi</span>
						<span className="small opacity-75">
							* Chúng tôi sẽ không chia sẻ thông tin của bạn.
						</span>
					</div>

					<div className="bg-white rounded-4 shadow p-3 w-100">
						{JSON.stringify(modelState.errors)}
						<Form
							className=" d-flex flex-column align-items-stretch"
							modelState={modelState}
							formId="enquiry-form"
							submittingAction={submitAsync}
							onSubmissionSucceeded={handleSucceededSubmission}
							isModelDirty={isModelDirty}
						>
							{/* FullName */}
							<div className="form-group mb-3">
								<div className="form-floating">
									<TextInput
										name="fullName"
										placeholder=""
										maxLength={50}
										value={model.fullName}
										onValueChanged={(fullName) => {
											setModel(model => model.from({ fullName }));
										}}
									/>
									<Label htmlFor="fullName" fontWeightBold={false} required>
										Họ và tên
									</Label>
								</div>
								<ValidationMessage htmlFor="fullName" />
							</div>

							{/* PhoneNumber */}
							<div className="form-group mb-3">
								<div className="form-floating">
									<TextInput
										type="tel"
										name="phoneNumber"
										placeholder=""
										maxLength={15}
										value={model.phoneNumber}
										onValueChanged={(phoneNumber) => {
											setModel(model => model.from({ phoneNumber }));
										}}
									/>
									<Label htmlFor="phoneNumber" fontWeightBold={false} required>
										Số điện thoại
									</Label>
								</div>
								<ValidationMessage htmlFor="phoneNumber" />
							</div>

							{/* Email */}
							<div className="form-group mb-3">
								<div className="form-floating">
									<TextInput
										type="email"
										name="email"
										placeholder=""
										maxLength={255}
										value={model.email}
										onValueChanged={(email) => {
											setModel(model => model.from({ email }));
										}}
									/>
									<Label htmlFor="Email" fontWeightBold={false}>
										Địa chỉ email
									</Label>
								</div>
								<ValidationMessage htmlFor="email" />
							</div>

							{/* Content */}
							<div className="form-group mb-3">
								<div className="form-floating">
									<TextArea
										name="content"
										placeholder=""
										value={model.content}
										onValueChanged={(content) => {
											setModel(model => model.from({ content }));
										}}
									/>
									<Label htmlFor="content" fontWeightBold={false} required>
										Nội dung
									</Label>
								</div>
								<ValidationMessage htmlFor="content" />
							</div>

							{/* Submit */}
							<SubmitButton className={styles.submitButton}>Gửi</SubmitButton>
						</Form>
					</div>
				</div>
			</div>
		</div>
	);
}