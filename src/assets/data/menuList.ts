//左侧菜单栏数据
type M = {
  id: number;
  name: string;
  title: string;
  icon: string;
};

export const menuList: M[] = [
  {
    id: 1,
    name: "/index",
    title: "首页",
    icon: `<?xml version="1.0" encoding="UTF-8"?><svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" stroke="#409EFF" stroke-width="4"/><path d="M26 14V28" stroke="#409EFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 28.6655C14 26.6411 15.9341 25 18.32 25H26V29.3345C26 31.3589 24.0659 33 21.68 33H18.32C15.9341 33 14 31.3589 14 29.3345V28.6655Z" fill="#409EFF" stroke="#409EFF" stroke-width="4" stroke-linejoin="round"/><path d="M32 15L26 14" stroke="#409EFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  {
    id: 2,
    name: "/rank",
    title: "排行榜",
    icon: `<?xml version="1.0" encoding="UTF-8"?><svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 42H10" stroke="#409EFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 36H10" stroke="#409EFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 30H10" stroke="#409EFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 24H10" stroke="#409EFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 42H21" stroke="#409EFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 36H21" stroke="#409EFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 30H21" stroke="#409EFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 24H21" stroke="#409EFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 18H21" stroke="#409EFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 12H21" stroke="#409EFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 6H21" stroke="#409EFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M27 42H32" stroke="#409EFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M38 42H43" stroke="#409EFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M27 36H32" stroke="#409EFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M38 36H43" stroke="#409EFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M27 30H32" stroke="#409EFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M38 30H43" stroke="#409EFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M38 24H43" stroke="#409EFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M38 18H43" stroke="#409EFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  {
    id: 3,
    name: "/songList",
    title: "歌单",
    icon: `<?xml version="1.0" encoding="UTF-8"?><svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="18" width="38" height="24" rx="2" fill="#409EFF" stroke="#409EFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 12H40" stroke="#409EFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 6L33 6" stroke="#409EFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M26 24V30" stroke="#FFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 32.7491C18 31.2308 19.2894 30 20.88 30H26V33.2509C26 34.7692 24.7106 36 23.12 36H20.88C19.2894 36 18 34.7692 18 33.2509V32.7491Z" stroke="#FFF" stroke-width="4" stroke-linejoin="round"/><path d="M31 25L26 24" stroke="#FFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  {
    id: 4,
    name: "/mv",
    title: "MV",
    icon: `<?xml version="1.0" encoding="UTF-8"?><svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="10" width="32" height="28" fill="#409EFF" stroke="#409EFF" stroke-width="4" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M44 14L36 20.75V27.25L44 34V14Z" stroke="#409EFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 19L23 24L17 29" stroke="#FFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  {
    id: 5,
    name: "/singer",
    title: "歌手",
    icon: `<?xml version="1.0" encoding="UTF-8"?><svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="13" r="9" fill="#409EFF" stroke="#409EFF" stroke-width="4" stroke-linejoin="round"/><path d="M5 44C5 35.5625 11.175 27.6875 16.4 26C16.4 26 21.15 31.0625 24 34.4375L31.6 26C35.875 26.5625 43 35.5625 43 44" stroke="#409EFF" stroke-width="4" stroke-linejoin="round"/><path d="M2 44L46 44" stroke="#409EFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  // {
  //   id: 6,
  //   name: "/my",
  //   title: "我的音乐",
  //   icon: `<?xml version="1.0" encoding="UTF-8"?><svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4Z" fill="#409EFF" stroke="#409EFF" stroke-width="4" stroke-linejoin="round"/><path d="M18 28H6C4.89543 28 4 28.8954 4 30V42C4 43.1046 4.89543 44 6 44H18C19.1046 44 20 43.1046 20 42V30C20 28.8954 19.1046 28 18 28Z" fill="#409EFF" stroke="#409EFF" stroke-width="4" stroke-linejoin="round"/><path d="M42 4H30C28.8954 4 28 4.89543 28 6V18C28 19.1046 28.8954 20 30 20H42C43.1046 20 44 19.1046 44 18V6C44 4.89543 43.1046 4 42 4Z" fill="#409EFF" stroke="#409EFF" stroke-width="4" stroke-linejoin="round"/><path d="M28 28H44" stroke="#409EFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M36 36H44" stroke="#409EFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M28 44H44" stroke="#409EFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  // },
];
