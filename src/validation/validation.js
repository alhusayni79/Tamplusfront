import * as Yup from "yup";
export const phoneValidation = Yup.string()
  .matches(/^5\d{11}$/, "رقم الجوال يجب أن يحتوي على 12 رقمًا ويبدأ بـ 5")
  .required("رقم الجوال مطلوب");
export const emailValidation = Yup.string()
  .email("يجب إدخال بريد إلكتروني صالح")
  .required("البريد الإلكتروني مطلوب");
export const passwordValidation = Yup.string()
  .min(8, "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل")
  .required("كلمة المرور مطلوبة");
export const registrationSchema = Yup.object().shape({
  phone: phoneValidation,
  email: emailValidation,
  password: passwordValidation,
});
