export const END_POINT = {
  test: "/test",
  login: process.env.HOST_API_KEY + "/user/login",
  appWidget: process.env.HOST_API_KEY + "/ticket/getDashboardWidgetDetails",
  attendanceListview: "/logs/attendanceHistoryList",
  reportListView: "logs/userAttendanceReport",
  departmentListView: "department/list",
  userListView: "users/listNames",
  addUser: process.env.HOST_API_KEY + "/user/addUser",
  addNewTicket: process.env.HOST_API_KEY + "/ticket/createTicket",
  getTicketList: process.env.HOST_API_KEY + "/ticket/getTicketList",
  fileAttachments: process.env.HOST_API_KEY + "/user/uploadFiles",
  imageBaseUrl: process.env.HOST_API_KEY + "/uploads/",
  getUserDetails: "users/details?ID=",
  todayStatus: "/logs/getUserTodayStatus",
  userManagementListview: process.env.HOST_API_KEY + "/user/findAllUsers",
  dealersListview: process.env.HOST_API_KEY + "/user/getAllUsers"
};

export const setHeader = (tokenData: any) => {
  const header = { headers: { Authorization: `Bearer ${tokenData}` } };
  return header;
};
