<template>
    <div class="image-grid">
      <a v-for="image in images" :key="image.id" :href="getImageLink(image.id)">
        <img :src="image.src" :alt="image.alt">
      </a>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        images: [
          { id: 1, src: './templates/image.png', alt: 'Image 1' },
          { id: 2, src: 'image2.jpg', alt: 'Image 2' },
          // Add more images as needed
        ],
      };
    },
    methods: {
      getImageLink(id) {
        return `anotherpage?id=${id}`;
      },
    },
  };
  </script>
  
  <style>
  .image-grid {
    display: flex;
    justify-content: center;
  }
  
  .image-grid a {
    text-decoration: none;
    margin: 10px; /* Add spacing between images */
  }
  
  .image-grid img {
    max-width: 100%;
    height: auto;
  }
  </style>
  