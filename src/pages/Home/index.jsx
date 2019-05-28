import React, { useState } from "react";
import MenuAdminChina from "../../containers/MenuAdminChina";

const Home = (props) => {
  return (
    <MenuAdminChina onChange={props.actionChangePage} logout={props.logout}/>
  );
};

export default Home;
