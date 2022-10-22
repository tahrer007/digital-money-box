import React, { useEffect, useState } from "react";
import { makeKey, checkId } from "utils/helper";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "features/auth/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons";
import ShareLink from "./shareLink/ShareLink";
import UsersList from "./usersList/UsersList";

import "./sharedBoxDetails.scss";

const SharedBoxDetails = ({
  newBox,
  boxDetails,
  getSharedBoxDetails,
  disable,
}) => {
  const [boxKey, setBoxKey] = useState(boxDetails?.boxKey || makeKey());
  //const user = useSelector(selectCurrentUser);
  const [isAllowedToReveal, setIsAllowedToReveal] = useState(
    boxDetails?.isAllowedToReveal || false
  );
  const [showShareWindow, setShowShareWindow] = useState(false);
  useEffect(() => {
    if (!boxKey || !newBox) return;
    getSharedBoxDetails({ boxKey, isAllowedToReveal });
  }, [isAllowedToReveal]);

  const handleshareWindow = () => setShowShareWindow(!showShareWindow);

  return (
    <div
      className={"sharedBoxDetailsWrapper"}
      id={newBox ? "newBox" : "details"}
    >
      <div className="details">
        <div className="keyBox">
          <div className="key">Box key: {boxKey} </div>
          {!newBox && (
            <FontAwesomeIcon
              icon={faShareFromSquare}
              onClick={handleshareWindow}
              className="shareIcon"
            />
          )}
        </div>
        <div className="authorized">
          <label>
            <input
              type="checkbox"
              checked={isAllowedToReveal}
              onChange={() => setIsAllowedToReveal(!isAllowedToReveal)}
              disabled={!newBox}
              className="cbx"
            />
            allow users to reveal deposits and history
          </label>
        </div>
      </div>
      {!newBox && (
        <div className="usersListWrapper">
          <h3 className="subtitle">Other users </h3>
          <UsersList boxDetails={boxDetails} />
        </div>
      )}
      {!showShareWindow && (
        <ShareLink boxKey={boxKey} hideWindow={handleshareWindow} />
      )}
    </div>
  );
};
export default SharedBoxDetails;
