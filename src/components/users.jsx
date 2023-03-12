import React, {useState} from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const renderQuantity = () => {
    console.log(users);
    if (users.length > 4) {
      return `С тобой тусанут ${users.length} человек`;
    } else if (users.length > 1) {
      return `С тобой тусанeт ${users.length} человекa`;
    } else if (users.length > 0) {
      return `С тобой тусанeт ${users.length} человек`;
    }
  };

  const renderQualities = (user) => {
    return user.qualities.map((quality) => (
      <span className={"badge m-1 bg-" + quality.color}>{quality.name}</span>
    ));
  };

  const handleDelete = (id) => {
    setUsers((prevState) => prevState.filter((user) => user !== id));
    console.log(id);
  };

  const renderUsers = () => {
    return (
      users.length !== 0 &&
      users.map((user) => (
        <tr key={user._id}>
          <td>{user.name}</td>
          <td>{renderQualities(user)}</td>
          <td>{user.profession.name}</td>
          <td>{user.completedMeetings}</td>
          <td>{user.rate}</td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(user)}
            >
              delete
            </button>
          </td>
        </tr>
      ))
    );
  };
  if (users.length === 0) {
    return (
      <h1 className="d-inline-block rounded bg-danger text-white m-1 p-1">
        Никто с тобой не тусанeт
      </h1>
    );
  }
  return (
    <>
      <h1 className="d-inline-block rounded bg-primary text-white m-1 p-1">
        {renderQuantity()}
      </h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{renderUsers()}</tbody>
      </table>
    </>
  );
};

export default Users;
