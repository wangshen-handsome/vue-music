import { usePlayBarStore } from "@/store/playBar";

import { toRefs } from "vue";

const { isPlay, changeIsPlay } = toRefs(usePlayBarStore());

export const pauseMusic = () => {
  isPlay.value = true;
  changeIsPlay.value();
};
