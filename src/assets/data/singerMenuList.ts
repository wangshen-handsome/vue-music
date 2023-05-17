const type = [
  { name: "全部", type: "type", val: -1 },
  { name: "男歌手", type: "type", val: 1 },
  { name: "女歌手", type: "type", val: 2 },
  { name: "乐队", type: "type", val: 3 },
];

const area = [
  { name: "全部", type: "area", val: -1 },
  { name: "华语", type: "area", val: 7 },
  { name: "欧美", type: "area", val: 96 },
  { name: "日本", type: "area", val: 8 },
  { name: "韩国", type: "area", val: 16 },
  { name: "其他", type: "area", val: 0 },
];

let arr = [];

for (let i = 0; i < 26; i++) {
  arr.push({
    name: String.fromCharCode(65 + i),
    val: String.fromCharCode(97 + i),
    type: "initial",
  });
}

const initial = [
  { name: "热门", type: "initial", val: -1 },
  ...arr,
  { name: "#", type: "initial", val: 0 },
];

export const singerMenuList = [
  {
    name: "排序",
    type: "initial",
    list: initial,
  },
  {
    name: "地区",
    type: "area",
    list: area,
  },
  {
    name: "类型",
    type: "type",
    list: type,
  },
];
