import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { BOXES_TYPES, PRIVATE_BOX, SHARED_BOX } from "services/const";
import InputField from "components/reusables/InputField/InputField";
//import RadioButton from "components/radioButton/RadioButton";
import SharedBoxDetails from "components/boxDetails/sharedBoxDetails/SharedBoxDetails";
import "./createBox.scss";
import { useAddNewBoxMutation } from "features/boxes/boxesSlice";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from "features/auth/authSlice";
import Label from "components/reusables/form/label/Label";
import Instructions from "components/reusables/form/instructions/Instructions";

const CreateBox = () => {
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [addNewBox, { isLoading }] = useAddNewBoxMutation();
  const [boxName, setBoxName] = useState("");
  const [validName, setValidName] = useState(false);

  const [userFocus, setUserFocus] = useState(false);
  const [boxType, setBoxType] = useState(PRIVATE_BOX);
  const [errMsg, setErrMsg] = useState("");
  const [sharedBoxDetails, setSharedBoxDetails] = useState({});

  useEffect(() => {
    setValidName(boxName ? true : false);
  }, [boxName]);

  useEffect(() => {
    setErrMsg("");
  }, [boxName]);

  const canSave = Boolean(boxName) && !isLoading;

  const onChangeSelection = (e) => {
    setBoxType(parseInt(e.target.value));
    if (!parseInt(e.target.value)) setSharedBoxDetails({});
  };

  const getSharedBoxDetails = ({ boxKey, isAllowedToReveal }) =>
    setSharedBoxDetails({ boxKey, isAllowedToReveal });

  const onCreateBoxClick = async () => {
    const { boxKey, isAllowedToReveal } = sharedBoxDetails;

    if (canSave) {
      try {
        await addNewBox({
          boxName,
          type: boxType,
          boxKey,
          isAllowedToReveal,
          userId: user._id,
        }).unwrap();

        setBoxName("");
        setSharedBoxDetails({});

        navigate("/welcome");
      } catch (err) {
        console.error("Failed to save the post", err);
      }
    }
  };

  return (
    <div className="pageContainer newBoxPage">
      <div className="boxDetails">
        <Label
          htmlFor={"boxName"}
          valid1={validName}
          valid2={true}
          labelName={"Box name : "}
        />
        <input
          type="text"
          id="boxName"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setBoxName(e.target.value)}
          value={boxName}
          required
          //aria-invalid={validName ? "false" : "true"}
          //aria-describedby="uidnote"
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        />
        <Instructions
          className={userFocus && user && !validName}
          id="uidnote"
        />
        <div className="optionsBox">
          <input
            className="radioBtn"
            type="radio"
            value={PRIVATE_BOX}
            name={PRIVATE_BOX}
            checked={boxType === PRIVATE_BOX}
            onChange={(e) => onChangeSelection(e)}
          />
          Private box
          <input
            className="radioBtn"
            type="radio"
            value={SHARED_BOX}
            name={SHARED_BOX}
            checked={boxType === SHARED_BOX}
            onChange={(e) => onChangeSelection(e)}
          />
          Shared box
        </div>
      </div>
      {boxType ? (
        <SharedBoxDetails
          newBox={true}
          getSharedBoxDetails={getSharedBoxDetails}
        />
      ) : null}
      <div className="createBtn">
        <button type="button" disabled={!canSave} onClick={onCreateBoxClick}>
          Create Box
        </button>
      </div>
    </div>
  );
};

export default CreateBox;
