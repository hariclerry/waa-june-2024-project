import React from "react";

const FeedbackModal = props => {
  const {
    handleFeedbackSave,
    feedbackForm,
    allCategories,
    handleChange,
    modalRef,
    editMode
  } = props;

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
              {editMode ? "Edit" : "Add"} Feedback
            </h5>
          </div>

          <div className="modal-body">
            <form onSubmit={handleFeedbackSave}>
              <div className="mb-3 text-start fw-bold">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={feedbackForm.title}
                  onChange={handleChange}
                  placeholder="Enter Title"
                  required
                />
              </div>

              <div className="mb-3 text-start fw-bold">
                <label htmlFor="body" className="col-form-label">
                  Description
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  name="body"
                  value={feedbackForm.body}
                  onChange={handleChange}
                  placeholder="Enter description"
                  required
                />
              </div>

              <div className="mb-5 text-start fw-bold">
                <label htmlFor="feedbackCategory" className="col-form-label">
                  Category
                </label>
                <select
                  className="form-control"
                  name="feedbackCategory"
                  onChange={handleChange}
                  value={feedbackForm.feedbackCategory}
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

              <div className="modal-footer">
                <button type="submit" className="btn btn-success">
                  {editMode ? "Update" : "Add Feedback"}
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

export default FeedbackModal;
