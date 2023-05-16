import { useContext, useState } from "react";
import Modal from "react-modal";
import { RemindersContext } from "./RemindersContext";
import axios from "axios";
import api from "./api";
//import Calendar from "react-calendar";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-80%",
    transform: "translate(-50%, -50%)",
  },
};

function InputModal() {
  //let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { remindersList, setRemindersList } = useContext(RemindersContext);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

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
        }
      );
      const response = await api.get(
        "http://127.0.0.1:8000/api/reminder-items"
      );
      console.log("response is:", response.data);
      setRemindersList(response.data);
    } catch (error) {
      console.error(error);
      // Handle any error that occurs during the login request
    }
  };

  return (
    <div>
      <div className="justify-center ml-24 ">
        <button onClick={openModal}>Add your events</button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex justify-center mt-2   mb-4 pb-4">
          <form onSubmit={handleSubmit}>
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
      </Modal>
    </div>
  );
}

export default InputModal;
