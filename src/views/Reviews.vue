<script setup>

import { ALL_REVIEWS_API_URL } from '../utils';
import { useFetch } from '@vueuse/core';

const { isFetching, data } = await useFetch(ALL_REVIEWS_API_URL, {
    fetchOptions: {
        mode: 'no-cors'
    }
}).json();

const reviews = data.value.data;

console.log(reviews);

</script>

<template>
    <h1>Reviews</h1>

    <ul>
        <li v-for="review in reviews" :key="review.id">
            <h2>{{ review.title }}</h2>
            <p>{{ review.content }}</p>
        </li>
    </ul>
</template>