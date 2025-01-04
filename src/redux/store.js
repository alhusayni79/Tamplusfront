import { configureStore } from "@reduxjs/toolkit";
import serviceReducer from "./Slices/services/serviceSlice";
import footerReducer from "./Slices/FooterData/footerSlice";
import bankReducer from "./Slices/bankinfo/bankSlice";
import designReducer from "./Slices/home/homeSlice";
import blogsReducer from "./Slices/blogsData/blogSlice";
import ministryReducer from "./Slices/ministrySlice/ministrySlice";
import statisticsReducer from "./Slices/staticsSlice/statisticsSlice";
import userReducer from "./Slices/userdata/userSlice";
import empolyeeReducer from "./Slices/empolyeeData/empolyeeSlice";
import completedRequestReducer from "./Slices/employeeRequest/completedRequestSlice";
import newRequestReducer from "./Slices/employeeRequest/newRequestSlice";
import userRequestReducer from "./Slices/userRequest/userRequestSlice";
import reserverdRequestReducer from "./Slices/employeeRequest/reservedRequestSlice";
import canceledRequestReducer from "./Slices/employeeRequest/canceledReuwstSlice";
import allMessageReducer from "./Slices/chat/allMessageRequestSlice";
import allMediaReducer from "./Slices/chat/allMediaRequestSlice";

export const store = configureStore({
  reducer: {
    services: serviceReducer,
    footer: footerReducer,
    bankinfo: bankReducer,
    design: designReducer,
    blogs: blogsReducer,
    ministry: ministryReducer,
    statistics: statisticsReducer,
    user: userReducer,
    empolyee: empolyeeReducer,
    completedRequest: completedRequestReducer,
    newRequest: newRequestReducer,
    userRequest:userRequestReducer,
    reservedRequest:reserverdRequestReducer,
    canceledRequest:canceledRequestReducer,
    allMessage:allMessageReducer,
    allMedia:allMediaReducer
  },
});

export default store;
