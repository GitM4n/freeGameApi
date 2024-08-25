<script setup lang="ts">
import type { Screenshot } from '@/api/gamesApi';
import { onMounted, ref } from 'vue';

const $props = defineProps<{
  images: Screenshot[],
  idx?: number,
}>();

const $emit = defineEmits<{
  (e: 'close'): void
}>();

const activeIdx = ref<number>(0);

const close = () => {
  $emit('close');
};

const nextImage = () => {
  if (activeIdx.value < $props.images.length - 1) {
    activeIdx.value++;
  } else {
    activeIdx.value = 0; 
  }
};

const prevImage = () => {
  if (activeIdx.value > 0) {
    activeIdx.value--;
  } else {
    activeIdx.value = $props.images.length - 1; 
  }
};

onMounted(() => {
  if ($props.idx !== undefined) {
    activeIdx.value = $props.idx;
    console.log(activeIdx, $props.idx);
  }
});
</script>

<template>
  <div class="slider" :class="{ active: $props.idx !== undefined }">
    <div class="slider__close" @click="close">X</div>
    <div class="slider__wrapper">
      <button class="slider__nav slider__nav--prev" @click="prevImage">&#10094;</button>
      <ul class="slider__lists">
        <li class="slider__list" v-for="(img, index) in $props.images" 
            :key="img.id" 
            :class="{ active: index === activeIdx }">
          <div class="slider__image" v-if="index === activeIdx">
            <img :src="img.image" alt="slider-img">
          </div>
        </li>
      </ul>
      <button class="slider__nav slider__nav--next" @click="nextImage">&#10095;</button>
    </div>
  </div>
</template>

<style scoped>



.slider {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}



.slider__close {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 2rem;
  cursor: pointer;
  color: var(--light);
}

.slider__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 80%;
}

.slider__lists {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.slider__list {
  display: none;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.slider__list.active {
  display: flex;
}

.slider__image img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
}

.slider__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: var(--light);
}

.slider__nav--prev {
  left: 20px;
}

.slider__nav--next {
  right: 20px;
}
</style>
