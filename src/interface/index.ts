import { Dispatch, SetStateAction } from "react";

type StoredValue = Record<string, { titleList: string; content: Content[] }>;

type StoredDataItem = {
  titleList: string | null;
  content: Content[] | null;
};

// Định nghĩa kiểu cho nội dung mỗi mục trong danh sách
export type Content = {
    id: string;
    title: string;
    date: string;
};
export type TodoSchema = {
  titleList: string;
  content: Content[] ;
};
 export interface StoreContextProps {
  storedValue: StoredValue;
  setValue: Dispatch<SetStateAction<StoredValue>>;
  content: Content[];
  setContent: Dispatch<Content[]>;
  setId: Dispatch<string>;
}