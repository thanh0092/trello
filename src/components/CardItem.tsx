import React from "react";

type Props = {
    item : Item,
    handleInput: () => void
};
type Item = {
  id: string;
  title: string;
  date: String;
};
const CardItem = ({ item, handleInput }: Props) => {
  return (
    <div
      key={item?.id}
      className="item m-3"
      data-id={item?.id}
      onClick={handleInput}
    >
      <p>{item?.date}</p>
      <p className="break-all bg-slate-500 p-2 rounded-lg">{item?.title}</p>

      <hr />
    </div>
  );
};

export default CardItem;
