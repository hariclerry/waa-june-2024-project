import React from "react";
import {deleteApi} from "../../Service/apiAcademicResource";

const AcademicResList = ({
  academicResourceList,
  setAcademicForm,
  setEditMode,
  setAcademicResourceList,
  openModal
}) => {
  const editHandler = id => {
    if (id) {
      setEditMode(true);

      const result = academicResourceList.find(cat => cat.id === id);
      if (result) {
        setAcademicForm({
          id: result.id,
          name: result.name,
          body: result.body,
          resourceCategory: result.resourceType ? result.resourceType.id : "",
          file: null
        });
        openModal("Edit");
      }
    }
  };

  const deleteHandler = async id => {
    try {
      const data = await deleteApi(id);
      setAcademicResourceList(data);
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
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {academicResourceList.map((data, index) => (
            <tr key={data.id}>
              <td>{index + 1}</td>
              <td>{data.name}</td>
              <td>{data.body}</td>
              <td>{data.resourceType.name}</td>

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

export default AcademicResList;
