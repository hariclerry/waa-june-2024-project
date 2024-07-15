import React from "react";
import {deleteApi} from "../../Service/apiFeedbackService";

const FeedbackList = ({
  feedbacksList,
  setFeedbackForm,
  setEditMode,
  setFeedbacksList,
  openModal
}) => {
  const editHandler = id => {
    if (id) {
      setEditMode(true);
      const result = feedbacksList.find(cat => cat.id === id);
      if (result) {
        setFeedbackForm({
          id: result.id,
          title: result.title,
          body: result.body,
          feedbackCategory: result.category.id
        });
        openModal(true);
      }
    }
  };

  const deleteHandler = async id => {
    try {
      const data = await deleteApi(id);
      setFeedbacksList(data);
    } catch (error) {
      console.error("Error deleting feedbackcategory:", error);
    }
  };

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {feedbacksList.map((data, index) => (
            <tr key={data.id}>
              <td>{index + 1}</td>
              <td>{data.title}</td>
              <td>{data.body}</td>
              <td>{data.category.name}</td>
              <td
                className="btn btn-sm btn-success m-1"
                onClick={() => editHandler(data.id)}
              >
                Edit
              </td>
              <td
                className="btn btn-sm btn-danger m-1"
                onClick={() => deleteHandler(data.id)}
              >
                Delete
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackList;
