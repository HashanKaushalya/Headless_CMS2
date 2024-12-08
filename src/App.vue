<script setup>

import { RouterView } from 'vue-router';

</script>

<template>
    <Suspense>
        <template #default>
            <RouterView />
        </template>
        <template #fallback>
            <!-- Loading -->
        </template>
    </Suspense>

</template>


