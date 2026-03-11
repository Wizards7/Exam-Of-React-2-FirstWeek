import  { useState } from "react";
import { useCrud } from "../store/crud";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import "../App.css";
import { Button, Checkbox, Input, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import iconsOfLight from "../icons/sun.svg";

const Home = () => {
  const { data, addUser, deleteUser, toggle } = useCrud();

  //   Formik
  const { handleSubmit, handleChange, resetForm } = useFormik({
    initialValues: {
      img: "",
      name: "",
      jobType: "",
      age: 0,
      status: "",
    },
    onSubmit: (valueSubmit) => {
      addUser({
        id: data.length + 1,
        img: valueSubmit.img,
        name: valueSubmit.name,
        age: valueSubmit.age,
        status: valueSubmit.status,
      });
      closeAdd();
      resetForm();
    },
  });

  // Select Status
  interface iData {
    id: number;
    img: string;
    name: string;
    age: number;
    status: boolean;
  }
  const [selectAll, setSelectAll] = useState("");

  // Search Part
  const [search, setSearch] = useState("");

  // Add User
  const [addModal, setAddModal] = useState(false);
  function openAdd() {
    setAddModal(true);
  }
  function closeAdd() {
    setAddModal(false);
  }

  return (
    <div className="max-w-[1200px] m-auto">
      <div className="flex items-center gap-5 my-10">
        <select
          className="border border-[#cbcaca] rounded p-1"
          onChange={(e) => setSelectAll(e.target.value)}
        >
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="inactive">InActive</option>
        </select>
        <Input
          size="medium"
          placeholder="large size"
          prefix={<UserOutlined />}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2 mx-5">
          <img src={iconsOfLight} alt="" className="dark" />
        </div>
        <Button type="primary" onClick={openAdd}>
          Add New User
        </Button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Img Link...</th>
            <th>FullName</th>
            <th>Age</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((selectSt: iData) => {
              if (selectAll == "") {
                return data;
              }
              if (selectAll == "active") {
                return selectSt.status == true;
              }
              if (selectAll == "inactive") {
                return selectSt.status == false;
              }
            })
            .filter((searching: iData) =>
              searching.name.toLowerCase().includes(search.toLowerCase()),
            )
            .map((user: iData) => {
              return (
                <tr>
                  <td>{user.id}</td>
                  <td>
                    <img
                      src={user.img}
                      alt=""
                      className="w-[70px] h-[50px] rounded-full"
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>
                    {user.status && <p className="text-[green]">Active</p>}
                    {!user.status && <p className="text-[red]">InActive</p>}
                  </td>
                  <td>
                    <div className="flex justify-center gap-2 my-5">
                      <Link to={`/infoUser/${user.id}`}>
                        <Button type="dashed">Info</Button>
                      </Link>
                      <Button
                        color="danger"
                        variant="dashed"
                        onClick={() => deleteUser(user.id)}
                      >
                        Delete
                      </Button>
                      <Checkbox
                        onClick={() => toggle(user.id)}
                        checked={user.status}
                      ></Checkbox>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {/* Add Modal */}
      <Modal
        title="Add Modal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={addModal}
        onCancel={closeAdd}
        footer={null}
      >
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="ImgLink..."
            name="img"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="FullName"
            name="name"
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Age"
            name="age"
            onChange={handleChange}
          />
          <button type="submit">Save</button>
        </form>
      </Modal>
    </div>
  );
};

export default Home;
