import React, {useCallback, useEffect, useRef, useState} from "react";
import {
  getAllApi,
  saveApi,
  updateApi
} from "../../Service/apiAcademicResourceTypes";
import {initialAcademicResourceTypeForm as initialForm} from "../../types/types";
import * as bootstrap from "bootstrap/dist/js/bootstrap.min.js";
import {Link} from "react-router-dom";
import AcademicResourceTypeModal from "./AcademicResourceTypeModal";
import AcademicResourceTypeList from "./AcademicResourceTypeList";

const AcademicResourceType = () => {
  const [resourceTypeForm, setResourceTypeForm] = useState(initialForm);
  const [resourceTypesList, setResourceTypesList] = useState([]);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const modalRef = useRef(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchAcademicResourceTypes();
  }, [refresh]);

  const fetchAcademicResourceTypes = useCallback(async () => {
    try {
      const data = await getAllApi();
      setResourceTypesList(data);
    } catch (error) {
      setError("Error fetching academicresourcetype");
      console.error("Error fetching academicresourcetype:", error);
    }
  }, []);

  const handleChange = event => {
    const {name, value} = event.target;

    setResourceTypeForm(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleOnSave = async event => {
    event.preventDefault();
    console.log(resourceTypeForm);
    console.log(editMode);
    try {
      if (editMode) await updateApi(resourceTypeForm);
      else await saveApi(resourceTypeForm);

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
      setError("Error saving academicresourcetypecategory");
    }
  };

  const resetForm = () => {
    setResourceTypeForm(initialForm);
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
        Add AcademicResourceType
      </button>
      <Link to="/academicresourcetype-categories">
        Aca resourcetype-categories
      </Link>
      <Link to="/academic">Aca resource</Link>

      <AcademicResourceTypeModal
        resourceTypeForm={resourceTypeForm}
        handleOnSave={handleOnSave}
        handleChange={handleChange}
        modalRef={modalRef}
        editMode={editMode}
      />
      <AcademicResourceTypeList
        resourceTypesList={resourceTypesList}
        setEditMode={setEditMode}
        setResourceTypeForm={setResourceTypeForm}
        setResourceTypesList={setResourceTypesList}
        openModal={openModal}
        closeModal={closeModal}
      />
    </div>
  );
};

export default AcademicResourceType;
