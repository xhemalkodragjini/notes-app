import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Alert from "react-bootstrap/Alert";
import "./NoteForm.css";

export default function NoteForm(props) {
  const formik = useFormik({
    initialValues: props.initialValues,
    validationSchema: Yup.object().shape({
      title: Yup.string()
        .max(20, "Title must have less than 20 characters")
        .required("Title is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      props.handleSubmittedNote(formik.values);
      resetForm({ values: "" });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="div">
        <input
          name="title"
          type="text"
          placeholder="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
        />
      </div>
      <div className="div">
        {formik.errors.title ? (
          <Alert color="danger">{formik.errors.title}</Alert>
        ) : (
          ""
        )}
      </div>
      <div className="div">
        <select
          name="category"
          placeholder="Category"
          onChange={formik.handleChange}
          value={formik.values.category}
          disabled={props.disabled}
        >
          <option value="General">General</option>
          <option value="Statistics">Statistics</option>
          <option value="Data Mining">Data Mining</option>
          <option value="Deep Learning">Deep Learning</option>
        </select>
      </div>
      <div className="div">
        <textarea
          name="description"
          type="text"
          placeholder="Description"
          onChange={formik.handleChange}
          value={formik.values.description}
          rows="4"
          cols="50"
        />
      </div>

      <button type="submit" onClick={formik.handleSubmit}>
        Submit
      </button>
      <button type="button" onClick={formik.resetForm}>
        Reset
      </button>
      <button type="button" onClick={props.handleCancel}>
        Cancel
      </button>
    </form>
  );
}
