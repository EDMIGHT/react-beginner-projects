import React, { useEffect, useState } from "react";
import "./index.scss";
import { Success } from "./components/Success";
import { Users } from "./components/Users";

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = useState([]);
  const [invites, setInvites] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [succes, setSucces] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetch("https://reqres.in/api/users")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setUsers(json.data);
      })
      .catch((err) => {
        console.warn(err);
        alert("ERROR");
      })
      .finally(() => setLoading(false));
  }, []);

  const onChangeSeacrhValue = (event) => {
    setSearchValue(event.target.value);
  };

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites((prev) => prev.filter((_id) => _id !== id));
    } else {
      setInvites((prev) => [...prev, id]);
    }
  };

  const onClickSendInvites = () => {
    setSucces(true);
  };

  return (
    <div className="App">
      {succes ? (
        <Success count={invites.length} />
      ) : (
        <Users
          onClickSendInvites={onClickSendInvites}
          isLoading={isLoading}
          invites={invites}
          onClickInvite={onClickInvite}
          items={users}
          searchValue={searchValue}
          onChangeSeacrhValue={onChangeSeacrhValue}
        />
      )}
    </div>
  );
}

export default App;
