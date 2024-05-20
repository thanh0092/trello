import React, { useEffect, useState } from "react";

type Props = {
  data: [];
  id: Number;
};

const Card = (data: Props) => {
  const [updateContent, setUpdateContent] = useState("");
  const handleGetContent = (id) => {
    const dataSelect = data.data.find((data) => data.id === id);
    return dataSelect;
  };

  useEffect(() => {
    const items = document.querySelectorAll(".item");

    items.forEach((item) => {
      const handleClick = (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        const paragraph = target.querySelector("p");
        if (paragraph) {
          const id = target.getAttribute("data-id") || "";
          setUpdateContent(handleGetContent(id));
        }
      };

      item.addEventListener("click", handleClick);

      // Cleanup event listeners on component unmount
      return () => {
        item.removeEventListener("click", handleClick);
      };
    });
  }, [data]);

  return (
    <>
      {data.data.length > 0 ? (
        <>
          {data.data.map((item: [], index) => {
            return (
              <>
                <div key={item.id} className="item" data-id={item.id}>
                  <p className="break-all">{item.title}</p>
                </div>
              </>
            );
          })}
        </>
      ) : (
        "No data"
      )}
    </>
  );
};

export default Card;
