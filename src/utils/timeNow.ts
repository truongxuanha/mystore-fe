const getTime = () => {
  const today = new Date();
  let month: number | string = 0;
  let day: number | string = 0;
  if (today.getDate() < 10) {
    day = "0" + today.getDate();
  } else {
    day = today.getDate();
  }
  if (today.getMonth() < 10) {
    const mm = today.getMonth() + 1;
    month = "0" + mm;
  } else {
    month = today.getMonth();
  }

  const timeIn = today.getFullYear() + "-" + month + "-" + day;
  return timeIn;
};
export default getTime;
