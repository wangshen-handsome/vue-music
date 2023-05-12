export const formatTime = (time: number | string) => {
  let date = new Date(Number(time));

  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");

  return `${year}年${month}月${day}日`;
};

export const formatNum = (val: number | string) => {
  let num: number | string = 0;
  val = Number(val);
  if (val > 9999) {
    num = Math.round((val / 10000) * 10) / 10 + "万";
  } else {
    num = val;
  }

  return num;
};

export const formatSongTime = (duration: number = 0): string => {
  duration = duration >= 0 ? duration / 1000 : 0;
  const m = (Math.floor(duration / 60) + "").padStart(2, "0");
  const s = (Math.floor(duration % 60) + "").padStart(2, "0");
  return `${m}:${s}`;
};
