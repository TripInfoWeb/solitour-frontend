import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

// 1. 상태 인터페이스 정의
interface DiaryEditorState {
  title: string;
  startDate: Date | null;
  endDate: Date | null;
  days: number;
  currentDay: number;
  address: string;
  province: string;
  city: string;
  contents: string[] | null;
}

// 2. 액션 인터페이스 정의
interface DiaryEditorActions {
  initialize: () => void;
  setDiaryEditor: (data: Partial<DiaryEditorState>) => void;
}

// 3. 초기 상태 정의
const initialState: DiaryEditorState = {
  title: "",
  startDate: null,
  endDate: null,
  days: 0,
  currentDay: 1,
  address: "",
  province: "",
  city: "",
  contents: null,
};

// 4. 상태 및 액션 생성
const diaryEditorStore: StateCreator<DiaryEditorState & DiaryEditorActions> = (
  set,
  get,
) => ({
  ...initialState,
  initialize: () => set({ ...initialState }),
  setDiaryEditor: (data: Partial<DiaryEditorState>) => set(() => ({ ...data })),
});

const useDiaryEditorStore = create<
  DiaryEditorState & DiaryEditorActions
>()<any>(
  process.env.NODE_ENV === "development"
    ? devtools(diaryEditorStore)
    : diaryEditorStore,
);

export type useDiaryEditorStoreType = DiaryEditorState & DiaryEditorActions;

export default useDiaryEditorStore;
