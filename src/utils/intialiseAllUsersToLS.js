import { mockUsers } from "../../mockUser";

export const intialiseAllUsersToLS = () => {
    const existingUsers = JSON.parse(localStorage.getItem("users"));;
    if(!existingUsers)
    localStorage.setItem("users", JSON.stringify(mockUsers));
};

