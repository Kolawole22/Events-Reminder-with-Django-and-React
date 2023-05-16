import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import RemindersList from "../components/RemindersList";
import { ReminderList } from "../components/RemindersContext";
import { RemindersContext } from "../components/RemindersContext";
import InputModal from "../components/InputModal";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import api from "../components/api";
function AddCalendarPage({ isLoading }: { isLoading: boolean }) {
  //const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>();
  const [remindersList, setRemindersList] = useState<ReminderList[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640); // Adjust the breakpoint as needed
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check initial size on component mount

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //console.log(e.target.value);
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`date is ${e.target.value}`);
    setDate(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const tokenData = localStorage.getItem("accessToken");
    console.log(tokenData);

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenData}`,
    };

    //console.log(tokenData?.length);
    //const token = tokenData?.access;
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const postData = await api.post(
        "http://127.0.0.1:8000/api/reminder-items",
        {
          title: title,
          description: description,
          datetime: date,
        },
        { headers: headers }
      );
      const response = await api.get(
        "http://127.0.0.1:8000/api/reminder-items"
      );
      console.log("response is:", response.data);
      setRemindersList(response.data);
    } catch (error: Error) {
      if (error.response && error.response.status === 401) {
        // Handle unauthorized error
        // For example, clear the access token from localStorage and redirect to login page
        console.log(`user is unauathorized`);
        localStorage.removeItem("accessToken");
        navigate("/");
      } else if (error.response && error.response.status === 403) {
        //navigate("/");
        console.log(error);
      }
    }
  };
  return isLoading ? (
    <div className="w-screen">
      <div className="flex justify-center ">
        <BeatLoader
          color="#123abc"
          loading={true}
          className="flex justify-center"
        />
      </div>
    </div>
  ) : (
    <>
      <RemindersContext.Provider value={{ remindersList, setRemindersList }}>
        <div className="w-screen h-auto grid lg:grid-cols-2 bg-gradient-to-r m-0 from-indigo-500 via-purple-500 to-pink-500">
          {!isMobile && (
            <div className="flex justify-center items-center h-screen  mt-2 bg-sky-100 border rounded-lg mb-4 pb-4 ml-2">
              <form onSubmit={handleSubmit}>
                <h2 className="text-2xl mb-4">Add your Events</h2>
                <label htmlFor="title">Title</label>
                <br />
                <input
                  id="title"
                  type="text"
                  name="title"
                  className="border border-black rounded-md p-1 "
                  onChange={(e) => handleTitleChange(e)}
                />
                <br />
                <br />
                <label htmlFor="description">Description</label>
                <br />
                <input
                  id="description"
                  type="text"
                  name="description"
                  className="border border-black rounded-md p-1 "
                  onChange={(e) => handleDescriptionChange(e)}
                />
                <br />
                <br />
                <label htmlFor="date">Date</label>
                <br />
                <input
                  id="date"
                  type="datetime-local"
                  name="date"
                  className="border border-black rounded-md p-1 w-48"
                  onChange={(e) => handleDateChange(e)}
                />
                <br />
                <br />
                <input
                  type="submit"
                  name="submit"
                  className="bg-blue-300 hover:bg-blue-500 py-1 w-56 lg:w-48 border rounded-md"
                />
              </form>
            </div>
          )}
          {isMobile && (
            <div className="justify-center mt-4">
              <InputModal />
            </div>
          )}
          <div>
            <RemindersList />
          </div>
        </div>
      </RemindersContext.Provider>
    </>
  );
}

export default AddCalendarPage;
