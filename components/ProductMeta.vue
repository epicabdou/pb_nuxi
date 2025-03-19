<template>
  <!-- Meta component doesn't render any UI elements -->
</template>

<script setup>
import { useHead } from '#imports';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

// Set meta tags for SEO
useHead(() => {
  const productName = props.product.name;
  const productDescription = props.product.shortDescription;
  const productImage = props.product.image
      ? `${useNuxtApp().$pb.baseUrl}/api/files/${props.product.collectionId}/${props.product.id}/${props.product.image}`
      : null;
  const productPrice = props.product.promoPrice || props.product.price;

  return {
    title: productName,
    meta: [
      { name: 'description', content: productDescription },

      // Open Graph / Facebook
      { property: 'og:type', content: 'product' },
      { property: 'og:title', content: productName },
      { property: 'og:description', content: productDescription },
      { property: 'og:image', content: productImage },
      { property: 'og:price:amount', content: productPrice.toString() },
      { property: 'og:price:currency', content: 'USD' },

      // Twitter
      { name: 'twitter:card', content: 'product' },
      { name: 'twitter:title', content: productName },
      { name: 'twitter:description', content: productDescription },
      { name: 'twitter:image', content: productImage }
    ],
    link: [
      { rel: 'canonical', href: `${window.location.origin}/products/${props.product.slug}` }
    ]
  };
});
</script>