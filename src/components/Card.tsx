import { useLocalStorage } from "@/hook/useLocalStorage";
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Calendar } from 'react-calendar';

type Card = {
  id: string | number;
  data: Content[]
};
type Content = {
  id: string;
  title: string;
};
type ContentItem = {
  id: string;
  title: string;
  date: string; 
}

type Data = {
  [key: number]: {
    titleList: string;
    content: ContentItem[];
  };
}

const Card = (data: Card) => {
  const initdata: Content = {
    id: "",
    title: ""
  }
  const inputRef = useRef(null);
  const [updateContent, setUpdateContent] = useState<Content>(initdata);
  const [isInput, setInput] = useState<Boolean>(false);
  const [dataUpdate, setDataUpdate] = useState("");
  const [date,setDate] = useState("")
  const handleGetContent = (id: String) => {
    const dataSelect = data.data.find((data) => data.id === id);
    return dataSelect;
  };
  const [storedValue, setValue, removeValue] = useLocalStorage("list", {});

  const handleInput = () => {
    setInput(true);
    setDataUpdate(updateContent.title);
  };
  const handleClose = () => {
    setInput(false);
  };
  const handleFixCard = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDataUpdate(e.target.value);
  };
  const handleDelete = () => {
    setValue((prev: Data) => {
      console.log(prev);
      
      return {
        ...prev,
        [data.id]: {
          ...prev[data.id],
          content: [
            ...(prev[data.id]?.content ?? []).filter((item: Content) => {
              return item.id !== updateContent.id;
            }),
          ],
        },
      };
    });
  };
  const handleUpdate = (e: SyntheticEvent) => {
    e.preventDefault();
    setValue((prev: Card) => {
      return {
        ...prev,
        [data.id]: {
          ...prev[data.id],
          content: [
            ...(prev[data.id]?.content ?? []).map((item: Content) => {
              if (item.id === updateContent.id) {
                return {
                  ...item,
                  title: dataUpdate,
                  date: date
                };
              }
              return item;
            }),
          ],
        },
      };
    });
    setInput(false);
  };
  useEffect(() => {
    inputRef.current?.focus();
    setUpdateContent;
  }, [inputRef, isInput]);
  useEffect(() => {
    setDataUpdate(updateContent?.title);
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

      return () => {
        item.removeEventListener("click", handleClick);
      };
    });
  }, [data, updateContent]);
  const onChange = (e) => {
    setDate(e.toLocaleString());
    
  }
  return (
    <>
      {data.data.length > 0 ? (
        <>
          {data.data.map((item: [], index) => {
            return (
              <>
                {isInput && item?.id === updateContent?.id ? (
                  <form onSubmit={handleUpdate} >
                    <input
                      type="text"
                      className="w-[250px] mb-3"
                      ref={inputRef}
                      defaultValue={item.title}
                      onChange={handleFixCard}
                    />
                    <Calendar onClickDay={onChange} dateFormat="dd/mm/yy" showIcon/>

                    <div className="flex justify-between">
                      <button>Fix</button>
                      <button
                        className="bg-slate-300 rounded-lg w-[30%]"
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                      <button onClick={handleClose}>Cancel</button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div
                      key={item.id}
                      className="item"
                      data-id={item.id}
                      onClick={handleInput}
                    >
                      <p>{item.date}</p>
                      <p className="break-all bg-slate-500 p-2 rounded-lg">
                        {item.title}
                      </p>

                      <hr />
                    </div>
                  </>
                )}
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
