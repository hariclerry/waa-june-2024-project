import React from "react";

const AcademicResourceTypeModal = props => {
  const {handleOnSave, resourceTypeForm, handleChange, modalRef, editMode} =
    props;

  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      aria-labelledby="artModalLabel"
      aria-hidden="true"
      ref={modalRef}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-info">
            <h5 className="modal-title" id="artModalLabel">
              {editMode ? "Edit" : "Add"} Academic Resource Type
            </h5>
          </div>

          <div className="modal-body">
            <form onSubmit={handleOnSave}>
              <div className="mb-5 text-start fw-bold">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={resourceTypeForm.name}
                  onChange={handleChange}
                  placeholder="Enter Resource Type"
                  required
                />
              </div>

              <div className="modal-footer">
                <button type="submit" className="btn btn-success">
                  {editMode ? "Update" : "Add "}
                </button>

                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicResourceTypeModal;
