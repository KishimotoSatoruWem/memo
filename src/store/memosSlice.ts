import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from ".";
import { Memo, StoreMemo } from "../generated";
import { memoApi } from "../api/MemoApi";

export type MemosState = {
  memos: Memo[];
  editingMemo?: Memo;
  lodaingCounter: number;
  errorMessage: string;
};

const initialState: MemosState = {
  memos: [],
  lodaingCounter: 0,
  errorMessage: "",
};

export const getMemosAction = () => async (dispatch: AppDispatch) => {
  dispatch(increaseLoadingCounter());
  try {
    const memos: Memo[] = await memoApi.memos.listupMemos();
    dispatch(setMemos(memos));
  } catch (error) {
    dispatch(setErrorMessage("メモ一覧取得に失敗しました。"));
  }
  dispatch(decreaseLoadingCounter());
};

export const createOrUpdateMemoAction =
  (memo: StoreMemo, id: string = "") =>
  async (dispatch: AppDispatch) => {
    dispatch(increaseLoadingCounter());
    if (id === "") {
      try {
        await memoApi.memos.createMemo("no-cache", memo);
        dispatch(getMemosAction());
      } catch (error) {
        dispatch(setErrorMessage("メモ登録に失敗しました。"));
      }
    } else {
      try {
        await memoApi.memos.updateMemo(Number(id), memo);
        dispatch(getMemosAction());
      } catch (error) {
        dispatch(setErrorMessage("メモ更新に失敗しました。"));
      }
    }
    dispatch(decreaseLoadingCounter());
  };

export const deleteMemoByIdAction =
  (id: number) => async (dispatch: AppDispatch) => {
    dispatch(increaseLoadingCounter());
    try {
      await memoApi.memos.deleteMemo(id);
      dispatch(getMemosAction());
    } catch (error) {
      dispatch(setErrorMessage("メモ削除に失敗しました。"));
    }
    dispatch(decreaseLoadingCounter());
  };

export const searchMemosAction =
  (word: string) =>
  async (dispatch: AppDispatch) => {
    dispatch(increaseLoadingCounter());
    try {
      const memos: Memo[] = await memoApi.memos.searchMemos(word);
      dispatch(setMemos(memos));
    } catch (error) {
      dispatch(setErrorMessage("メモの検索に失敗しました。"));
    }
    dispatch(decreaseLoadingCounter());
  };

export const memosSlice = createSlice({
  name: "memos",
  initialState,
  reducers: {
    setMemos: (state: MemosState, action: PayloadAction<Memo[]>) => {
      state.memos = action.payload;
    },
    setErrorMessage: (state: MemosState, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    increaseLoadingCounter: (
      state: MemosState,
      action: PayloadAction<void>
    ) => {
      state.lodaingCounter++;
    },
    decreaseLoadingCounter: (
      state: MemosState,
      action: PayloadAction<void>
    ) => {
      state.lodaingCounter--;
    },
  },
});

export const {
  setMemos,
  setErrorMessage,
  increaseLoadingCounter,
  decreaseLoadingCounter,
} = memosSlice.actions;

export default memosSlice.reducer;