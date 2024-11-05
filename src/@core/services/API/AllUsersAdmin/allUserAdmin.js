export const GetUserManageList = async ({
  PageNumber = 0,
  RowsOfPage = 0,
  SortingCol = "InsertDate",
  SortType = "DESC",
  Query = "",
  IsActiveUser = true,
  IsDeletedUser = true,
  roleId = 1,
}) => {
  try {
    const searchParams = new URLSearchParams({
      PageNumber,
      RowsOfPage,
      SortingCol,
      SortType,
      Query,
      IsActiveUser,
      IsDeletedUser,
      roleId,
    }).toString();

    const res = await http.get(`/User/UserManage?${searchParams}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    console.log("API response received:", res);
    return res;
  } catch (error) {
    console.error("Error in GetUserManageList API call:", error);
  }
};
