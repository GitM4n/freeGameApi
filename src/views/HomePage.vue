<script setup lang="ts">
import HeaderLayout from '@/layouts/HeaderLayout.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import VCardSection from '@/components/sections/VCardSection.vue';

</script>

<template>
    <HeaderLayout>
        <h1 class="header__title">Free2Play games cards</h1>
    </HeaderLayout>
    <MainLayout>
      <VCardSection />
    </MainLayout>
</template>


<style scoped>

.header__title {
    text-align: center;
    font-size: 3rem;
}

</style>