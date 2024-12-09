<script setup>
import { ref } from 'vue';
import { ALL_REVIEWS_API_URL } from '../utils';

const reviews = ref([]);
const isLoading = ref(true);

async function fetchReviews() {
    try {
        const response = await fetch(ALL_REVIEWS_API_URL);
        const data = await response.json();
        reviews.value = data.data || [];
    } catch (error) {
        console.error("Error fetching reviews:", error);
    } finally {
        isLoading.value = false;
    }
}

fetchReviews();
</script>

<template>
    <div class="container my-5">
        <div v-if="isLoading" class="text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <div v-else>
            <div class="row">
                <div v-for="review in reviews" :key="review.id" class="col-lg-4 col-md-6 col-sm-12 mb-4">
                    <router-link :to="`/review/${review.documentId}`" class="text-decoration-none">
                        <div class="card shadow-sm">
                            <!-- Use 'large' format for better quality -->
                            <img v-if="review.thumbnail?.formats?.large?.url" :src="review.thumbnail.formats.large.url"
                                alt="Movie Thumbnail" class="card-img-top" />
                            <!-- Fallback to 'medium' if 'large' is not available -->
                            <img v-else-if="review.thumbnail?.formats?.medium?.url"
                                :src="review.thumbnail.formats.medium.url" alt="Movie Thumbnail" class="card-img-top" />
                            <!-- Fallback to original image -->
                            <img v-else-if="review.thumbnail?.url" :src="review.thumbnail.url" alt="Movie Thumbnail"
                                class="card-img-top" />
                            <div class="card-body">
                                <h5 class="card-title text-primary">{{ review.title }}</h5>
                                <p class="card-text">
                                    <small class="text-body-secondary">By {{ review.author }}</small>
                                </p>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
h1 {
    font-size: 2.5rem;
    font-weight: bold;
}

.card {
    border-radius: 8px;
}

.card-img-top {
    height: 300px;
    object-fit: cover;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
}

.card-title {
    font-size: 1.25rem;
}

.card-text {
    font-size: 0.9rem;
}

.text-body-secondary {
    color: #6c757d !important;
}
</style>
