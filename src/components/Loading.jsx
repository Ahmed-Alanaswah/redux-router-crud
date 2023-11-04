import { cloneElement } from "react";

const Loading = ({ loading, error, children }) => {
  const elementType = children.type.render?.displayName;
  console.log(elementType);

  const renderElement = () => {
    if (elementType === "Button") {
      const cloneButton = cloneElement(
        children,
        { disabled: true },
        "loading..."
      );
      return (
        <>
          {loading ? (
            cloneButton
          ) : error ? (
            <>
              {children}
              <p> {error}..</p>
            </>
          ) : (
            children
          )}
        </>
      );
    }
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

  return renderElement();
};

export default Loading;
