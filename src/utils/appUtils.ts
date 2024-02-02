const loginData = (userDetails: any) => {
    localStorage.setItem("token", userDetails.token);
    localStorage.setItem("userType", userDetails.data.UserType);
    localStorage.setItem("userId", userDetails.data.ID);
  };
  
  export default loginData;
  
  export const auth_user = () => {
    const user = {
      token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxOWJmMTVmMC1jYTk1LTQ1MmMtOWJiNC1mY2QxNzg2ZDQ0N2EiLCJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJlbXBsb3llZUlEIjoiZjI1MDU5ZmMiLCJpYXQiOjE2ODg0NDgxNzcsImV4cCI6MTY5NDQ0ODE3N30.cwARASfl1UpPpQSHIUZUHA97Ns3d-th6-NH-YAxdfwBAaC9Tyd4Gxs9tsCSb0L093q5QLlMVURNpgBRnfAU-O0hl83mfL5XXSj9gTKMV9lQfelssMMqccKRaEy2sORlfj_kz-6Co5nruMD_fg_3jwjE-0FYeDRPHcgiCXUlxB51osuL4ODPNKXUq20-IA_RJ675uVSyKjqIovAucgG7_I5LV0_DgurhiTM9qOwCRRMDOgVFvRDsmCAyPTht0VNrfeliLmfx64xZHw-wQHAgIhkgrEzGFDJJ4OTFhhUIoJxvRcZUbsFz0yzIPOUbCq-_pp_fI5KMgyXZlBGZVUPVqEfK5NsKq-t1KvSV7_dJiqWFvOt4X45kSel3boqlw7mZ-Gaeqash7UlAgdoJ37TMM4XS2eGpJ_ZCTv_KRYi0treCp9nn9qgYYLsvLArlnxahLPHRxKHeIqWgwsVFbgT0HWY0acPfwS5eBNP773YkkCWjsHVl3VHswJPQCaHTnCxUmqIDgybicENfq25I4-tkSyzbTHKy9F2mulKf72E7WpRrrsQGkA9teEY8hfUOVw-5qG_sZclg54AV_PYRFY9_jWMbFVl0xnmL27gFD4riI5_-xiCG6IeYluCs2YPtushoqXFfaUxXG-aDpoULJxBbiFl9HkzHyBE3sRRyTk8TsoCc",
      userType: localStorage.getItem("userType"),
      userId: localStorage.getItem("userId"),
    };
    return user;
  };
  
  export const isLogin = () => {
    if (localStorage.getItem("token")) return true;
    return false;
  };
  
  export const logout = () => localStorage.clear();