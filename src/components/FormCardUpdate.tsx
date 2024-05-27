import React, { Ref, SyntheticEvent } from "react";
import Calendar from "react-calendar";
type Content = {
  id: string;
  title: string;
};
type Props = {
  handleUpdate: (e: SyntheticEvent) => void;
  inputRef: Ref<HTMLInputElement>;
  item: Content;
  handleFixCard: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
      <input
        type="text"
        className="w-[250px] mb-3"
        ref={inputRef}
        defaultValue={item.title}
        onChange={handleFixCard}
      />
      <Calendar
        onClickDay={onChange}
        
        value={date}
      />

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
  );
};

export default FormCardUpdate;
