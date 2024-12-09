export const ALL_REVIEWS_API_URL = 'https://headless-cms-pbo8.onrender.com/api/reviews?populate=*';

export const SINGLE_REVIEW_API_URL = (documentId) => {
    return `https://headless-cms-pbo8.onrender.com/api/reviews/${documentId}?populate=*`;
};