import React, { useState, useEffect } from "react";
import SharedBoxDetails from "components/boxDetails/sharedBoxDetails/SharedBoxDetails";
import enGB from "date-fns/locale/en-GB";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { changeDateFormate } from "services/dateAndTimeFormate";
import "./boxDetails.scss";
import Footer from "components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import InnerButton from "components/boxDetails/innerButtons/InnerButton";
const SavingBox = () => {
  const { boxId } = useParams();
  const location = useLocation();
  const { box } = location.state;
  console.log(box);
  //const box = useSelector((state) => selectAllBoxes(state));

  useEffect(() => {
    console.log(box);
  }, [box]);

  const lastUpdate = () => {
    console.log(box.depositsHistory);
  };
  lastUpdate();
  if (!box) return;

  const getSharedBoxDetails = ({ boxKey, isAllowedToReveal }) =>
    console.log(boxKey, isAllowedToReveal);

  const historyArrLength = box.depositsHistory.length;

  return (
    <section className="innerContainer boxdetailsSection">
      <header>
        <div className="title">
          <h2>{box.boxName}</h2>
        </div>
        <div className="otherDetails">
          <div className="dates">
            created at : {changeDateFormate(box.createdAt)}
          </div>

          <div className="reward">
            <FontAwesomeIcon icon={faStar} />
            deposits counter : <span>{historyArrLength}</span>
          </div>
          <div className="icon">
            <FontAwesomeIcon icon={box.type ? faUsers : faUser} />
          </div>
        </div>
      </header>
      <main>
        <div className="dates">
          {/*//TODO : change the time formte */}
          Last update at : {box.depositsHistory[historyArrLength - 1].deposit}
        </div>
        {box?.type ? (
          <SharedBoxDetails
            newBox={false}
            getSharedBoxDetails={getSharedBoxDetails}
            boxDetails={box}
          />
        ) : null}
        <InnerButton box={box} />
      </main>
      <Footer />
    </section>
  );
};

export default SavingBox;

/*<div className="pageContainer boxDetails">
      
   
      <div className="buttonsBox">
        <div className="deposit">
          <Link to={`../deposit/${box._id}`}>deposit</Link>
        </div>
        <div className="history">history</div>
        <div className="save">save</div>
      </div>
    </div>*/
