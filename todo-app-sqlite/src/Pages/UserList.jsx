import React, { useEffect, useState } from "react";
import { getUsers } from "./SQlit";

const UserList = () => {
  const [users, setUsers] = useState([]);
  //// To view registered users
  useEffect(() => {
    const fetchedUsers = getUsers();
    setUsers(fetchedUsers);
  }, []);

  console.log(users);

  return (
    <div>
      <h1>Registered Users</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.username} - {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
