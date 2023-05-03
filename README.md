# Discussion Board Project

## Project Description
This is a fullstack project is simulation to Blog website where the users can write about specific topic which is part of a board.

The boards are fixed and only the admin who can add new board. The user can add new topic and write about it and also can add comments to the topic.

Also the user can create a new account and signin to the website. By signin the user can add new topic and comments otherwise only view the posts.

[Discussion Board Live Demo](https://mohamed-a-badr.github.io/Discussion-Board/frontend/html/home.html)

## Technologies Used
<strong>*Backend* </strong>: Python, Django, Django REST Framework, Gunicorn

<strong>*Frontend* </strong>: HTML, JavaScript, Bootstrap

<strong>*Database* </strong>: PostgreSQL (for production), SQLite3 (for development)

<strong>*Deployment* </strong>: Heroku (for backend)

## Features
- The user can view all boards and topics without signin.
- The user can create new account and signin to the website.
- The user can add new topic and comments to the topic if he authenticated.
- The admin can add new board.

## Getting Started
### Prerequisites
- Python 3.10 or higher
- clone the project

```bash
git clone https://github.com/Mohamed-A-Badr/Discussion-Board.git
```

- intsall virtual environment

```bash
python -m install venv venv
```

- activate virtual environment

```bash
source venv/Scripts/activate
```

- install dependencies

```bash
pip install -r backend/requirements.txt
```

### Running the project

- run the backend server

```bash
python backend/manage.py runserver
```

- Update the CSRF and CROS in the backend/settings.py to your frontend domain

```python
CSRF_TRUSTED_ORIGINS = ['localhost:3000',]
CORS_ALLOWED_ORIGINS = ['localhost:3000',]
```

