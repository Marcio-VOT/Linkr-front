import React, { useState } from "react";
import useInterval from "use-interval";
import { newPostsCount } from "../../services/search";
import { ReloadeButton } from "./UpdateButtonStyled";
import sync from "../../assets/images/sync.png";
import searchService from "../../services/search";

export const UpdateButton = ({ setUpdate, update, date, config }) => {
  const [count, setCount] = useState(0);
  const { newPostsCount } = searchService();
  useInterval(() => {
    newPostsCount({ date, config })
      .then((res) => {
        setCount(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, 15000);

  function handleReload(e) {
    e.preventDefault();
    setCount(0);
    setUpdate((update) => !update);
  }

  return (
    count > 0 && (
      <>
        <ReloadeButton onClick={handleReload} data-test="load-btn">
          {" "}
          {count} new post{count > 1 && "s"}, load more!{" "}
          <img src={sync} alt="sync" />
        </ReloadeButton>
      </>
    )
  );
};
