import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";

interface EditorState {
  title: string;
  location: string;
  category: string;
  content: string;
  tips: string[];
}

interface EditorActions {
  initialize: () => void;
  changeField: (key: string, value: string) => void;
  changeTip: (index: number, tip: string) => void;
  addTip: () => void;
  removeTip: (target: number) => void;
}

type EditorStoreType = StateCreator<EditorState & EditorActions>;

const initialState: EditorState = {
  title: "",
  location: "",
  category: "",
  content: "",
  tips: [""],
};

const editorStore: EditorStoreType = (set, get) => ({
  ...initialState,
  initialize: () => set({ ...initialState }),
  changeField: (key: string, value: string) => set({ [key]: value }),
  changeTip: (index: number, tip: string) =>
    set((state) => {
      const tips = [...state.tips];
      tips[index] = tip;
      return {
        tips: tips,
      };
    }),
  addTip: () => set((state) => ({ tips: [...state.tips, ""] })),
  removeTip: (target: number) =>
    set((state) => {
      const tips = [...state.tips];
      return { tips: tips.filter((tip, index) => target !== index) };
    }),
});

const useEditorStore = create<EditorState & EditorActions>()<any>(
  process.env.NODE_ENV === "development" ? devtools(editorStore) : editorStore,
);

export default useEditorStore;
