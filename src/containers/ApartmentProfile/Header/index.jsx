import routes from "../../../router/RouterPaths";
import React from "react";
import styles from "./index.module.scss";
import { useHistory } from "react-router-dom";

const Header = ({ apartment, dataTestId }) => {
  const history = useHistory();
  return (
    <div className={styles.header} data-testid={dataTestId}>
      <button
        className={styles.primaryButton}
        onClick={() => history.push(routes.APARTMENTS)}
      >
        &lt; BACK
      </button>
      <div className={styles.title}>
        <h1>{apartment.name}</h1>
        <div className={styles.activeStatus}>{apartment.status}</div>
      </div>
      <button className={styles.primaryButton}>EDIT</button>
    </div>
  );
};

export default Header;
