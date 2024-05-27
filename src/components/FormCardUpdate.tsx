import React, { Ref, SyntheticEvent } from "react";
import Calendar from "react-calendar";
type Content = {
  id: string;
  title: string;
};
type Props = {
  handleUpdate: (e: SyntheticEvent) => void;
  inputRef: Ref<HTMLTextAreaElement>;
  item: Content;
  handleFixCard: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onChange: (e: Date) => void;
  date: string;
  handleDelete: () => void;
  handleClose: () => void;
};

const FormCardUpdate = ({
  handleUpdate,
  inputRef,
  item,
  handleFixCard,
  onChange,
  date,
  handleDelete,
  handleClose,
}: Props) => {
    
  return (
    <form onSubmit={handleUpdate}>
      <textarea
        className="resize-none rounded-lg w-[100%] min-h-[50px] break-all border-2 pl-3 border-stone-500 focus:outline-stone-600"
        ref={inputRef}
        defaultValue={item.title}
        onChange={handleFixCard}
      />
      <Calendar
        onClickDay={onChange}
        defaultValue={date}
      />

      <div className="flex justify-between mt-3">
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
  );
};

export default FormCardUpdate;
