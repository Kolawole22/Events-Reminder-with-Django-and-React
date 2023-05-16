import React, { createContext } from "react";

export interface ReminderList {
  id: string;
  title: string;
  description: string;
  datetime: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

interface RemindersContextProps {
  remindersList: ReminderList[];
  setRemindersList: React.Dispatch<React.SetStateAction<ReminderList[]>>;
}

export const RemindersContext = createContext<RemindersContextProps>({
  remindersList: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setRemindersList: () => {},
});
