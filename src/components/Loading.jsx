import React, { cloneElement } from "react";

const Loading = ({ loading, error, children }) => {
  return (
    <>
      {loading ? (
        <p colSpan={3}>please wait...</p>
      ) : error ? (
        <p colSpan={3}> faild to fetch data..</p>
      ) : (
        children
      )}
    </>
  );
};

export default Loading;
