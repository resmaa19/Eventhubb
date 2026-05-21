import React, { useEffect, useRef, useState } from "react";
import "../styles/table.css";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import formatDate from "../utils/formatDate";
import { CiTrash } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { Modal, NumberInput, Text, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IoIosAddCircle } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";
import { uploadImage } from "../utils/uploadImage";

const AllEvents = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [selectedForUpdate, setselectedForUpdate] = useState({ _id: "" });

  const [eventImage, seteventImage] = useState(null);

  const imgRef = useRef();
  const [eventDetails, setEventDetails] = useState({
    title: "",
    description: "",
    appointmentCharge: "",
    location: "",
  });

  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    async function getAllEvents() {
      try {
        const response = await axios.get(`${BASE_URL}/events`);
        // Handle response data as needed
        console.log(response);
        if (response.status === 200) {
          console.log(response.data);
          setAllEvents(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    }
    getAllEvents();
  }, []);

  async function handleDeleteEvent(eventId) {
    console.log(eventId);
    const response = await axios.delete(`${BASE_URL}/events/${eventId}`);
    if (response.status === 204) {
      toast.success("Vendor delete successful");
      const updatedList = allEvents.filter((each) => each.id !== eventId);
      setAllEvents(updatedList);
    } else {
      console.error("Failed to delete booking:", response.status);
      // Handle error if required
    }
  }

  async function handleUpdateEvent() {
    console.log(selectedForUpdate);
    const res = await fetch(`${BASE_URL}/events/${selectedForUpdate.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedForUpdate),
    });

    if (res.ok) {
      toast.success("Vendor update successful");
      setselectedForUpdate({ _id: "" });
      const updatedVendorList = allEvents.map((each) => {
        if (each._id === selectedForUpdate._id) {
          each = selectedForUpdate;
        }
        return each;
      });

      setAllEvents(updatedVendorList);
    }
  }

  async function handleAddEvent() {
    const upload_res = await uploadImage(eventImage);
    let uploadData;

    if (upload_res.ok) {
      uploadData = await upload_res.json();
      console.log(uploadData);
    }
    const data = {
      image: uploadData ? uploadData.url : "no-image",
      title: eventDetails.title,
      description: eventDetails.description,
      date: Date.now(),
      appointmentCharge: eventDetails.appointmentCharge,
      location: eventDetails.location,
      reviews: [],
      ratings: 0.0,
    };
    const res = await fetch(`${BASE_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const data = await res.json();
      close();
      toast.success("Vendor added successfully");
      setAllEvents([...allEvents, data.data]);
      setEventDetails({
        title: "",
        description: "",
        appointmentCharge: "",
        location: "",
      });
      seteventImage(null);
    } else {
      const data = await res.json();

      toast.error(data.error);
    }
  }

  function handleInputChange(changeFor, e) {
    setEventDetails((prevState) => ({
      ...prevState,
      [changeFor]: e.target.value,
    }));
  }

  function openImageInput() {
    imgRef.current.click();
  }

  return (
    <main className="main-container">
      <Modal
        opened={opened}
        onClose={close}
        title="Add Event"
        centered
        size={"lg"}
        className="px-5"
      >
        <div className="row gap-2 ">
          {eventImage ? (
            <div className="w-100 position-relative mt-5">
              <img
                src={URL.createObjectURL(eventImage)}
                className="w-100"
                style={{
                  height: "300px",
                  objectFit: "cover",
                }}
              ></img>

              <p
                className="position-absolute top-0 start-96 translate-middle text-danger"
                style={{
                  fontSize: "30px",
                }}
                onClick={() => seteventImage(null)}
              >
                <MdCancel />
              </p>
            </div>
          ) : (
            <div
              className="d-flex justify-content-center align-items-center border rounded
              "
              style={{
                height: "300px",
              }}
              onClick={openImageInput}
            >
              <div className="d-flex align-items-center flex-column gap-2">
                <IoIosAddCircle
                  className="text-center"
                  style={{
                    fontSize: "40px",
                  }}
                />
                <Text>Select Image</Text>
              </div>
            </div>
          )}
          <TextInput
            placeholder="Event title"
            label="Event title"
            value={eventDetails.title}
            onChange={(e) => handleInputChange("title", e)}
          />
          <TextInput
            placeholder="Event description"
            label="Description"
            value={eventDetails.description}
            onChange={(e) => handleInputChange("description", e)}
          />

          <NumberInput
            placeholder="Appointment Price"
            label="Description"
            value={eventDetails.appointmentCharge}
            onChange={(e) =>
              setEventDetails((prevState) => ({
                ...prevState,
                appointmentCharge: e,
              }))
            }
          />

          <TextInput
            placeholder="Location"
            label="location"
            value={eventDetails.location}
            onChange={(e) => handleInputChange("location", e)}
          />
        </div>

        <div className="d-flex justify-content-end mt-3">
          <button className="btn btn-success" onClick={handleAddEvent}>
            Add
          </button>
        </div>

        <input
          type="file"
          className="visually-hidden"
          ref={imgRef}
          onChange={(e) => seteventImage(e.target.files[0])}
        ></input>
      </Modal>

      <div className="d-flex justify-content-between">
        <div className="main-title">
          <h3>EVENTS</h3>
        </div>

        <button className="btn btn-success" onClick={open}>
          Add event
        </button>
      </div>

      <div className="mt-4">
        <table>
          <thead className="main-title">
            <tr>
              <th>Event Name</th>
              <th className="w-50">Description</th>
              <th>Ratings</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allEvents.map((each) =>
              selectedForUpdate._id !== each._id ? (
                <tr>
                  <td>
                    <div className="d-flex gap-1">
                      <p>{each.title}</p>
                    </div>
                  </td>
                  <td>{each.description}</td>
                  <td>{each.ratings ? each.ratings : "0.0"}</td>
                  <td>
                    <div className="d-flex justify-content-start gap-2">
                      <button
                        type="button"
                        class="btn btn-outline-danger"
                        onClick={() => handleDeleteEvent(each.id)}
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
                      value={selectedForUpdate.title}
                      onChange={(e) => {
                        setselectedForUpdate((prevState) => ({
                          ...prevState,
                          title: e.target.value,
                        }));
                      }}
                    />
                  </td>

                  <td>
                    <input
                      value={selectedForUpdate.description}
                      onChange={(e) => {
                        setselectedForUpdate((prevState) => ({
                          ...prevState,
                          description: e.target.value,
                        }));
                      }}
                    />
                  </td>

                  <td>{each.ratings ? each.ratings : "0.0"}</td>

                  <td>
                    <div className="d-flex justify-content-evenly">
                      <button
                        type="button"
                        class="btn btn-outline-primary me-2"
                        onClick={() => handleUpdateEvent()}
                      >
                        Save
                      </button>

                      <button
                        type="button"
                        class="btn btn-outline-danger"
                        onClick={() => setselectedForUpdate({ _id: "" })}
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

        {allEvents.length === 0 && (
          <h6 className="text-center mt-5">No Events at the moment</h6>
        )}
      </div>

      <ToastContainer />
    </main>
  );
};

export default AllEvents;
