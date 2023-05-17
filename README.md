# Events-Reminder-with-Django-and-React
# Event Reminder

Event Reminder is a full-stack web application built with Django and React that allows users to manage and schedule their events. It provides features for creating, editing, and deleting events, as well as sending email reminders to users one hour before an event.

## Features

- User authentication: Users can sign up, log in, and log out to access their personalized event management dashboard.
- Event management: Users can create, view, update, and delete their events.
- Email reminders: Users receive email reminders one hour before their scheduled events.
- Responsive UI: The application is designed to be mobile-friendly and responsive across devices.

## Technologies Used

- Django: A powerful Python web framework used for the backend development.
- Django REST Framework: A toolkit for building APIs with Django, used for creating RESTful APIs to interact with the frontend.
- React: A JavaScript library for building user interfaces, used for the frontend development.
- HTML and CSS: Used for structuring and styling the application's user interface.
- Git and GitHub: Version control and code collaboration tools.

## Installation and Setup

1. Clone the repository:
2. 
3. Set up the backend:

- Install Python dependencies:

  ```
  cd event-reminder/backend
  pip install -r requirements.txt
  ```

- Set up the database:

  ```
  python manage.py migrate
  ```

- Start the Django development server:

  ```
  python manage.py runserver
  ```

3. Set up the frontend:

- Install Node.js dependencies:

  ```
  cd event-reminder/frontend
  npm install
  ```

- Start the React development server:

  ```
  npm start
  ```

4. Access the application at [http://localhost:3000](http://localhost:3000) in your browser.

## Contributing

Contributions are welcome! If you find any issues or want to suggest enhancements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- [Django](https://www.djangoproject.com/)
- [React](https://reactjs.org/)
- [Django REST Framework](https://www.django-rest-framework.org/)




