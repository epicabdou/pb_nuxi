<template>
  <div class="responsive-container section-padding">
    <div class="card-fancy text-center py-16">
      <div class="flex justify-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h1 class="heading-2 mb-4">Paiement annulé</h1>
      <p class="body-regular text-background-600 mb-8">
        Le processus de paiement a été annulé.
        <br>Aucun montant n'a été débité de votre compte.
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <NuxtLink to="/checkout" class="btn-primary">
          Retour à la validation
        </NuxtLink>
        <NuxtLink to="/cart" class="btn-outline">
          Retour au panier
        </NuxtLink>
      </div>
    </div>
  </div>
</template>