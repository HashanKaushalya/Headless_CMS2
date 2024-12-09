<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { SINGLE_REVIEW_API_URL } from '../utils';

const review = ref(null);
const isLoading = ref(true);
const errorMessage = ref('');

const route = useRoute();

async function fetchReview() {
    try {
        const documentId = route.params.id;
        const response = await fetch(SINGLE_REVIEW_API_URL(documentId));
        const data = await response.json();

        if (data.data) {
            review.value = data.data;
        } else {
            errorMessage.value = 'Review not found.';
        }
    } catch (error) {
        console.error('Error fetching review:', error);
        errorMessage.value = 'Failed to load review.';
    } finally {
        isLoading.value = false;
    }
}

onMounted(fetchReview);
</script>


<template>
    <div class="container my-5">
        <div v-if="isLoading" class="text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <div v-else-if="error" class="text-center text-danger">
            <p>{{ error }}</p>
        </div>

        <div v-else>
            <div class="card shadow-lg">
                <img v-if="review.thumbnail?.formats?.large?.url" :src="review.thumbnail.formats.large.url"
                    alt="Movie Thumbnail" class="card-img-top" />
                <div class="card-body">
                    <h3 class="card-title">{{ review.title }}</h3>
                    <p class="card-text text-muted">{{ review.description }}</p>
                    <p class="card-text">
                        <strong>Genre:</strong> {{ review.genre }}
                    </p>
                    <p class="card-text">
                        <strong>Author:</strong> {{ review.author }}
                    </p>
                    <p class="card-text">
                        <strong>Release Date:</strong> {{ review.date }}
                    </p>
                    <p class="card-text">
                        <strong>Rating:</strong> {{ review.rating }}/5
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-img-top {
    height: 400px;
    object-fit: cover;
}

.card-body {
    font-size: 1rem;
    line-height: 1.6;
}

h3 {
    font-size: 2rem;
    margin-bottom: 20px;
}
</style>
