# CRUD-API

## To launch:
 - Add ```.env``` file with ```PORT``` variable;
 - Run ```npm i```;
 - Run ```npm run start:dev``` to start in dev mode;
 - Run ```npm run start:prod``` to build and run the bundled file;
 - Run ```npm run start:multi``` to start multiple instances.

## To run tests:
 - Run ```npm run test```.

# Endpoints

### GET /api/users

**Description:** Get all users.

* **Response:**

  * **Status:** `200 OK`
  * **Body:**

    ```json
    {
      "data": [
        {
          "id": "string",
          "username": "string",
          "age": "number",
          "hobbies": ["string"]
        }
      ],
      "statusCode": 200
    }
    ```

---

### GET /api/users/\:id

**Description:** Get user by ID.

* **Params:**

  * `id`: `string` (UUID)

* **Response:**

  * **Status:** `200 OK`
  * **Body:**

    ```json
    {
      "data": {
        "id": "string",
        "username": "string",
        "age": "number",
        "hobbies": ["string"]
      },
      "statusCode": 200
    }
    ```

* **Errors:**

  * `404 User doesn't exist!`, if user does not exist
  * `400 ID is invalid!`, if id is invalid

---

### POST /api/users

**Description:** Create new user.

* **Headers:**

  * `Content-Type: application/json`

* **Body:**

  ```json
  {
    "username": "string",
    "age": "number",
    "hobbies": ["string"]
  }
  ```

* **Response:**

  * **Status:** `201 Created`
  * **Body:**

    ```json
    {
      "data": {
        "id": "string",
        "username": "string",
        "age": "number",
        "hobbies": ["string"]
      },
      "statusCode": 201
    }
    ```

* **Errors:**

  * `400 Required fields not provided, or data type is wrong!`, if body is invalid

---

### PUT /api/users/\:id

**Description:** Update user by ID.

* **Params:**

  * `id`: `string` (UUID)

* **Headers:**

  * `Content-Type: application/json`

* **Body:**

  ```json
  {
    "username": "string",
    "age": "number",
    "hobbies": ["string"]
  }
  ```

* **Response:**

  * **Status:** `200 OK`
  * **Body:**

    ```json
    {
      "data": {
        "id": "string",
        "username": "string",
        "age": "number",
        "hobbies": ["string"]
      },
      "statusCode": 200
    }
    ```

* **Errors:**

  * `404 User doesn't exist!`, if user does not exist
  * `400 Data type is wrong!`, if body is invalid

---

### DELETE /api/users/\:id

**Description:** Delete user by ID.

* **Params:**

  * `id`: `string` (UUID)

* **Response:**

  * **Status:** `204 No Content`
  * **Body:**

    ```json
    {
      "data": null,
      "statusCode": 204
    }
    ```

* **Errors:**

  * `404 User doesn't exist!`, if user does not exist

---

## Errors structure

```json
{
  "data": null,
  "statusCode": 404,
  "message": "User doesn't exist!"
}
```

---
