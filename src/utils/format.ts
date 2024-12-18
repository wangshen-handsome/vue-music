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
    item.src = `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`;
  });
  return arr;
};

//格式化歌词
export const formatLrcList = (lrc: string) => {
  // 第一步我们先把数据拆分为数组
  let lrcList: any[] = lrc.split('\n');

  let re1 = /\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/g
  let re2 = /(?<=\])\S\s?(?=\[)/g

  console.log(lrcList);
  
  // 然后我们把时间和数字进行拆分
  lrcList = lrcList.map(item => {
    const lrcItme: any = {}
    const times = item.match(/\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/g)
    const text = item.match(/(?<=\])\S\s?(?=\[)/g)
    lrcItme.starTime = formtTime(times[0])
    lrcItme.endTime = formtTime(times[times.length - 1])
    lrcItme.text = text.join('')
    lrcItme.source = item
    lrcItme.children = text.map((key: any, index: number) => {
      return {
        text: key,
        starTime: formtTime(times[index]),
        endTime: formtTime(times[index + 1]),
      }
    })
    return lrcItme
  })
  return lrcList
}

const formtTime = (str: string) => {
  let mSec: number | string = 2;
  let time = 0;
  // 第一位是分，第二位是秒，第三位是毫秒
  const timeArr: any[] = /\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/.exec(str)?.map((item, index) => {
    // 因为毫秒分为两位数和三位数，所以这里当匹配到第四位，也就是真正的毫秒需要判断当前文件的毫秒是那种情况
    if (index === 4) {
      mSec = Number(item?.length) ?? mSec;
    }
    return Number(item)
  });
  time = timeArr[1] * 60 + timeArr[2] + (timeArr[4] / (mSec === 2 ? 100 : 1000) ?? 0)
  return Number(time.toFixed(3))
}