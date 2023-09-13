import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";

import { Modal } from "../modal/modal";
import { Button } from "../layout/button/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListDots } from "@fortawesome/free-solid-svg-icons";

import { selectAdminIdentity, setAdmin } from "../../redux/administrator/adminSlice";

export default function LogOut() {
  const dispatch = useAppDispatch();
  const adminName = useTypedSelector(selectAdminIdentity);

  const [showAdmin, setShowAdmin] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <div className="header-reception">
        <div className="washer-logo" >
          <h2>WASHER</h2>
        </div>
        <span onClick={() => setShowAdmin(!showAdmin)}><FontAwesomeIcon icon={faListDots} /></span>
      </div>

      <Modal open={showAdmin} close={() => setShowAdmin(!showAdmin)}>
        <div className="info-mobile">
          <div className="animation-0">
            <p>Administrator</p>
            <span>{adminName}</span>
          </div>
          <Button
            default
            onClickFunction={() => {
              dispatch(setAdmin({
                id: null,
                identity: null,
                token: null,
                refreshToken: null,
                tokenExpire: null
              }));
              navigate("/");
            }}
            title="Odjava administratora" />
        </div>
      </Modal>
    </>
  );
}