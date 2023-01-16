# Backend

This README file includes instructions on how to set up the backend environment.

</br>

## Prerequisites

Generate a secret key and add it to the .env file (\*command requires Python 3.6 & above)

```sh
$ python -c "import secrets; print(secrets.token_urlsafe())"
```

Add database configuration settings to the .env file
- Create and setup a MySQL database (or a database of your choice)


Add or update other configuration settings in the .env file, if necessary

- Setup an email account to send email notifications
- Register and obtain an [ExerciseDB](https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb) API key

</br>

## Setup

Navigate to the backend directory

```sh
$ cd backend
```

The following commands use [pipenv](https://pipenv.pypa.io/en/latest/) (you may also use [venv](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/#creating-a-virtual-environment))

1. Create a new virtual environment

   ```python
   $ pipenv install
   ```

2. Activate the virtual environment
   ```python
   $ pipenv shell
   ```

</br>

## Installation

Install dependencies

```sh
$ pipenv install -r requirements.txt
```

</br>

## Usage

Migrate models into the database schema

```sh
$ python manage.py makemigrations
$ python manage.py migrate
```

Start the development server

```sh
$ python manage.py runserver
```
