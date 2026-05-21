import React, { useEffect, useState } from "react";
import "../styles/table.css";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import formatDate from "../utils/formatDate";
import { CiTrash } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

const AllBookings = () => {
  const [allBookings, setallBookings] = useState([]);
  const [selectedForUpdate, setselectedForUpdate] = useState({ _id: "" });

  useEffect(() => {
    async function getAllBookings() {
      try {
        const response = await axios.get(`${BASE_URL}/booking`);
        // Handle response data as needed
        console.log(response);
        if (response.status === 200) {
            setallBookings(response.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    }
    getAllBookings();
  }, []);

  async function handleDeleteBookings(bookingId) {
    console.log(bookingId);
    console.log(selectedForUpdate)
    const response = await axios.delete(`${BASE_URL}/booking/${bookingId}`);
    if (response.status === 204) {
      toast.success('Booking delete successful')
      const updatedList = allBookings.filter((each) => each._id !== bookingId);
      setallBookings(updatedList);
    } else {
      console.error("Failed to delete booking:", response.status);
      // Handle error if required
    }
  }

  async function handleUpdateBookings() {
    console.log(selectedForUpdate);
    const res = await fetch(`${BASE_URL}/booking/${selectedForUpdate._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedForUpdate),
    });

    if(res.ok){
        toast.success('Booking update successful')
        setselectedForUpdate({_id:''});

        const updateBookingList = allBookings.map(each=>{
          if(each._id===selectedForUpdate._id){
              each= selectedForUpdate
          }
          return each
        })
  
        setallBookings(updateBookingList);
    }
  }

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>BOOKINGS</h3>
      </div>

      <div className="mt-4">
        <table>
          <thead className="main-title">
            <tr>
              <th>Booked By</th>
              <th>Email</th>
              <th>Booked Date</th>
              <th>No. of Guests</th>
              <th>Location</th>
              <th>Budget</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allBookings.map((each) =>
              selectedForUpdate._id !== each._id ? (
                <tr>
                  <td>{each.fullName}</td>
                  <td>{each.email}</td>
                  <td>{formatDate(each.bookAt)}</td>
                  <td>{each.guestSize}</td>
                  <td>{each.location}</td>
                  <td>{each.budget}</td>
                  <td>
                    <div className="d-flex justify-content-evenly">
                      <button
                        type="button"
                        class="btn btn-outline-danger"
                        onClick={() => handleDeleteBookings(each._id)}
                      >
                        <CiTrash />
                      </button>

                      <button
                        type="button"
                        class="btn btn-outline-warning"
                        onClick={() => {
                          console.log(each)
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
                  <td>{each.fullName}</td>
                  <td>{each.email}</td>
                  <td>{formatDate(each.bookAt)}</td>
                  <td>
                    <input
                      value={selectedForUpdate.guestSize}
                      type="number"
                      onChange={(e) => {
                        setselectedForUpdate((prevState) => ({
                          ...prevState,
                          guestSize: e.target.value,
                        }));
                      }}
                    />
                  </td>
                  <td>
                    <input
                      value={selectedForUpdate.location}
                      onChange={(e) => {
                        setselectedForUpdate((prevState) => ({
                          ...prevState,
                          location: e.target.value,
                        }));
                      }}
                    />
                  </td>
                  <td>
                    <input
                      value={selectedForUpdate.budget}
                      onChange={(e) => {
                        setselectedForUpdate((prevState) => ({
                          ...prevState,
                          budget: e.target.value,
                        }));
                      }}
                    />
                  </td>
                  <td>
                    <div className="d-flex justify-content-evenly">
                      <button
                        type="button"
                        class="btn btn-outline-primary me-2"
                        onClick={() => handleUpdateBookings()}
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

        {allBookings.length === 0 && (
          <h6 className="text-center mt-5">No Bookings at the moment</h6>
        )}
      </div>

      <ToastContainer/>
    </main>
  );
};

export default AllBookings;
