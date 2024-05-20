import { useLocalStorage } from "@/hook/useLocalStorage";
import type { NextPage } from "next";
import React, { Key, useEffect, useRef, useState } from "react";
import List from "@/components/List";

type Props = {};
type TodoSchema = {
  titleList: string | null;
  content: [];
  //   date: Date | null;
};
const WorkSpace = (props: Props) => {
  let list = [];
  const textAreaRef = useRef<HTMLInputElement | null>(null);
  const [isAddCard, setAddCard] = useState<Boolean>(false);
  const [todoData, setTodoData] = useState<TodoSchema>({
    content: [],
    titleList: null,
    // date: null,
  });

  const [storedValue, setValue, removeValue] = useLocalStorage("list", []);
  const [listValue, setListValue, removeListValue] = useLocalStorage(
    "store",
    []
  );
  const handleSetAddCard = () => {
    setAddCard(true);
  };
  const handleCloseAddCard = () => {
    setAddCard(false);
  };
  //   const now : Date = new Date;
  //   const date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
  //   const time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
  //   const dateTime = date + ' ' + time;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoData({
      titleList: e.target.value,
      content: [],
    });
  };
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    list.push(todoData);
    setAddCard(false);
    
    // setValue((pre) => {
    //     const updateList = {
    //        ...pre,...list
    //     }
    //     return updateList
    // } );
  };
  useEffect(() => {
    textAreaRef.current?.focus();
  }, [textAreaRef, isAddCard]);
  return (
    <>
      <div className="font-bold min-w-fit w-[100%] bg-slate-300 p-4 text-center">
        WorkSpace
      </div>

      <div className="flex gap-5 mt-3">
        {storedValue.length != 0 && (
          <>
            {Object.keys(storedValue).map((item: Key, index) => {
              const data = storedValue[item];
              return (
                <div>
                  <List
                    key={item}
                    id={index}
                    title={data.titleList}
                    content={data.content}
                  />
                </div>
              );
            })}
          </>
        )}

        <div className="bg-slate-400 p-4 h-[100px] max-h-[200px] text-xl rounded-lg">
          <div>
            {" "}
            <p>Add List</p>
          </div>
          <hr />

          {isAddCard ? (
            <>
              <form className="w-[300px] mt-2">
                <input
                  ref={textAreaRef}
                  className="resize-none rounded-lg min-h-[100px] break-all"
                  onChange={handleChange}
                />
                <div className="flex justify-between  mt-3">
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
            <button
              className="rounded-lg text-xl h-[50px]  w-[300px] "
              onClick={handleSetAddCard}
            >
              Add More List
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default WorkSpace;
