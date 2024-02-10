import moment from "moment";
import "moment/locale/id";

export const mapWorkType = (workType) => {
  if (workType === "ESSAY") {
    return "Esai";
  } else if (workType === "SHORT_STORY") {
    return "Cerita Pendek";
  } else {
    return "Puisi";
  }
};
export const mapPublicationDate = (publicationDate) => {
  var date = moment(publicationDate);
  var formattedDate = date.format("dddd, D MMMM YYYY");
  return formattedDate;
};
