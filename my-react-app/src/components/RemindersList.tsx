//import axios from "axios";
import api from "./api";
import { useEffect, useState, Fragment, useContext } from "react";
import { RemindersContext } from "./RemindersContext";

function RemindersList() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { remindersList, setRemindersList } = useContext(RemindersContext);

  const fetchReminders = async () => {
    try {
      const response = await api.get(
        "http://127.0.0.1:8000/api/reminder-items"
      );
      console.log("response is:", response.data);
      setRemindersList(response.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchReminders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (pk: string) => {
    try {
      await api.delete(`http://127.0.0.1:8000/api/reminder-items/${pk}`);
    } catch (error) {
      console.log(error);
    }
    fetchReminders();
  };
  return (
    <>
      <div className="flex justify-center  my-2 text-2xl bg-blue-600 mx-8 py-4 rounded-md font-mono font-bold text-slate-100 ">
        Reminders
      </div>
      {!RemindersList && (
        <div className="justify-center  text-md ">
          Your Reminder Lists will appear here
        </div>
      )}
      <ul>
        {remindersList.map((item) => (
          <Fragment key={item.id}>
            <div className="bg-blue-600 text-white border  rounded-lg px-1 py-2 text-center mx-8 ">
              <li className="text-xl font-weight-bold">{item.title}</li>
              <li>{item.description}</li>
              <li>{new Date(item.datetime).toUTCString()}</li>
              <button
                className="border-0 w-64 text-red-800 hover:text-red-600 bg-blue-600"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </Fragment>
        ))}
      </ul>
    </>
  );
}

export default RemindersList;
