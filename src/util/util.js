export const getErrorMessage = (error) => {
  if (
    error.response === undefined ||
    (error.response.status >= 500 && error.response.status <= 599)
  ) {
    return "Terjadi kesalahan sistem";
  }
  return error.response.data.detail;
};
