<template>
  <l-marker
    :lat-lng="position"
    :title="title"
    :draggable="false"
  >
    <l-icon :icon-url="icontest"  />
      <l-popup ><div v-html="text"></div></l-popup>

  </l-marker>
</template>

<script>
import { LMarker, LPopup, LIcon } from "vue2-leaflet";
export default {
  name: "MarkerPopup",
  components: {
    LMarker,
    LPopup,
    LIcon
  },
  props: {
    text: {
      type: String,
      default: "Aucune indication"
    },
    position: {
      type: Object,
      default: () => {}
    },
    title: {
      type: String,
      default: ""
    },
    icontest: {
      type: String,
      default: ""
      
    }
  }
};
</script>