import styles from "./CustomerPage.module.css";
import CustomerNav from "../ui/CustomerNav";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { logoutRed } from "../features/user/userSlice";
import RequestsList from "../features/requests/RequestsList";
import { useState } from "react";
import AddProjectContainer from "../ui/AddProjectContainer";
import { addProject } from "../features/projects/projectsSlice";

function CustomerPage() {
  const { customerId, firstName, lastName } = useParams();
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

  function handleAddProject(name, description, image, budget) {
    const newProject = { name, description, image, budget };

    dispatch(addProject(newProject));
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
        <div className={styles.layout}>
          <RequestsList requests={{}} />
        </div>
      </div>
      {showAdd === true ? (
        <div className={styles.allPage}>
          <AddProjectContainer
            handleAddProject={handleAddProject}
            handleClose={() => setShowAdd(false)}
          />
        </div>
      ) : null}
    </>
  );
}

export default CustomerPage;
