import { useLocalStorage } from "@/hook/useLocalStorage";
import type { NextPage } from "next";
import React, { useContext, useEffect, useRef, useState } from "react";
import List from "@/components/List";
import { StoreContext } from "@/context/StoreContext";
import { StoreContextProps, TodoSchema } from "@/interface";
import { ReactSortable } from "react-sortablejs";

const WorkSpace: NextPage<TodoSchema> = () => {
  const textAreaRef = useRef<HTMLInputElement | null>(null);
  const [isAddCard, setAddCard] = useState<Boolean>(false);
  const { storedValue, setValue } = useContext<StoreContextProps>(StoreContext);
  const [todoData, setTodoData] = useState<TodoSchema>({
    content: [],
    titleList: null,
  });
  const [data, setData] = useState<Record<string, TodoSchema>>({});
console.log(data);

  const handleSetAddCard = () => {
    setAddCard(true);
  };

  const handleCloseAddCard = () => {
    setAddCard(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoData({
      titleList: e.target.value,
      content: [],
    });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newId = Date.now().toString();
    if(todoData.titleList && todoData.titleList.trim()){
      setValue((prev: any) => ({
        ...prev,
        [newId]: todoData,
      }));
    }
    setTodoData({
      content: [],
      titleList: null,
    })
    setAddCard(false);
  };

  useEffect(() => {
    textAreaRef.current?.focus();
  }, [isAddCard]);
  useEffect(() => {
    setData(storedValue);
  }, [storedValue, data]);
  return (
    <>
      <div className="font-bold min-w-fit w-[100%] bg-slate-300 p-4 text-center">
        WorkSpace
      </div>

      <div className="flex gap-5 mt-3">
        {Object.keys(data).length !== 0 && (
          <>
            {Object.keys(data).map((item: string, index) => {
              const dataItem = data[item];
              
              return (
                <div key={item}>
                  <List
                    id={item}
                    title={dataItem?.titleList}
                    content={dataItem?.content}
                  />
                </div>
              );
            })}
          </>
        )}

        <div>
        <div className="bg-slate-400 p-4 text-xl rounded-lg">
          <div className="flex flex-col">
          <div>
            <p>Add List</p>
          </div>
          <hr />

          {isAddCard ? (
            <form className="mt-2" onSubmit={handleSubmit}>
              <input
                ref={textAreaRef}
                className="resize-none rounded-lg min-h-[100px] break-all"
                onChange={handleChange}
                
              />
              <div className="flex justify-between mt-3">
                <button
                  className="bg-slate-300 w-[30%] rounded-lg"
                  type="submit"
                >
                  Add
                </button>
                <button
                  className="bg-slate-300 rounded-lg w-[30%]"
                  type="button"
                  onClick={handleCloseAddCard}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button
              className="rounded-lg text-xl h-[50px] w-[300px]"
              onClick={handleSetAddCard}
            >
              Add More List
            </button>
          )}
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default WorkSpace;
