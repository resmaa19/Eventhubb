import React, { useEffect, useState } from "react";
import "../styles/table.css";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import formatDate from "../utils/formatDate";
import { CiTrash } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { useDisclosure } from "@mantine/hooks";
import { Modal, TextInput } from "@mantine/core";

const AllVendors = () => {
  const [allVendors, setAllVendors] = useState([]);
  const [selectedForUpdate, setselectedForUpdate] = useState({ _id: "" });

  const [vendorDetails, setvendorData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    async function getAllVendors() {
      try {
        const response = await axios.get(`${BASE_URL}/vendors`);
        // Handle response data as needed
        console.log(response);
        if (response.status === 200) {
          console.log(response.data);
          setAllVendors(response.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    }
    getAllVendors();
  }, []);

  console.log(allVendors)

  async function handleDeleteVendor(vendorId) {
    console.log(vendorId);
    const response = await axios.delete(`${BASE_URL}/vendors/${vendorId}`);
    if (response.status === 204) {
      toast.success("Vendor delete successful");
      const updatedList = allVendors.filter((each) => each._id !== vendorId);
      setAllVendors(updatedList);
    } else {
      console.error("Failed to delete booking:", response.status);
      // Handle error if required
    }
  }

  async function handleUpdateVendor() {
    console.log(selectedForUpdate);
    const res = await fetch(`${BASE_URL}/vendors/${selectedForUpdate._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedForUpdate),
    });

    if (res.ok) {
      toast.success("Vendor update successful");
      setselectedForUpdate({ _id: "" });
      const updatedVendorList = allVendors.map(each=>{
        if(each._id===selectedForUpdate._id){
            each= selectedForUpdate
        }
        return each
      })

      setAllVendors(updatedVendorList);
    }
  }

  async function handleAddVendor() {
    const res = await fetch(`${BASE_URL}/vendors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vendorDetails),
    });

    if (res.ok) {
      const data = await res.json();
      close();
      toast.success("Vendor added successfully");
      setAllVendors([...allVendors, data.vendor]);
      setvendorData({
        name: "",
        email: "",
        phone: "",
        address: "",
      });
    }else{
        const data = await res.json();

        toast.error(data.error)
    }
  }

  function handleInputChange(changeFor, e) {
    setvendorData((prevState) => ({
      ...prevState,
      [changeFor]: e.target.value,
    }));
  }

  return (
    <main className="main-container">
      <Modal opened={opened} onClose={close} title="Add Vendor" centered>
        <div className="row gap-2">
          <TextInput
            placeholder="Vendor Name"
            label="Name"
            value={vendorDetails.name}
            onChange={(e) => handleInputChange("name", e)}
          />
          <TextInput
            placeholder="Email"
            label="Email"
            value={vendorDetails.email}
            onChange={(e) => handleInputChange("email", e)}
          />
          <TextInput
            placeholder="Phone"
            label="Phone"
            value={vendorDetails.phone}
            onChange={(e) => handleInputChange("phone", e)}
          />
          <TextInput
            placeholder="Address"
            label="Address"
            value={vendorDetails.address}
            onChange={(e) => handleInputChange("address", e)}
          />
        </div>

        <div className="d-flex justify-content-end mt-3">
          <button className="btn btn-success" onClick={handleAddVendor}>
            Add
          </button>
        </div>
      </Modal>

      <div className="d-flex justify-content-between">
        <div className="main-title">
          <h3>VENDORS</h3>
        </div>

        <button className="btn btn-success" onClick={open}>
          Add Vendor
        </button>
      </div>

      <div className="mt-4">
        <table>
          <thead className="main-title">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone number</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allVendors.map((each) =>
              selectedForUpdate._id !== each._id ? (
                <tr>
                  <td>{each.name}</td>
                  <td>{each.email}</td>
                  <td>{each.phone}</td>
                  <td>{each.address}</td>
                  <td>
                    <div className="d-flex justify-content-start gap-2">
                      <button
                        type="button"
                        class="btn btn-outline-danger"
                        onClick={() => handleDeleteVendor(each._id)}
                      >
                        <CiTrash />
                      </button>

                      <button
                        type="button"
                        class="btn btn-outline-warning"
                        onClick={() => {
                          setselectedForUpdate(each);
                        }}
                      >
                        <CiEdit />
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td>
                    <input
                      value={selectedForUpdate.name}
                      onChange={(e) => {
                        setselectedForUpdate((prevState) => ({
                          ...prevState,
                          name: e.target.value,
                        }));
                      }}
                    />
                  </td>

                  <td>
                    <input
                      value={selectedForUpdate.email}
                      onChange={(e) => {
                        setselectedForUpdate((prevState) => ({
                          ...prevState,
                          email: e.target.value,
                        }));
                      }}
                    />
                  </td>

                  <td>
                    <input
                      value={selectedForUpdate.phone}
                      onChange={(e) => {
                        setselectedForUpdate((prevState) => ({
                          ...prevState,
                          phone: e.target.value,
                        }));
                      }}
                    />
                  </td>

                  <td>
                    <input
                      value={selectedForUpdate.address}
                      onChange={(e) => {
                        setselectedForUpdate((prevState) => ({
                          ...prevState,
                          address: e.target.value,
                        }));
                      }}
                    />
                  </td>
                
                  <td>
                    <div className="d-flex justify-content-evenly">
                      <button
                        type="button"
                        class="btn btn-outline-primary me-2"
                        onClick={() => handleUpdateVendor()}
                      >
                        Save
                      </button>

                      <button
                        type="button"
                        class="btn btn-outline-danger"
                        onClick={() => setselectedForUpdate({_id:''})}
                      >
                        <MdCancel />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

        {allVendors.length === 0 && (
          <h6 className="text-center mt-5">No Vendors at the moment</h6>
        )}
      </div>

      <ToastContainer />
    </main>
  );
};

export default AllVendors;
