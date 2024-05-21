import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useLocalStorage } from "@/hook/useLocalStorage";
import Card from "@/components/Card";
import { Calendar } from 'react-calendar';

type Props = {
  content: [];
  title: string;
  id: Number;
};

const List = ({ title, content, id }: Props) => {
  const inputChangeTitle = useRef<HTMLInputElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [option,setOption] = useState(false)
  const [isAddCard, setAddCard] = useState<Boolean>(false);
  const [input, setInput] = useState<Boolean>(false);
  const [cardValue, setCardValue] = useState("");
  const [dataUpdate, setDataUpdate] = useState("");
  const [date, setDate] = useState("");

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
  const handleUpdate = () => {
    setInput(true);
  };
  const handleCancel = () => {
    setInput(false);
  };
  const handleSubmitListUpdate = () => {
    setValue((prev) => {
      return {
        ...prev,
        [id]: {
          ...prev[id],
          titleList: dataUpdate,
        },
      };
    });
    setInput(false);
  };
  const handleDelete = () => {
    const result = delete storedValue[id];
    setValue({
      ...storedValue,
    });
    return result;
  };
  const handleSetListUpdate = (e) => {
    setDataUpdate(e.target.value);
  };
  const onChange = (e) => {
    setDate(e.toLocaleString());
  };
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setAddCard(false);
    storedValue[id].content.push(cardValue);
    setValue((prevState) => {
      const idContent = Date.now().toString();
      const updatedValue = {
        ...prevState,
        [id]: {
          ...prevState[id],
          content: [
            ...(prevState[id]?.content || []),
            { id: idContent, title: cardValue, date: date },
          ],
        },
      };
      return updatedValue;
    });
  };

  useEffect(() => {
    textAreaRef.current?.focus();
    inputChangeTitle.current?.focus();
  }, [textAreaRef, isAddCard, inputChangeTitle, input]);

  return (
    <div className=" rounded-lg  p-2 text-xl flex flex-col justify-center gap-4 w-[300px] max-w-[300px] bg-slate-400">
      <div className="flex justify-between">
        {input ? (
          <div>
            {" "}
            <form className="flex flex-col w-[250px] mx-auto">
              <input
                ref={inputChangeTitle}
                className=""
                type="text"
                defaultValue={title}
                onChange={handleSetListUpdate}
              />

              <div className="flex justify-between">
                <button
                  className="bg-slate-100 w-20 mt-2 rounded-lg"
                  onClick={handleSubmitListUpdate}
                >
                  Update
                </button>
              </div>
            </form>
            <div className="flex justify-between">
              <button
                className="bg-slate-100 w-20 mt-2 rounded-lg"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className="bg-slate-100 w-20 mt-2 rounded-lg"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <p>{title}</p>
            <button
              className="bg-slate-100 rounded-2xl p-1"
              onClick={handleUpdate}
            >
              Open
            </button>
          </>
        )}
      </div>
      <hr />
      <Card id={id} data={content} />
      {isAddCard ? (
        <>
          <form className="mx-auto">
            <textarea
              ref={textAreaRef}
              onChange={handleChange}
              className="resize-none rounded-lg min-h-[100px] break-all	"
            />
            <Calendar className="bg-slate-400" value={date} onChange={onChange}/>

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
