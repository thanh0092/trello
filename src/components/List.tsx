import React, {
  Dispatch,
  SyntheticEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Card from "@/components/Card";
import FormListAdd from "./FormListAdd";
import { useLocalStorage } from "@/hook/useLocalStorage";
import { StoreContext } from "@/context/StoreContext";
import { Content, StoreContextProps } from "@/interface";

type Props = {
  content: Content[];
  title: string;
  id: string;
};


const List = ({ title, content, id }: Props) => {
  const inputChangeTitle = useRef<HTMLInputElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isAddCard, setAddCard] = useState<Boolean>(false);
  const [input, setInput] = useState<Boolean>(false);
  const [listData, setListData] = useState(content);
  const [cardValue, setCardValue] = useState(null);
  const [dataUpdate, setDataUpdate] = useState("");
  const [date, setDate] = useState("");
  const { storedValue, setValue, setContent, setId } = useContext<StoreContextProps>(StoreContext);

  const handleSetAddCard = () => {
    setAddCard(true);
  };
  const handleCloseAddCard = () => {
    setAddCard(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setCardValue(e.target.value);
  };
  const handleUpdate = () => {
    setInput(true);
  };
  const handleCancel = () => {
    setInput(false);
  };

  const handleSubmitListUpdate = (dataUpdate: string): void => {
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

  const handleSetListUpdate = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setDataUpdate(e.target.value);
  };
  const onChange = (e: Date) => {
    setDate(e.toLocaleString());
  };
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setAddCard(false);
    storedValue[id].content.push(cardValue);


    setValue((prevState: Record<string, { titleList: string; content: Content[] }>) => {
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
      setListData(updatedValue[id].content);
      return updatedValue;
    });
  };

  useEffect(() => {
    setId(id);
    setContent(listData);
    textAreaRef.current?.focus();
    inputChangeTitle.current?.focus();
  }, [textAreaRef, isAddCard, inputChangeTitle, input, id]);

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
                  onClick={(e: React.MouseEvent<HTMLButtonElement>): void => {
                    handleSubmitListUpdate(dataUpdate);
                  }}
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
      <Card id={id} listData={listData} />
      {isAddCard ? (
        <>
          <FormListAdd
            handleChange={handleChange}
            onChange={onChange}
            date={date}
            textAreaRef={textAreaRef}
            handleCloseAddCard={handleCloseAddCard}
            handleSubmit={handleSubmit}
          />
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
