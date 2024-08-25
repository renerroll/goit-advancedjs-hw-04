import { fetchImages } from './js/pixabay-api';
import { renderImages, showNotification } from './js/render-functions';

const form = document.querySelector('.search-form');
const input = document.querySelector('.search-form input[name="search"]');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;
let currentQuery = '';
let totalImagesLoaded = 0;

const handleSubmitForm = async event => {
  event.preventDefault();
  const query = input.value.trim();

  if (!query) {
    showNotification('Hey! enter a search query.');
    return;
  }

  loadMoreBtn.style.display = 'none';
  loader.style.display = 'none';
  currentPage = 1;
  totalImagesLoaded = 0;
  currentQuery = query;

  try {
    loader.style.display = 'flex';
    const data = await fetchImages(query, currentPage);
    totalImagesLoaded = data.hits.length;

    if (data.hits.length === 0) {
      showNotification(
        'Strange as it may seem, we did not find any images matching your search.'
      );
      return;
    }

    await renderImages(data.hits, true);

    if (totalImagesLoaded < data.totalHits) {
      loadMoreBtn.style.display = 'block';
    } else {
      showNotification(
        "Strange as it may seem, we did not find any more images matching your search."
      );
    }
  } catch (error) {
    showNotification(
      'Damn! An error occurred while fetching images. Please try again later.'
    );
  } finally {
    loader.style.display = 'none'; 
    form.reset();
  }
};

const handleLoadMore = async () => {
  currentPage += 1;

  loadMoreBtn.style.display = 'none';
  loader.style.display = 'flex';

  try {
    const data = await fetchImages(currentQuery, currentPage);
    totalImagesLoaded += data.hits.length;

    await renderImages(data.hits);

    const { height: cardHeight } = document
      .querySelector('.gallery-item')
      .getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2 + 48,
      behavior: 'smooth',
    });

    if (totalImagesLoaded >= data.totalHits) {
      showNotification(
        "Strange as it may seem, we did not find any more images matching your search."
      );
    } else {
      loadMoreBtn.style.display = 'block';
    }
  } catch (error) {
    showNotification(
      'Damn! An error occurred while fetching images. Please try again later.'
    );
  } finally {
    loader.style.display = 'none'; 
    form.reset();
  }
};

form.addEventListener('submit', handleSubmitForm);
loadMoreBtn.addEventListener('click', handleLoadMore);