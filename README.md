# Secure Authentication System (Express.js & React.js with JWT)

## Deployment URLs

- **Front-End: [https://auth-client.sushant.fun](https://auth-client.sushant.fun)**
- **Back-End: [https://auth.sushant.fun](https://auth.sushant.fun)**

## Overview

> This authentication system is designed to provide a secure and unique approach to user authentication. Unlike conventional systems that store access tokens in cookies or local storage, this system takes a different and more secure approach by storing the accessToken in memory.

- **Key Features**

  - **In-Memory Access Token Storage:** One distinctive feature of this authentication system is the storage of access tokens directly in memory, managed through React context. Unlike storing tokens in cookies or local storage, this method adds an extra layer of security, making it difficult for hackers to access sensitive information.

  - **HttpOnly Cookie for Refresh Token:** For persistency, the system employs an HttpOnly cookie to securely store the refresh token. This cookie is not accessible via client-side JavaScript, adding an additional layer of protection against certain types of attacks.

  - **Token Refresh Mechanism:** To ensure both security and persistency, the system incorporates a token refresh mechanism. The refresh token is used to generate a new access token two minutes before the current token expires. This proactive approach minimizes the window of vulnerability and enhances overall system security.

  - **Initial Page Load Security:** The system is designed to maintain security even during the initial page load. By using the refresh token stored in the HttpOnly cookie, the system can seamlessly generate a new access token, ensuring a secure authentication process without relying on local storage.

  - **Best Practices:** This authentication system adheres to industry best practices for building a secure authentication system. The combination of in-memory access token storage, HttpOnly cookies, and proactive token refresh mechanisms provides a robust solution that prioritizes both security and user experience.

## Technologies Used

> - **MongoDB:** MongoDB serves as the database for this authentication system, providing a flexible and scalable solution for storing users' information. Its NoSQL nature allows for efficient handling of diverse data types.

> - **Express.js:** Express.js forms the backbone of the backend server, providing a robust and minimalist framework for building web applications and APIs. It handles routing, middleware, and HTTP requests, ensuring smooth communication between the frontend and the database.

> - **React.js:** React is the heart of the frontend, empowering the creation of interactive and dynamic user interfaces. Its component-based architecture facilitates modular development, enhancing code reusability and maintainability.

## How to Execute

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/mskp/react-express-authentication-system
   ```

2. **Install the dependencies and run the development servers:** (Run each command in seperate instances of terminal)

   ```bash
   cd client && npm i && npm run dev
   cd server && npm i && npm run dev
   ```

- Now the frontend will be running on http://localhost:5173 and the backend will be running on http://localhost:8000

## Developer

- **Name:** Sushant Pandey
- **GitHub:** [https://github.com/mskp](https://github.com/mskp)
- **LinkedIn:** [https://www.linkedin.com/in/mskp](https://www.linkedin.com/in/mskp)
- **Website:** [https://sushant.fun](https://sushant.fun)
- **Other Links:** [https://linktr.ee/isushant](https://linktr.ee/isushant)

## License

This repository is MIT licensed. [Read more](./LICENSE)
