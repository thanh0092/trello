import React, { Ref, SyntheticEvent } from "react";
import Calendar from "react-calendar";

type Props = {
    textAreaRef: Ref<HTMLTextAreaElement>
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    date: string,
    onChange: (date: Date) => void;
    handleSubmit : (e: SyntheticEvent) => void,
    handleCloseAddCard: () => void
};

const FormListAdd = ({textAreaRef,handleChange,date, onChange,handleSubmit,handleCloseAddCard}: Props) => {
  return (
    <form className="mx-auto">
      <textarea
        ref={textAreaRef}
        onChange={handleChange}
        className="resize-none rounded-lg min-h-[100px] break-all	"
      />
      <Calendar className="bg-slate-400" value={date} onChange={(value) => onChange(value as Date)} />

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
  );
};

export default FormListAdd;
