<script setup>
import { ref, onMounted, computed } from "vue";
import { ALL_REVIEWS_API_URL } from "../utils";

const reviews = ref([]);
const genres = ref([]);
const searchTerm = ref("");
const isLoading = ref(true);
const selectedGenre = ref("");

async function fetchReviews() {
  try {
    const response = await fetch(ALL_REVIEWS_API_URL);
    const data = await response.json();
    reviews.value = data.data || [];
    genres.value = Array.from(new Set((data.data.map(
        (review) => review.genre.split(','))).flat()));
    genres.value.push('Clear Filter');
  } catch (error) {
    console.error("Error fetching reviews:", error);
  } finally {
    isLoading.value = false;
  }
}

onMounted(fetchReviews);

const filterReviews = computed(() => {
  return reviews.value.filter((review) => {
    if (selectedGenre.value !== "") {
        return review.genre.toLowerCase().includes(selectedGenre.value.toLowerCase());
    }
    return review.title.toLowerCase().includes(searchTerm.value.toLowerCase())
});
});

const onSelectGenre = (genre) => {
  if (genre === 'Clear Filter') {
    selectedGenre.value = '';
    return
  }
  selectedGenre.value = genre;
  searchTerm.value = "";
}
</script>

<template>
  <div class="container my-5">
    <div class="d-flex justify-content-between gap-3">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by title"
          v-model="searchTerm"
        />
      </div>
      <div class="dropdown">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ (selectedGenre === "") ? 'Genre Filter' : selectedGenre }}
        </button>
        <ul class="dropdown-menu">
          <template v-for="genre in genres" :key="genre">
            <li>
              <a class="dropdown-item" href="#" @click="onSelectGenre(genre)">{{ genre }}</a>
            </li>
          </template>
        </ul>
      </div>
    </div>

    <div v-if="isLoading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else>
      <div class="row">
        <div
          v-for="review in filterReviews"
          :key="review.id"
          class="col-lg-4 col-md-6 col-sm-12 mb-4"
        >
          <router-link
            :to="`/review/${review.documentId}`"
            class="text-decoration-none"
          >
            <div class="card shadow-sm">
              <!-- Use 'large' format for better quality -->
              <img
                v-if="review.thumbnail?.formats?.large?.url"
                :src="review.thumbnail.formats.large.url"
                alt="Movie Thumbnail"
                class="card-img-top"
              />
              <!-- Fallback to 'medium' if 'large' is not available -->
              <img
                v-else-if="review.thumbnail?.formats?.medium?.url"
                :src="review.thumbnail.formats.medium.url"
                alt="Movie Thumbnail"
                class="card-img-top"
              />
              <!-- Fallback to original image -->
              <img
                v-else-if="review.thumbnail?.url"
                :src="review.thumbnail.url"
                alt="Movie Thumbnail"
                class="card-img-top"
              />
              <div class="card-body">
                <h5 class="card-title text-primary">{{ review.title }}</h5>
                <p class="card-text">
                  <small class="text-body-secondary"
                    >By {{ review.author }}</small
                  >
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
