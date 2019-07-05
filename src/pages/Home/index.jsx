import React from "react";
import MenuAdminChina from "../../containers/MenuAdminChina";
import MenuAdminIndonesia from "../../containers/MenuAdminIndonesia";


const Home = (props) => {
  return (
    props.authority === "china" ?
    <MenuAdminChina onChange={props.actionChangePage} logout={props.logout}/>:
    <MenuAdminIndonesia onChange={props.actionChangePage} logout={props.logout}/>
  );
};

export default Home;
