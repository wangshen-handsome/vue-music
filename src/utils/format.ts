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

export const formatSongTime = (
  duration: number = 0,
  num: number = 1
): string => {
  duration = duration >= 0 ? duration / num : 0;
  const m = (Math.floor(duration / 60) + "").padStart(2, "0");
  const s = (Math.floor(duration % 60) + "").padStart(2, "0");
  return `${m}:${s}`;
};

export const formSongList = (arr: any[], privileges: any[]) => {
  arr.forEach((item, index) => {
    item.singer = item.ar[0].name;
    item.alName = item.al.name;
    item.songTime = formatSongTime(item.dt, 1000);
    item.license = !privileges[index].cp;
    item.vip = privileges[index].fee === 1;
    item.index = index + 1;
  });
  return arr;
};
