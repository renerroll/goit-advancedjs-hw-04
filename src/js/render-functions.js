import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionPosition: 'bottom',
});

const loadImage = src => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(src);
    img.onerror = error => reject(error);
  });
};

export const renderImages = async (images, reset = false) => {
  if (reset) {
    while (gallery.firstChild) {
      gallery.removeChild(gallery.firstChild);
    }
  }

  const imagePromises = images.map(image => loadImage(image.webformatURL));
  await Promise.all(imagePromises);

  const fragment = document.createDocumentFragment();

  images.forEach(image => {
    const anchor = document.createElement('a');
    anchor.href = image.largeImageURL;
    anchor.classList.add('gallery-item');

    const img = document.createElement('img');
    img.src = image.webformatURL;
    img.alt = image.tags;

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('info');

    const createInfoItem = (label, value) => {
      const div = document.createElement('div');
      div.innerHTML = `<p>${label}</p><p>${value}</p>`;
      return div;
    };

    infoDiv.appendChild(createInfoItem('Likes', image.likes));
    infoDiv.appendChild(createInfoItem('Views', image.views));
    infoDiv.appendChild(createInfoItem('Comments', image.comments));
    infoDiv.appendChild(createInfoItem('Downloads', image.downloads));

    anchor.appendChild(img);
    anchor.appendChild(infoDiv);
    
    fragment.appendChild(anchor);
  });

  gallery.appendChild(fragment);

  lightbox.refresh();
};

export const notificationsConfig = {
  position: 'topRight',
  messageColor: 'white',
  iconColor: 'white',
};

export const showErrorNotification = message => {
  iziToast.error({
    message: message,
    color: '#EF4040',
    ...notificationsConfig,
  });
};

export const showNotification = message => {
  iziToast.info({
    message: message,
    color: '#0099FF',
    ...notificationsConfig,
  });
};
