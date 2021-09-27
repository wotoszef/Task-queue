import { combineReducers } from "@reduxjs/toolkit";
import mainPageSlice from "../components/main-page/service/mainPageSlice";

const rootReducer = combineReducers({
  mainPage: mainPageSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
