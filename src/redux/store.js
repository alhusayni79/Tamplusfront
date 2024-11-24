import { configureStore } from "@reduxjs/toolkit";
import serviceReducer from "./Slices/services/serviceSlice";
import footerReducer from "./Slices/FooterData/footerSlice";
import bankReducer from "./Slices/bankinfo/bankSlice";
import designReducer from "./Slices/home/homeSlice";
import blogsReducer from "./Slices/blogsData/blogSlice";
import ministryReducer from "./Slices/ministrySlice/ministrySlice";
import statisticsReducer from "./Slices/staticsSlice/statisticsSlice";

export const store = configureStore({
  reducer: {
    services: serviceReducer,
    footer: footerReducer,
    bankinfo: bankReducer,
    design: designReducer,
    blogs: blogsReducer,
    ministry: ministryReducer,
    statistics: statisticsReducer,
  },
});

export default store;
