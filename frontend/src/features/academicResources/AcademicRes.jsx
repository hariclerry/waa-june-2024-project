import React, {useCallback, useEffect, useRef, useState} from "react";
import {
  getAllApi,
  getAllCategoriesApi,
  saveApi,
  updateApi
} from "../../Service/apiAcademicResource";
import AcademicResList from "./AcademicResList";
import {initialAcademicForm as initialForm} from "../../types/types";
import * as bootstrap from "bootstrap/dist/js/bootstrap.min.js";
import AcademicResModal from "./AcademicResModal";
import {Link} from "react-router-dom";

const AcademicRes = () => {
  const [academicResForm, setAcademicResForm] = useState(initialForm);
  const [academicResourceList, setAcademicResourceList] = useState([]);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [resCategory, setResCategory] = useState([]);
  const [formAction, setFormAction] = useState("");
  const modalRef = useRef(null);
  const [editMode, setEditMode] = useState("");

  useEffect(() => {
    fetchAcademicResource();
    fetchAllCategories();
  }, [refresh]);

  const fetchAcademicResource = useCallback(async () => {
    try {
      const data = await getAllApi();
      console.log(data);
      setAcademicResourceList(data);
    } catch (error) {
      setError("Error fetching academicres");
    }
  }, []);

  const fetchAllCategories = useCallback(async () => {
    try {
      const data = await getAllCategoriesApi();
      console.log("fetchAllCategories==");
      console.log(data);

      setResCategory(data);
    } catch (error) {
      setError("Error fetching academicres");
    }
  }, []);

  const handleChange = event => {
    const {name, value, files} = event.target;
    if (name === "file") {
      setAcademicResForm(prevFormData => ({
        ...prevFormData,
        file: files[0]
      }));
    } else {
      setAcademicResForm(prevFormData => ({
        ...prevFormData,
        [name]: value
      }));
    }
  };

  const handleAcademicResSave = async event => {
    event.preventDefault();
    try {
      if (editMode == "Edit") {
        await updateApi(academicResForm);
      } else {
        await saveApi(academicResForm);
      }

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
      setError("Error saving academicrescategory");
    }
  };

  const resetForm = () => {
    setAcademicResForm(initialForm);
    setError(null);
  };

  const openModal = action => {
    setEditMode(action);
    setFormAction(action);
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
    resetForm();
  };

  return (
    <div className="container">
      {error && <div className="alert alert-danger mt-2">{error}</div>}

      <button
        type="button"
        className="btn btn-primary mt-3"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        onClick={() => openModal("Add")}
      >
        Add Academic Resource
      </button>

      <Link to="/academic-resource-type">Aca Res Types</Link>

      <AcademicResModal
        academicResForm={academicResForm}
        handleAcademicResSave={handleAcademicResSave}
        handleChange={handleChange}
        allCategories={resCategory}
        modalRef={modalRef}
        formAction={formAction}
        editMode={editMode}
      />

      <AcademicResList
        academicResourceList={academicResourceList}
        setEditMode={setEditMode}
        setAcademicForm={setAcademicResForm}
        setAcademicResourceList={setAcademicResourceList}
        openModal={openModal}
        closeModal={closeModal}
      />
    </div>
  );
};

export default AcademicRes;
