"use client";
import { useState, useEffect } from "react";
import { createEnquiryCreateModel } from "@/models/enquiryModels";
import styles from "./enquiryFormComponent.module.css";

export default function EnquiryForm() {
    // Model and states.
    const [model, setModel] = useState(() => createEnquiryCreateModel());
    const [isMounted, setMounted] = useState(() => false);

    // Effect.
    useEffect(() => {
        setMounted(true);
    }, []);

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

                    <div id="vue-app">
                        <form
                            className="bg-white rounded-4 shadow p-3 w-100
                                    d-flex flex-column align-items-stretch"
                            action="#"
                            id="enquiry-form"
                        >
                            {/* FullName */}
                            <div className="form-group mb-3">
                                <div className="form-floating required">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="UserName"
                                        name="UserName"
                                        placeholder=""
                                        maxLength={50}
                                        value={model.fullName}
                                        onChange={event => {
                                            setModel(model => model.from({
                                                fullName: event.target.value
                                            }));
                                        }}
                                    />
                                    <label className="required" htmlFor="UserName">
                                        Họ và tên
                                    </label>
                                </div>
                            </div>

                            {/* PhoneNumber */}
                            <div className="form-floating mb-3">
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="PhoneNumber"
                                    name="PhoneNumber"
                                    placeholder=""
                                    maxLength={15}
                                    value={model.phoneNumber}
                                    onChange={event => {
                                        setModel(model => model.from({
                                            phoneNumber: event.target.value
                                        }));
                                    }}
                                />
                                <label className="required" htmlFor="PhoneNumber">
                                    Số điện thoại
                                </label>
                            </div>

                            {/* Email */}
                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="Email"
                                    name="Email"
                                    placeholder=""
                                    maxLength={255}
                                    value={model.email}
                                    onChange={event => {
                                        setModel(model => model.from({
                                            email: event.target.value
                                        }));
                                    }}
                                />
                                <label htmlFor="Email">Địa chỉ email</label>
                            </div>

                            {/* Content */}
                            <div className="form-floating mb-3">
                                <textarea
                                    className="form-control"
                                    id="Content"
                                    name="Content"
                                    style={{ minHeight: 200 }}
                                    placeholder=""
                                    value={model.content}
                                    onChange={event => {
                                        setModel(model => model.from({
                                            content: event.target.value
                                        }));
                                    }}
                                ></textarea>
                                <label className="required" htmlFor="Content">
                                    Nội dung
                                </label>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className={`btn btn-outline-success text-success
                                            align-self-end ${styles.submitButton}`}
                                disabled={!isMounted}
                            >
                                Gửi
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}