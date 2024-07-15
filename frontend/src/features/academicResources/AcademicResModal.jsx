import React from "react";

const AcademicResModal = props => {
  const {
    handleAcademicResSave,
    academicResForm,
    allCategories,
    handleChange,
    modalRef,
    editMode
  } = props;

  console.log(editMode);

  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      aria-labelledby="feedbackCategoryModalLabel"
      aria-hidden="true"
      ref={modalRef}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-info">
            <h5 className="modal-title" id="feedbackCategoryModalLabel">
              {editMode === "Edit" ? "Edit" : "Add"} Academic
            </h5>
          </div>

          <div className="modal-body">
            <form
              onSubmit={handleAcademicResSave}
              encType="multipart/form-data"
            >
              <div className="mb-3 text-start fw-bold">
                <label htmlFor="title" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={academicResForm.name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  required
                />
              </div>

              <div className="mb-3 text-start fw-bold">
                <label htmlFor="body" className="form-label">
                  Description
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  name="body"
                  value={academicResForm.body}
                  onChange={handleChange}
                  placeholder="Enter Description"
                  required
                />
              </div>

              <div className="mb-3 text-start fw-bold">
                <label htmlFor="resourceCategory" className="col-form-label">
                  Resource Category
                </label>
                <select
                  className="form-control"
                  name="resourceCategory"
                  onChange={handleChange}
                  value={academicResForm.resourceCategory}
                  required
                >
                  <option value="">Select</option>
                  {allCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-5 text-start fw-bold">
                <label htmlFor="file" className="form-label">
                  File
                </label>

                <input
                  type="file"
                  className="form-control"
                  name="file"
                  onChange={handleChange}
                />
              </div>

              <div className="modal-footer">
                <button type="submit" className="btn btn-success">
                  {editMode === "Edit" ? "Update" : "Add Resource"}
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

export default AcademicResModal;
