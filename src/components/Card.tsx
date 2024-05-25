import { useLocalStorage } from "@/hook/useLocalStorage";
import React, {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ReactSortable } from "react-sortablejs";
import FormCardUpdate from "./FormCardUpdate";
import CardItem from "./CardItem";

type Card = {
  id: string;
  data: Content[];
};
type Content = {
  id: string;
  title: string;
  date: String;
};
type ContentItem = {
  id: string;
  title: string;
  date: string;
};

type Data = {
  [key: number]: {
    titleList: string;
    content: ContentItem[];
  };
};

const Card = ({ data, id }: Card) => {

  
  const initdata: Content = {
    id: "",
    title: "",
    date: "",
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const [updateContent, setUpdateContent] = useState<Content>(initdata);

  const [isInput, setInput] = useState<Boolean>(false);
  const [dataUpdate, setDataUpdate] = useState("");
  const [date, setDate] = useState("");
  const [list, setList] = useState<Content[]>(data);

  
  const handleGetContent = (id: String) => {
    const dataSelect = data.find((data) => data.id === id);
    
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
      return {
        ...prev,
        [id]: {
          ...prev[id],
          content: [
            ...(prev[id]?.content ?? []).filter((item: Content) => {
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
        [id]: {
          ...prev[id],
          content: [
            ...(prev[id]?.content ?? []).map((item: Content) => {
              if (item.id === updateContent.id) {
                return {
                  ...item,
                  title: dataUpdate,
                  date: date,
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

  const handleUpdateSort = useCallback(
    (newData: Content[]) => {
      setValue((prev) => {
        return {
          ...prev,
          [id]: {
            ...prev[id],
            content: newData,
          },
        };
      });
    },
    [setValue]
  );
  useEffect(() => {
    handleUpdateSort(list);
  }, [list, handleUpdateSort]);

  

  const onChange = (e) => {
    setDate(e.toLocaleString());
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef, isInput]);
  useEffect(() => {
    setDataUpdate(updateContent?.title);
    const items = document.querySelectorAll(".item");

    items.forEach((item) => {
      const handleClick = (event: Event) => {
        const targetElement = event.currentTarget as HTMLElement;
        const contentParagraph = targetElement.querySelector("p") as HTMLParagraphElement;
        if (contentParagraph) {
          const contentId = targetElement.getAttribute("data-id") || "";
          const clickedContent = handleGetContent(contentId);
          setUpdateContent(clickedContent);
        }
      };

      item.addEventListener("click", handleClick);

      return () => {
        item.removeEventListener("click", handleClick);
      };
    });
  }, [data, updateContent]);

  return (
    <>
      <ReactSortable
        group={"list"}
        filter=".addImageButtonContainer"
        dragClass="sortableDrag"
        list={list}
        setList={(newList: Content[]) => {
          setList(newList);
          
          // handleUpdateSort(newList);
        }}
        animation={200}
        easing="ease-out"
      >
        {data.map((item: Content, index) => {
          return (
            <>
              {isInput && item?.id === updateContent?.id ? (
                <FormCardUpdate
                  handleUpdate={handleUpdate}
                  inputRef={inputRef}
                  item={item}
                  handleFixCard={handleFixCard}
                  onChange={onChange}
                  date={date}
                  handleDelete={handleDelete}
                  handleClose={handleClose}
                />
              ) : (
                <>
                  <CardItem item={item} handleInput={handleInput} />
                </>
              )}
            </>
          );
        })}
      </ReactSortable>
    </>
  );
};

export default Card;
