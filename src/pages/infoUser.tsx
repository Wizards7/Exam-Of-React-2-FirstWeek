import { Button, Modal } from "antd";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useCrud } from "../store/crud";
import { Link, useParams } from "react-router-dom";

const InfoUser = () => {
  // Info Part
  let { id } = useParams();
  let { data, editUser } = useCrud();

  const infoCustomer = data.find((user) => user.id == id);
  //   Formik
  const { handleSubmit, handleChange, resetForm, values, setFieldValue } =
    useFormik({
      initialValues: {
        img: "",
        name: "",
        jobType: "",
        age: 0,
        status: "",
      },
      onSubmit: (valueSubmit) => {
        editUser({
          id: id,
          img: valueSubmit.img,
          name: valueSubmit.name,
          age: valueSubmit.age,
        });
        closeEdit();
        resetForm();
      },
    });

  // Edit User
  const [editModal, setEditModal] = useState(false);

  function openEdit() {
    setEditModal(true);
  }
  function closeEdit() {
    setEditModal(false);
  }
  function handleEdit(event) {
    setFieldValue("img", event.img);
    setFieldValue("name", event.name);
    setFieldValue("age", event.age);
  }
  return (
    <div className="max-w-[1200px] m-auto shadow-2xl p-10 text-center my-10 w-fit rounded-2xl">
      <div>
        <img
          src={infoCustomer.img}
          alt=""
          className="w-[200px] rounded-2xl my-5"
        />
        <h1>Full Name : {infoCustomer.name}</h1>
        <p className="my-5">Age : {infoCustomer.age}</p>
        <div className="mb-4">
          {infoCustomer.status && (
            <p className="text-[green]">Status : Active</p>
          )}
          {!infoCustomer.status && (
            <p className="text-[red]">Status : InActive</p>
          )}
        </div>
        <div className="flex gap-4 justify-center">
          <Button
            color="primary"
            variant="dashed"
            onClick={() => {
              openEdit();
              handleEdit(infoCustomer);
            }}
          >
            Edit
          </Button>
          <Link to={"/home"}>
            <Button color="default" variant="dashed">
              Go Back
            </Button>
          </Link>
        </div>
      </div>
      {/* Edit Modal */}
      <Modal
        title="Edit Modal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={editModal}
        onCancel={closeEdit}
        footer={null}
      >
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="ImgLink..."
            name="img"
            onChange={handleChange}
            value={values.img}
          />
          <input
            type="text"
            placeholder="FullName"
            name="name"
            onChange={handleChange}
            value={values.name}
          />
          <input
            type="number"
            placeholder="Age"
            name="age"
            onChange={handleChange}
            value={values.age}
          />
          <button type="submit">Save</button>
        </form>
      </Modal>
    </div>
  );
};

export default InfoUser;
