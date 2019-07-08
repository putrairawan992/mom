import React from "react";
import { PulseLoader } from "react-spinners";
import { css } from "@emotion/core";
import propTypes from 'prop-types';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

const LoaderItem = ({size, loading}) => {
  return (
    <PulseLoader
      css={override}
      sizeUnit={"px"}
      size={size}
      color={"#FB6900"}
      loading={loading}
    />
  );
};

LoaderItem.propType = {
    size : propTypes.number,
    loading : propTypes.boolean
}

export default LoaderItem;
