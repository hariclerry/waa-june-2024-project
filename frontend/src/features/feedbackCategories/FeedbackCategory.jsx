import React, {useCallback, useEffect, useRef, useState} from "react";
import {getAllApi, saveApi} from "../../Service/apiFeedbackCategory";
import FeedbackCategoryList from "./FeedbackCategoryList";
import {initialFeedbackCategoryForm as initialForm} from "../../types/types";
import * as bootstrap from "bootstrap/dist/js/bootstrap.min.js";
import FeedbackCategoryModal from "./FeedbackCategoryModal";
import {Link} from "react-router-dom";

const FeedbackCategory = () => {
  const [feedbackCategoryForm, setFeedbackCategoryForm] = useState(initialForm);
  const [feedbackCategorysList, setFeedbackCategorysList] = useState([]);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const modalRef = useRef(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchFeedbackCategorys();
  }, [refresh]);

  const fetchFeedbackCategorys = useCallback(async () => {
    try {
      const data = await getAllApi();
      setFeedbackCategorysList(data);
    } catch (error) {
      setError("Error fetching feedbackcategorys");
      console.error("Error fetching feedbackcategorys:", error);
    }
  }, []);

  const handleChange = event => {
    const {name, value} = event.target;

    setFeedbackCategoryForm(prevFeedbackCategoryForm => ({
      ...prevFeedbackCategoryForm,
      [name]: value
    }));
  };

  const handleFeedbackCategorySave = async event => {
    event.preventDefault();
    try {
      const data = await saveApi(feedbackCategoryForm);
      setRefresh(!refresh);

      if (modalRef.current) {
        const modalElement = modalRef.current;
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        const backdrop = document.querySelector(".modal-backdrop");
        if (backdrop) {
          backdrop.remove();
          modalInstance.hide();
        }
      }
      resetForm();
    } catch (error) {
      setError("Error saving feedbackcategory");
    }
  };

  const resetForm = () => {
    setFeedbackCategoryForm(initialForm);
    setError(null);
  };

  const openModal = (editMode = false) => {
    setEditMode(editMode);
    if (modalRef.current) {
      const modalElement = modalRef.current;
      let bootstrapModal = bootstrap.Modal.getInstance(modalElement);
      if (!bootstrapModal) {
        bootstrapModal = new bootstrap.Modal(modalElement);
      }
      bootstrapModal.show();
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      const modalElement = modalRef.current;
      const bootstrapModal = bootstrap.Modal.getInstance(modalElement);
      if (bootstrapModal) {
        bootstrapModal.hide();
      }
    }
  };

  return (
    <div className="container">
      {error && <div className="alert alert-danger mt-2">{error}</div>}

      <button
        type="button"
        className="btn btn-primary mt-3"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        onClick={() => openModal()}
      >
        Add Feedback Category
      </button>

      <Link to="/feedbacks">Feedback</Link>

      <FeedbackCategoryModal
        feedbackCategoryForm={feedbackCategoryForm}
        handleFeedbackCategorySave={handleFeedbackCategorySave}
        handleChange={handleChange}
        modalRef={modalRef}
        editMode={editMode}
      />

      <FeedbackCategoryList
        feedbackCategorysList={feedbackCategorysList}
        setEditMode={setEditMode}
        setFeedbackCategoryForm={setFeedbackCategoryForm}
        setFeedbackCategorysList={setFeedbackCategorysList}
        openModal={openModal}
        closeModal={closeModal}
      />
    </div>
  );
};

export default FeedbackCategory;
