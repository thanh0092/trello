import { useLocalStorage } from "@/hook/useLocalStorage";
import React, {
  SyntheticEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ReactSortable } from "react-sortablejs";
import FormCardUpdate from "./FormCardUpdate";
import CardItem from "./CardItem";
import { StoreContext } from "@/context/StoreContext";
import { Content, StoreContextProps } from "@/interface";
import { Box, Modal, Typography } from "@mui/material";

type CardProps = {
  id: string;
  listData: Content[];
};
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',

};

const Card = ({ id,listData }: CardProps) => {
  const initdata: Content = {
    id: "",
    title: "",
    date: "",
  };
  
  const { storedValue, setValue } = useContext<StoreContextProps>(StoreContext);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [updateContent, setUpdateContent] = useState<Content>(initdata);
  const [isInput, setInput] = useState<Boolean>(false);
  const [dataUpdate, setDataUpdate] = useState("");
  const [date, setDate] = useState(null);
  const [list, setList] = useState<Content[]>(storedValue[id]?.content);
  
  const handleGetContent = (contentId: string) => {
    return list.find((data) => data.id === contentId);
  };

  const handleInput = () => {
    setInput(true);
    setDataUpdate(updateContent.title);
  };

  const handleClose = () => {
    setInput(false);
  };

  const handleFixCard = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setDataUpdate(e.target.value);
  };

  const handleDelete = () => {
    setValue((prev) => {
      const newContent = (prev[id]?.content ?? []).filter(
        (item: Content) => item.id !== updateContent.id
      );
      setList(newContent);
      return {
        ...prev,
        [id]: {
          ...prev[id],
          content: newContent,
        },
      };
    });
  };

  const handleUpdate = (e: SyntheticEvent) => {
    e.preventDefault();
    setValue((prev) => {
      
      const newContent = (prev[id]?.content ?? []).map((item: Content) => {
        if (item.id === updateContent.id) {
          return {
            ...item,
            title: dataUpdate,
            date: date,
          };
        }
        return item;
      });
      setList(newContent);
      return {
        ...prev,
        [id]: {
          ...prev[id],
          content: newContent,
        },
      };
    });
    setInput(false);
    setDate(null)
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
      setList(newData); // Update local state immediately
    },
    [setValue, id]
  );

  useEffect(() => {
    handleUpdateSort(list);
  }, [list, handleUpdateSort]);
  useEffect(() => {
    setList(listData);
  },[listData])
  const onChange = (e: Date) => {
    
    setDate(e.toLocaleDateString());
  };
  
  useEffect(() => {
    if (isInput) {
      inputRef.current?.focus();
    }
  }, [isInput]);

  useEffect(() => {
    const items = document.querySelectorAll(".item");

    const handleClick = (event: Event) => {
      const targetElement = event.currentTarget as HTMLElement;
      const contentId = targetElement.getAttribute("data-id") || "";
      const clickedContent = handleGetContent(contentId);
      if (clickedContent) {
        setUpdateContent(clickedContent);
        setDate(clickedContent.date);
      }
    };

    items.forEach((item) => {
      item.addEventListener("click", handleClick);
    });

    return () => {
      items.forEach((item) => {
        item.removeEventListener("click", handleClick);
      });
    };
  }, [list]);

  return (
    <ReactSortable
      group={"list"}
      filter=".addImageButtonContainer"
      dragClass="sortableDrag"
      list={list}
      setList={(newList: Content[]) => setList(newList)}
      animation={200}
      easing="ease-out"
    >
      {list.map((item: Content) => (
        <React.Fragment key={item.id}>
          <Modal open={isInput && item?.id === updateContent?.id} onClose={handleClose}>

          <Box sx={style}>
            <Typography style={{marginBottom: "10px"}}>Fix <u><strong>{item.title}</strong></u> in <u><strong>{storedValue[id]?.titleList}</strong></u> </Typography>
            <FormCardUpdate
              handleUpdate={handleUpdate}
              inputRef={inputRef}
              item={item}
              handleFixCard={handleFixCard}
              onChange={onChange}
              date={item.date}
              handleDelete={handleDelete}
              handleClose={handleClose}
              />
            </Box>
              </Modal>
          
          <CardItem item={item} handleInput={handleInput} />
        </React.Fragment>
      ))}
    </ReactSortable>
  );
};

export default Card;
