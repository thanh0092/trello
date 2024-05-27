import React, { Dispatch, Ref, SyntheticEvent, useEffect } from "react";
import Calendar from "react-calendar";

type Props = {
    textAreaRef: Ref<HTMLTextAreaElement>
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    date: string,
    onChange: (date: Date) => void;
    handleSubmit : (e: SyntheticEvent) => void,
    handleCloseAddCard: () => void,
    setCardValue: Dispatch<string>,
    setDate: Dispatch<string>,
    cardValue: string
};

const FormListAdd = ({textAreaRef,handleChange,date, onChange,handleSubmit,handleCloseAddCard,setCardValue,setDate,cardValue}: Props) => {
  useEffect(() => {
    setCardValue("");
    setDate("");
  },[])
  
  return (
    <form className="mx-auto">
      <textarea
        ref={textAreaRef}
        onChange={handleChange}
        className="resize-none rounded-lg w-[100%] min-h-[100px] break-all border-2 border-stone-500 focus:outline-stone-600"
        required
      />
      <Calendar className="bg-slate-400" value={date} onChange={(value) => onChange(value as Date)} />

      <div className="flex justify-between mt-3">
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
  );
};

export default FormListAdd;
