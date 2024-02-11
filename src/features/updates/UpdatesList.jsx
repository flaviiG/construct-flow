import { useDispatch, useSelector } from "react-redux";
import UpdateCard from "./UpdateCard";
import styles from "./UpdatesList.module.css";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUpdates } from "./updatesSlice";

function UpdatesList({ projectId }) {
  const { is_admin } = useSelector((state) => state.user);

  const [showAddContainer, setShowAddContainer] = useState(false);

  const location = useLocation();

  const { id } = useParams();

  const { updates } = useSelector((state) => state.updates);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if the current path includes "addUpdate"
    const isAddUpdateActive = location.pathname.includes("addUpdate");
    setShowAddContainer(is_admin && isAddUpdateActive);
  }, [is_admin, location.pathname]);

  useEffect(
    function () {
      dispatch(getUpdates(Number(id)));
    },
    [dispatch, id]
  );

  return (
    <div className={styles.updatesContainer}>
      {is_admin && (
        <nav className={styles.nav}>
          <ul>
            <li>
              <NavLink to="addUpdate">+ Add Update</NavLink>
            </li>
          </ul>
        </nav>
      )}

      {showAddContainer ? (
        <Outlet />
      ) : (
        <div className={styles.listContainer}>
          {updates.length === 0 ? (
            <p>No updates yet</p>
          ) : (
            <div className={styles.cardList}>
              {[...updates]
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .map((update) => (
                  <UpdateCard key={update.id} update={update} />
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UpdatesList;
