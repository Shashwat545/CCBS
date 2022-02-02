/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { withFormik, Form, Field } from 'formik';
import './Form.css';

const form_id = 'form_id';
class MaintenanceForm extends Component {
    editOnClick = (event) => {
        event.preventDefault();
        const data = !this?.props?.status?.edit;
        this.props.setStatus({
            edit: data
        });
    };

    cancelOnClick = (event) => {
        event.preventDefault();
        this.props.resetForm();
        this.props.setStatus({
            edit: false
        });
    };

    _renderAction() {
        return (
            <React.Fragment>
                <div className="form-statusbar">
                    {this?.props?.status?.edit ? (
                        <React.Fragment>
                            <button className="save_button" type="submit" form={form_id}>
                                Save
                            </button>
                            <button className="cancel_button" onClick={this.cancelOnClick}>
                                Cancel
                            </button>
                        </React.Fragment>
                    ) : (
                        <button className="edit_button" onClick={this.editOnClick}>
                            Edit
                        </button>
                    )}
                </div>
                <br />
            </React.Fragment>
        );
    }

    _renderFormView = () => {
        return (
            <React.Fragment>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Role:</label>
                    <div className="col-sm-10">
                        <label type="text" name="device_type2" className="role_field">
                            {this?.props?.fields?.role}
                        </label>
                    </div>
                </div>
                <br />
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Name:</label>
                    <div className="col-sm-10">
                        <label type="text" name="name" className="name_field">
                            {this?.props?.fields?.userName}
                        </label>
                    </div>
                </div>
                <br />
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Email:</label>
                    <div className="col-sm-10">
                        <label type="text" name="brand_name" className="email_field">
                            {this?.props?.fields?.emailId}
                        </label>
                    </div>
                </div>
                <br />
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Mobile Number:</label>
                    <div className="col-sm-10">
                        <label type="text" name="device_type" className="mobileNumber_field">
                            {this?.props?.fields?.phoneNo}
                        </label>
                    </div>
                </div>
            </React.Fragment>
        );
    };

    _renderFormInput = () => {
        return (
            <React.Fragment>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <Field type="text" name="name" className="name_input" placeholder="Name" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <Field type="text" name="email" className="email_input" placeholder="Email" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Mobile No</label>
                    <div className="col-sm-10">
                        <Field type="text" name="mobile_no" className="mobileNumber_input" placeholder="Mobile No" />
                    </div>
                </div>
            </React.Fragment>
        );
    };

    render() {
        return (
            <React.Fragment>
                {this._renderAction()}
                <Form id={form_id}>{this?.props?.status?.edit ? this._renderFormInput() : this._renderFormView()}</Form>
            </React.Fragment>
        );
    }
}

const FormikForm = withFormik({
    mapPropsToStatus: (props) => {
        return {
            edit: props?.edit || false
        };
    },
    mapPropsToValues: (props) => {
        return {
            role: props.fields.role,
            name: props.fields.userName,
            email: props.fields.emailId,
            mobile_no: props.fields.phoneNo
        };
    },
    enableReinitialize: true,
    handleSubmit: (values, { props, ...actions }) => {
        props.updateFields(values);
        actions.setStatus({
            edit: false
        });
    }
})(MaintenanceForm);

export default FormikForm;
