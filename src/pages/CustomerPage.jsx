import styles from "./CustomerPage.module.css";
import CustomerNav from "../ui/CustomerNav";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { logoutRed } from "../features/user/userSlice";
import RequestsList from "../features/requests/RequestsList";
import { useState } from "react";
import AddProjectContainer from "../ui/AddProjectContainer";
import { addRequest } from "../features/requests/requestsSlice";

function CustomerPage() {
  const { id, firstName, lastName } = useSelector((state) => state.user);
  const [showAdd, setShowAdd] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  function handleAdd() {
    setShowAdd(true);
  }

  function handleLogout() {
    dispatch(logoutRed());
    navigate("/");
  }

  function handleAddRequest(selected_id, name, description, image, budget) {
    const newRequest = { user_id: id, name, description, image, budget };

    dispatch(addRequest(newRequest));
    setShowAdd(false);
  }

  return (
    <>
      <div className={showAdd === true ? styles.pageBlur : styles.page}>
        <CustomerNav
          firstName={firstName}
          lastName={lastName}
          handleAdd={handleAdd}
          handleLogout={handleLogout}
        />
        <Outlet />
      </div>
      {showAdd === true ? (
        <div className={styles.allPage}>
          <AddProjectContainer
            handleAddProject={handleAddRequest}
            handleClose={() => setShowAdd(false)}
          />
        </div>
      ) : null}
    </>
  );
}

export default CustomerPage;
