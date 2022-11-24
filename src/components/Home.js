import { useEffect, useState } from "react";
import Profile from "./Profile";

function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      {users.map((user) => (
        <Profile key={user.id} user={user} />
      ))}
    </div>
  );
}

export default Home;
