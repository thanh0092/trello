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
import Modal from '@mui/material/Modal';
import { Box, Typography } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
type Props = {
  content: Content[];
  title: string;
  id: string;
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
const style2 = {
  display: 'flex',
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '10px',
};
const List = ({ title, content, id }: Props) => {
  const inputChangeTitle = useRef<HTMLInputElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isAddCard, setAddCard] = useState<boolean>(false);
  const [input, setInput] = useState<boolean>(false);
  const [listData, setListData] = useState(content);
  const [cardValue, setCardValue] = useState(null);
  const [dataUpdate, setDataUpdate] = useState(null);
  const [date, setDate] = useState(null);
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
    setDataUpdate(storedValue[id].titleList);
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
    setDate(e.toLocaleDateString());
  };
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setAddCard(false);
    if(cardValue.trim()){
      storedValue[id].content.push(cardValue);

      setValue((prevState: Record<string, { titleList: string; content: Content[] }>) => {
        const idContent = Date.now().toString();
        const updatedValue = {
          ...prevState,
          [id]: {
            ...prevState[id],
            content: [
              ...(prevState[id]?.content || []), { id: idContent, title: cardValue, date: date },
            ],
          },
        };
        setListData(updatedValue[id].content);
        return updatedValue;
      });
    }
    
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
        
         <Modal open={input} onClose={handleCancel}>
          <Box sx={style2}>
            <form className="flex flex-col mx-auto">
            <Typography style={{textAlign: 'center',fontWeight: 'bold'}}>Update Title List</Typography>
              <input
                ref={inputChangeTitle}
                className="resize-none rounded-lg w-[100%] min-h-[100px] break-all border-2 border-stone-500 focus:outline-stone-600"
                type="text"
                defaultValue={title}
                onChange={handleSetListUpdate}
              />

              <div className="">
                <button
                  className="bg-slate-100 w-20 mt-2 font-bold p-1 border-2 rounded-lg"
                  onClick={(): void => {
                    handleSubmitListUpdate(dataUpdate);
                  }}
                >
                  Update
                </button>
              </div>
            </form>
            <div className="flex gap-3 flex-col">
              <button
                className="bg-slate-100 w-20 font-bold p-1 border-2 mt-2 rounded-lg"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className="bg-slate-100 w-20 font-bold p-1 border-2 mt-2 rounded-lg"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </Box>
          </Modal>
        
        
            <p>{title}</p>
            <button
              className="bg-slate-100 rounded-2xl p-1"
              onClick={handleUpdate}
            >
              <MoreHorizIcon/>
            </button>
          
        
      </div>
      <hr />
      <Card id={id} listData={listData} />
      <div>
      <Modal open={isAddCard} onClose={() => setAddCard(false)}>
      <Box sx={style}>
        <Typography style={{marginBottom: '10px'}}>Add in <u><strong>{title}</strong></u></Typography>
        <FormListAdd
            handleChange={handleChange}
            onChange={onChange}
            date={date}
            textAreaRef={textAreaRef}
            handleCloseAddCard={handleCloseAddCard}
            handleSubmit={handleSubmit}
            setCardValue={setCardValue}
            cardValue = {cardValue}
            setDate={setDate}
          />
          </Box>
      </Modal>
      </div>
        <button className="bg-slate-300 rounded-lg" onClick={handleSetAddCard}>
          More card
        </button>
    
    </div>
  );
};

export default List;
