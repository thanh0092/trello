import { useLocalStorage } from "@/hook/useLocalStorage";
import type { NextPage } from "next";
import React, { Key, useEffect, useRef, useState } from "react";
import List from "@/components/List";

type Props = {};
type TodoSchema = {
  titleList: string | null;
  content: string[];
  // date: Date | null;
};

const WorkSpace: NextPage<Props> = (props: Props) => {
  const textAreaRef = useRef<HTMLInputElement | null>(null);
  const [isAddCard, setAddCard] = useState<Boolean>(false);
  const [todoData, setTodoData] = useState<TodoSchema>({
    content: [],
    titleList: null,
    // date: null,
  });
  const [data,setData] = useState<TodoSchema | {}>({})
  const [storedValue, setValue, removeValue] = useLocalStorage<
    Record<string, TodoSchema>
  >("list", {});

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
    setValue((prev) => ({
      ...prev,
      [newId]: todoData,
    }));
    setAddCard(false);
  };

  useEffect(() => {
    textAreaRef.current?.focus();
  }, [isAddCard]);
  useEffect(() => {
    setData(storedValue)
  },[storedValue,data])
  return (
    <>
      <div className="font-bold min-w-fit w-[100%] bg-slate-300 p-4 text-center">
        WorkSpace
      </div>

      <div className="flex gap-5 mt-3">
        {Object.keys(data).length !== 0 && (
          <>
            {Object.keys(data).map((item: Key,index) => {
              const dataItem = data[item];
              return (
                <div key={item}>
                  <List
                    id={Number(item)}
                    title={dataItem?.titleList}
                    content={dataItem?.content}
                  />
                </div>
              );
            })}
          </>
        )}

        <div className="bg-slate-400 p-4 h-[100px] max-h-[200px] text-xl rounded-lg">
          <div>
            <p>Add List</p>
          </div>
          <hr />

          {isAddCard ? (
            <form className="w-[300px] mt-2" onSubmit={handleSubmit}>
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
    </>
  );
};

export default WorkSpace;
