import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useLocalStorage } from "@/hook/useLocalStorage";
import Card from "@/components/Card";

type Props = {
  content: [];
  title: string | null;
  id: Number;
};

const List = ({ title, content, id }: Props) => {
    
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isAddCard, setAddCard] = useState<Boolean>(false);
  const [cardValue, setCardValue] = useState("");

  const [storedValue, setValue, removeValue] = useLocalStorage("list", {});

  const handleSetAddCard = () => {
    setAddCard(true);
  };
  const handleCloseAddCard = () => {
    setAddCard(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCardValue(e.target.value);
  };
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setAddCard(false);
    storedValue[id].content.push(cardValue);
    setValue((prevState) => {
    const updatedValue = {
      ...prevState,
      [id]: {
        ...prevState[id],
        content: [...(prevState[id]?.content || []), cardValue],
      },
    };
    console.log(updatedValue);
    return updatedValue;
  });
  };

  useEffect(() => {
    textAreaRef.current?.focus();
  }, [textAreaRef, isAddCard]);

  return (
    <div className=" rounded-lg  p-2 text-xl flex flex-col justify-center gap-4 w-[300px] max-w-[300px] bg-slate-400">
      <p>{title}</p>
      <hr />
      <Card id={id} data={content} /> <hr />
      {isAddCard ? (
        <>
          <form className="mx-auto">
            <textarea
              ref={textAreaRef}
              onChange={handleChange}
              className="resize-none rounded-lg min-h-[100px] break-all	"
            />
            <div className="flex justify-between">
              <button
                className="bg-slate-300 w-[30%] rounded-lg"
                onClick={handleSubmit}
              >
                Add
              </button>
              <button
                className="bg-slate-300 rounded-lg w-[30%]"
                onClick={handleCloseAddCard}
              >
                Cancel
              </button>
            </div>
          </form>
        </>
      ) : (
        <button className="bg-slate-300 rounded-lg" onClick={handleSetAddCard}>
          More card
        </button>
      )}
    </div>
  );
};

export default List;
