
# Role-Based Access Control (RBAC) UI

This is an application based on REACT for demonstrating the role based access control system.
For the database purpose LocalStorage API is used to simulate CRUD operations.



## Demo

Website Link - https://rbac-react-app.onrender.com/


## Features

- Responsive UI Design
- Protected Routes
- User Management (CRUD)
- Searching and filtering users
- Role Management
- Products Management as a whole (Testing Permissions)
- Roled Based Access Control

### User Management
[![Usermanagement.png](https://i.postimg.cc/26Zs9fxH/Usermanagement.png)](https://postimg.cc/Kkmp4wwL)
- The admin which are inactive will not able to edit other users
- This page only access by admins

### Role Management
[![Rolemanagement.png](https://i.postimg.cc/g0nFRhLb/Rolemanagement.png)](https://postimg.cc/rdXP2K9f)
- [NOTE] READ will have no affect on the program (Dev Purpose).
- GUEST and ADMIN role are not removeable.

### Permissioned POV
[![CRUDPOV.png](https://i.postimg.cc/zvFHWvVK/CRUDPOV.png)](https://postimg.cc/dZD0cqRV)

### Without Permission POV
[![LOGOUT.png](https://i.postimg.cc/13jnDL5C/LOGOUT.png)](https://postimg.cc/CRbxgr8k)

#### [NOTE] ACCORDING TO PERMISSIONS BUTTONS/Features WILL APPEAR



## Installation

Clone the repository

```bash
git clone https://github.com/Anjney-Mishra/RBAC-REACT-APP.git
```
Install Node Packages
```bash
npm install
```
Run App
```bash
npm run dev
```

## TESTING ACCOUNT
- Admin account
#### username: admin_user
#### password: admin123

- Other mock accounts are present in mockUser.js File
## Lessons Learned

- Protecting Routes
- LocalStorage API for mocking CRUD operations
- Relation between database of Users and Role


