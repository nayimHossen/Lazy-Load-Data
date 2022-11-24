import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import useLazyLoad from "../utils/useLazyLoad";
import ProfilePlaceHolder from "../utils/ProfilePlaceHolder";
import Profile from "./Profile";

const NUM_PER_PAGE = 1;
const TOTAL_PAGES = 10;

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const triggerRef = useRef(null);
  const onGrabData = (currentPage) => {
    // This would be where you'll call your API
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = users.slice(
          ((currentPage - 1) % TOTAL_PAGES) * NUM_PER_PAGE,
          NUM_PER_PAGE * (currentPage % TOTAL_PAGES)
        );
        resolve(data);
      }, 1000);
    });
  };

  const { data, loading } = useLazyLoad({ triggerRef, onGrabData });
  console.log(data);

  return (
    <>
      <div className="container mx-auto px-5">
        {data.map((image) => {
          return (
            <Profile owner={image["owner"]} imageUrl={image["imageUrl"]} />
          );
        })}
      </div>
      {data.length !== 10 && (
        <div
          ref={data.length !== 10 ? triggerRef : null}
          className={clsx("trigger", { visible: loading })}
        >
          <ProfilePlaceHolder />
        </div>
      )}
    </>
  );
};

export default Home;
