import React, {useCallback, useEffect, useRef, useState} from "react";
import {
  getAllApi,
  getAllCategoriesApi,
  saveApi,
  updateApi
} from "../../Service/apiFeedbackService";
import FeedbackList from "./FeedbackList";
import {initialFeedbackForm as initialForm} from "../../types/types";
import * as bootstrap from "bootstrap/dist/js/bootstrap.min.js";
import FeedbackModal from "./FeedbackModal";
import {Link} from "react-router-dom";

const Feedback = () => {
  const [feedbackForm, setFeedbackForm] = useState(initialForm);
  const [feedbacksList, setFeedbacksList] = useState([]);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [feedbackCategory, setFeedbaclCategory] = useState([]);

  const modalRef = useRef(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchFeedbacks();
    fetchAllCategories();
  }, [refresh]);

  const fetchFeedbacks = useCallback(async () => {
    try {
      const data = await getAllApi();
      setFeedbacksList(data);
    } catch (error) {
      setError("Error fetching feedback");
      console.error("Error fetching feedback:", error);
    }
  }, []);

  const fetchAllCategories = useCallback(async () => {
    try {
      const data = await getAllCategoriesApi();
      setFeedbaclCategory(data);
    } catch (error) {
      setError("Error fetching feedback");
      console.error("Error fetching feedback:", error);
    }
  }, []);

  const handleChange = event => {
    const {name, value} = event.target;

    setFeedbackForm(prevFeedbackForm => ({
      ...prevFeedbackForm,
      [name]: value
    }));
  };

  const handleFeedbackSave = async event => {
    event.preventDefault();
    try {
      console.log(feedbackForm);
      feedbackForm.id > 0
        ? await updateApi(feedbackForm)
        : await saveApi(feedbackForm);

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
    setFeedbackForm(initialForm);
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
        Add Feedback
      </button>

      <Link to="/feedback-categories">feedback-categories</Link>
      <Link to="/academic-resource-type">Aca Res Types</Link>

      <FeedbackModal
        feedbackForm={feedbackForm}
        handleFeedbackSave={handleFeedbackSave}
        handleChange={handleChange}
        allCategories={feedbackCategory}
        modalRef={modalRef}
        editMode={editMode}
      />

      <FeedbackList
        feedbacksList={feedbacksList}
        setEditMode={setEditMode}
        setFeedbackForm={setFeedbackForm}
        setFeedbacksList={setFeedbacksList}
        openModal={openModal}
        closeModal={closeModal}
      />
    </div>
  );
};

export default Feedback;
