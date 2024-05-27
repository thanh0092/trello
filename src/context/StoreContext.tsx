import { useLocalStorage } from "@/hook/useLocalStorage";
import { Content, StoreContextProps } from "@/interface";
import { createContext, useState, useEffect, Dispatch, SetStateAction } from "react";


export const StoreContext = createContext<StoreContextProps | null>(null);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [storedValue, setValue] = useLocalStorage<Record<string, { titleList: string; content: Content[] }>>("list", {});

  const [id, setId] = useState<string>("");
  const [content, setContent] = useState<Content[]>(storedValue[id]?.content || []);

  useEffect(() => {
    setContent(storedValue[id]?.content || []);
  }, [storedValue, id]);
  return (
    <StoreContext.Provider
      value={{ storedValue, setValue, content, setContent, setId }}
    >
      {children}
    </StoreContext.Provider>
  );
};

