import React from "react";

const FeedbackCategoryModal = (props) => {
  const { handleFeedbackCategorySave, feedbackCategoryForm, handleChange, modalRef, editMode } =
    props;

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
              {editMode ? "Edit FeedbackCategory" : "Add FeedbackCategory"}
            </h5>
          </div>

          <div className="modal-body">
            <form onSubmit={handleFeedbackCategorySave}>
              <div className="mb-3 text-start fw-bold">
                <label htmlFor="name" className="form-label">
                  Category Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={feedbackCategoryForm.name}
                  onChange={handleChange}
                  placeholder="Enter Category"
                  required
                />
              </div>

              <div className="mb-5 text-start fw-bold">
                <label htmlFor="description" className="col-form-label">
                  Description
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  name="description"
                  value={feedbackCategoryForm.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                  required
                />
              </div>

              <div className="modal-footer">
                <button type="submit" className="btn btn-success">
                  {editMode ? "Update" : "Add Category"}
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

export default FeedbackCategoryModal;
