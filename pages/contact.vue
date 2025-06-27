<!-- pages/contact.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-eucalyptus-50 to-cream-50 dark:from-eucalyptus-900/10 dark:to-cream-900/10">
    <!-- Hero Section with Moroccan Heritage -->
    <section class="relative py-20 bg-gradient-to-r from-primary-100 via-eucalyptus-100 to-cream-100 dark:from-primary-900/20 dark:via-eucalyptus-900/20 dark:to-cream-900/20 overflow-hidden">
      <!-- Moroccan-inspired decorative elements -->
      <div class="absolute inset-0">
        <div class="absolute top-12 left-1/4 w-32 h-32 opacity-20">
          <svg viewBox="0 0 100 100" class="w-full h-full text-primary-400 animate-gentle-bounce">
            <circle cx="50" cy="50" r="4" fill="currentColor">
              <animate attributeName="r" values="4;8;4" dur="3s" repeatCount="indefinite"/>
            </circle>
            <circle cx="30" cy="30" r="2" fill="currentColor">
              <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite" begin="0.5s"/>
            </circle>
            <circle cx="70" cy="70" r="3" fill="currentColor">
              <animate attributeName="r" values="3;6;3" dur="2.5s" repeatCount="indefinite" begin="1s"/>
            </circle>
          </svg>
        </div>
        <div class="absolute bottom-16 right-1/3 w-24 h-24 bg-gradient-to-br from-eucalyptus-200/30 to-secondary-200/30 rounded-organic animate-float"></div>
        <!-- Moroccan geometric pattern -->
        <div class="absolute top-1/2 right-8 w-16 h-16 opacity-10 text-secondary-500">
          <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full">
            <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
          </svg>
        </div>
      </div>
      
      <div class="responsive-container relative z-10">
        <div class="text-center max-w-4xl mx-auto">
          <h1 class="font-display text-5xl md:text-6xl font-bold text-primary-700 dark:text-primary-300 mb-6 animate-fade-in-up">
            Contactez-<span class="text-gradient-natural">Nous</span>
          </h1>
          <p class="text-xl md:text-2xl text-secondary-600 dark:text-secondary-400 font-accent italic mb-6 animate-fade-in-up animation-delay-100">
            De nos ateliers marocains à votre maison
          </p>
          <p class="body-large text-background-600 dark:text-background-400 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Nous sommes fiers de notre héritage marocain et de nos traditions artisanales. Notre équipe est là pour vous accompagner dans votre voyage vers une beauté naturelle authentique.
          </p>
          
          <!-- Moroccan flag accent -->
          <div class="flex items-center justify-center mt-8 animate-fade-in-up animation-delay-300">
            <div class="flex items-center space-x-2 px-4 py-2 bg-white/80 dark:bg-background-800/80 rounded-full backdrop-blur-sm">
              <span class="text-2xl">🇲🇦</span>
              <span class="text-sm font-medium text-background-700 dark:text-background-300">Fait au Maroc avec amour</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Information Cards -->
    <section class="py-16 -mt-12 relative z-10">
      <div class="responsive-container">
        <div class="grid md:grid-cols-3 gap-8 mb-16">
          <!-- Workshop Location -->
          <div class="card-natural p-8 text-center group hover:shadow-warm transition-all duration-300">
            <div class="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-100 to-eucalyptus-100 dark:from-primary-900/20 dark:to-eucalyptus-900/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span class="text-3xl">🏭</span>
            </div>
            <h3 class="text-xl font-bold text-primary-700 dark:text-primary-300 mb-4">Notre Atelier</h3>
            <div class="space-y-2 text-background-600 dark:text-background-400">
              <p class="font-medium">Quartier Industriel Sidi Ghanem</p>
              <p>Route de Safi, Marrakech</p>
              <p>40000 Marrakech, Maroc</p>
            </div>
            <div class="mt-4 text-sm text-eucalyptus-600 dark:text-eucalyptus-400 font-medium">
              🕒 Lun-Ven: 8h00-17h00 GMT+1
            </div>
          </div>

          <!-- Customer Service -->
          <div class="card-natural p-8 text-center group hover:shadow-warm transition-all duration-300">
            <div class="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-eucalyptus-100 to-cream-100 dark:from-eucalyptus-900/20 dark:to-cream-900/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span class="text-3xl">📞</span>
            </div>
            <h3 class="text-xl font-bold text-primary-700 dark:text-primary-300 mb-4">Service Client</h3>
            <div class="space-y-3 text-background-600 dark:text-background-400">
              <a href="tel:+212524123456" class="block hover:text-primary-600 transition-colors">
                <span class="font-medium">📱 +212 524 12 34 56</span>
                <div class="text-sm text-eucalyptus-600 dark:text-eucalyptus-400">WhatsApp disponible</div>
              </a>
              <a href="mailto:contact@morrgana.ma" class="block hover:text-primary-600 transition-colors">
                <span class="font-medium">✉️ contact@morrgana.ma</span>
              </a>
            </div>
            <div class="mt-4 text-sm text-eucalyptus-600 dark:text-eucalyptus-400 font-medium">
              Réponse sous 24h en français/arabe
            </div>
          </div>

          <!-- Shipping -->
          <div class="card-natural p-8 text-center group hover:shadow-warm transition-all duration-300">
            <div class="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-cream-100 to-secondary-100 dark:from-cream-900/20 dark:to-secondary-900/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span class="text-3xl">🚚</span>
            </div>
            <h3 class="text-xl font-bold text-primary-700 dark:text-primary-300 mb-4">Livraison</h3>
            <div class="space-y-2 text-background-600 dark:text-background-400">
              <p><span class="font-medium">🇲🇦 Maroc:</span> 2-3 jours</p>
              <p><span class="font-medium">🇫🇷 France:</span> 5-7 jours</p>
              <p><span class="font-medium">🌍 International:</span> 7-14 jours</p>
            </div>
            <div class="mt-4 text-sm text-eucalyptus-600 dark:text-eucalyptus-400 font-medium">
              Livraison gratuite dès 300 DH
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Form Section -->
    <section class="py-16">
      <div class="responsive-container">
        <div class="grid lg:grid-cols-2 gap-16 items-start">
          <!-- Contact Form -->
          <div class="card-natural p-8">
            <div class="mb-8">
              <h2 class="text-3xl font-bold text-primary-700 dark:text-primary-300 mb-4">
                Envoyez-nous un <span class="text-gradient-natural">Message</span>
              </h2>
              <p class="text-background-600 dark:text-background-400">
                Notre équipe berbère est là pour vous aider dans votre langue préférée. N'hésitez pas à nous écrire en français, arabe ou tamazight.
              </p>
            </div>

            <form @submit.prevent="submitForm" class="space-y-6">
              <div class="grid md:grid-cols-2 gap-6">
                <div class="form-group">
                  <label class="input-label">Prénom *</label>
                  <input
                    v-model="form.firstName"
                    type="text"
                    class="input-primary"
                    required
                    placeholder="Votre prénom"
                  />
                </div>
                <div class="form-group">
                  <label class="input-label">Nom *</label>
                  <input
                    v-model="form.lastName"
                    type="text"
                    class="input-primary"
                    required
                    placeholder="Votre nom"
                  />
                </div>
              </div>

              <div class="form-group">
                <label class="input-label">Email *</label>
                <input
                  v-model="form.email"
                  type="email"
                  class="input-primary"
                  required
                  placeholder="votre.email@exemple.com"
                />
              </div>

              <div class="form-group">
                <label class="input-label">Téléphone (WhatsApp)</label>
                <div class="phone-input">
                  <select v-model="form.countryCode" class="text-sm">
                    <option value="+212">🇲🇦 +212</option>
                    <option value="+33">🇫🇷 +33</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+49">🇩🇪 +49</option>
                  </select>
                  <input
                    v-model="form.phone"
                    type="tel"
                    placeholder="6 12 34 56 78"
                  />
                </div>
                <p class="input-help">Nous pouvons vous contacter via WhatsApp</p>
              </div>

              <div class="form-group">
                <label class="input-label">Sujet *</label>
                <select v-model="form.subject" class="select-primary" required>
                  <option value="">Choisissez un sujet</option>
                  <option value="product">Question sur un produit</option>
                  <option value="order">Suivi de commande</option>
                  <option value="shipping">Livraison</option>
                  <option value="return">Retour/Échange</option>
                  <option value="wholesale">Vente en gros</option>
                  <option value="partnership">Partenariat</option>
                  <option value="other">Autre</option>
                </select>
              </div>

              <div class="form-group">
                <label class="input-label">Langue préférée</label>
                <div class="flex flex-wrap gap-3">
                  <label v-for="lang in languages" :key="lang.code" class="flex items-center">
                    <input 
                      v-model="form.preferredLanguage" 
                      :value="lang.code"
                      type="radio" 
                      class="radio-primary mr-2"
                    />
                    <span class="text-sm">{{ lang.flag }} {{ lang.name }}</span>
                  </label>
                </div>
              </div>

              <div class="form-group">
                <label class="input-label">Message *</label>
                <textarea
                  v-model="form.message"
                  class="textarea-primary"
                  rows="5"
                  required
                  placeholder="Décrivez votre demande en détail..."
                ></textarea>
                <div class="input-count">{{ form.message.length }}/1000</div>
              </div>

              <!-- Moroccan touch -->
              <div class="p-4 bg-gradient-to-r from-primary-50 to-eucalyptus-50 dark:from-primary-900/20 dark:to-eucalyptus-900/20 rounded-soft border border-primary-200 dark:border-primary-700">
                <div class="flex items-start space-x-3">
                  <span class="text-2xl">🫖</span>
                  <div class="text-sm text-background-700 dark:text-background-300">
                    <p class="font-medium mb-1">Un thé à la menthe virtuel vous attend !</p>
                    <p>Notre équipe vous répondra avec la même hospitalité que si vous visitiez notre riad.</p>
                  </div>
                </div>
              </div>

              <div class="flex items-center justify-between pt-6">
                <div class="flex items-center">
                  <input v-model="form.newsletter" type="checkbox" class="checkbox-primary mr-3" />
                  <label class="text-sm text-background-700 dark:text-background-300">
                    Recevoir nos actualités et promotions
                  </label>
                </div>
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="btn-primary btn-lg group"
                >
                  <span v-if="isSubmitting" class="mr-2">⏳</span>
                  <span v-else class="mr-2">🕊️</span>
                  {{ isSubmitting ? 'Envoi en cours...' : 'Envoyer le message' }}
                  <svg v-if="!isSubmitting" class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>

          <!-- Additional Information -->
          <div class="space-y-8">
            <!-- Moroccan Heritage -->
            <!--div class="card-natural p-8">
              <h3 class="text-2xl font-bold text-primary-700 dark:text-primary-300 mb-6 flex items-center">
                <span class="mr-3">🏺</span>
                Notre Héritage Marocain
              </h3>
              <div class="space-y-4 text-background-600 dark:text-background-400">
                <p>
                  Depuis 3 générations, notre famille perpétue l'art ancestral des soins naturels berbères dans les montagnes de l'Atlas.
                </p>
                <p>
                  Nos gommages sont préparés selon des recettes traditionnelles transmises par nos grand-mères, enrichies des bienfaits de l'argile rouge du Maroc et des huiles d'argan et de rose de Dadès.
                </p>
                <div class="flex items-center space-x-4 pt-4">
                  <div class="text-center">
                    <div class="text-2xl font-bold text-primary-600 dark:text-primary-400">1953</div>
                    <div class="text-xs text-eucalyptus-600 dark:text-eucalyptus-400">Année de création</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-eucalyptus-600 dark:text-eucalyptus-400">3</div>
                    <div class="text-xs text-eucalyptus-600 dark:text-eucalyptus-400">Générations</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-secondary-600 dark:text-secondary-400">100%</div>
                    <div class="text-xs text-eucalyptus-600 dark:text-eucalyptus-400">Artisanal</div>
                  </div>
                </div>
              </div>
            </div-->

            <!-- FAQ Quick Links -->
            <div class="card-natural p-8">
              <h3 class="text-xl font-bold text-primary-700 dark:text-primary-300 mb-6">Questions Fréquentes</h3>
              <div class="space-y-4">
                <div v-for="faq in quickFAQs" :key="faq.id" 
                     class="p-4 bg-background-50 dark:bg-background-800 rounded-lg hover:shadow-soft transition-all duration-200 cursor-pointer"
                     @click="faq.open = !faq.open">
                  <div class="flex items-center justify-between">
                    <h4 class="font-medium text-background-900 dark:text-background-100">{{ faq.question }}</h4>
                    <svg :class="{ 'rotate-180': faq.open }" class="w-5 h-5 text-primary-600 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                  <div v-if="faq.open" class="mt-3 text-sm text-background-600 dark:text-background-400">
                    {{ faq.answer }}
                  </div>
                </div>
              </div>
              <NuxtLink to="/faq" class="inline-flex items-center mt-6 text-primary-600 hover:text-primary-700 font-medium">
                Voir toutes les FAQ
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </NuxtLink>
            </div>

            <!-- Social Media -->
            <div class="card-natural p-8">
              <h3 class="text-xl font-bold text-primary-700 dark:text-primary-300 mb-6">Suivez-nous</h3>
              <div class="grid grid-cols-2 gap-4">
                <a href="#" class="flex items-center p-3 bg-background-50 dark:bg-background-800 rounded-lg hover:shadow-soft transition-all duration-200">
                  <span class="text-2xl mr-3">📸</span>
                  <div>
                    <div class="font-medium text-background-900 dark:text-background-100">Instagram</div>
                    <div class="text-xs text-eucalyptus-600 dark:text-eucalyptus-400">@morrgana.maroc</div>
                  </div>
                </a>
                <a href="#" class="flex items-center p-3 bg-background-50 dark:bg-background-800 rounded-lg hover:shadow-soft transition-all duration-200">
                  <span class="text-2xl mr-3">💬</span>
                  <div>
                    <div class="font-medium text-background-900 dark:text-background-100">WhatsApp</div>
                    <div class="text-xs text-eucalyptus-600 dark:text-eucalyptus-400">Chat direct</div>
                  </div>
                </a>
                <a href="#" class="flex items-center p-3 bg-background-50 dark:bg-background-800 rounded-lg hover:shadow-soft transition-all duration-200">
                  <span class="text-2xl mr-3">📘</span>
                  <div>
                    <div class="font-medium text-background-900 dark:text-background-100">Facebook</div>
                    <div class="text-xs text-eucalyptus-600 dark:text-eucalyptus-400">Morrgana Maroc</div>
                  </div>
                </a>
                <a href="#" class="flex items-center p-3 bg-background-50 dark:bg-background-800 rounded-lg hover:shadow-soft transition-all duration-200">
                  <span class="text-2xl mr-3">🎵</span>
                  <div>
                    <div class="font-medium text-background-900 dark:text-background-100">TikTok</div>
                    <div class="text-xs text-eucalyptus-600 dark:text-eucalyptus-400">Tutoriels beauté</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="py-16 bg-background-100 dark:bg-background-800">
      <div class="responsive-container">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-primary-700 dark:text-primary-300 mb-4">
            Visitez Notre <span class="text-gradient-natural">Atelier</span>
          </h2>
          <p class="text-background-600 dark:text-background-400 max-w-2xl mx-auto">
            Découvrez où naissent nos produits dans notre atelier traditionnel de Marrakech. Visites sur rendez-vous uniquement.
          </p>
        </div>
        
        <div class="card-natural p-8 text-center">
          <div class="aspect-video bg-gradient-to-br from-eucalyptus-100 to-primary-100 dark:from-eucalyptus-900/20 dark:to-primary-900/20 rounded-lg mb-6 flex items-center justify-center">
            <div class="text-center">
              <span class="text-6xl mb-4 block">🗺️</span>
              <p class="text-lg font-medium text-primary-700 dark:text-primary-300 mb-2">Carte Interactive</p>
              <p class="text-sm text-background-600 dark:text-background-400">Intégration Google Maps à venir</p>
              <button class="mt-4 btn-secondary">
                <span class="mr-2">📍</span>
                Ouvrir dans Google Maps
              </button>
            </div>
          </div>
          
          <div class="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 class="font-semibold text-primary-700 dark:text-primary-300 mb-2">🚗 En voiture</h4>
              <p class="text-background-600 dark:text-background-400">Parking gratuit disponible. Sortie Sidi Ghanem depuis l'autoroute A7.</p>
            </div>
            <div>
              <h4 class="font-semibold text-primary-700 dark:text-primary-300 mb-2">🚌 Transport public</h4>
              <p class="text-background-600 dark:text-background-400">Bus ligne 18 jusqu'à l'arrêt "Zone Industrielle".</p>
            </div>
            <div>
              <h4 class="font-semibold text-primary-700 dark:text-primary-300 mb-2">✈️ Depuis l'aéroport</h4>
              <p class="text-background-600 dark:text-background-400">25 minutes en taxi ou navette privée disponible.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Toast Notifications -->
    <div class="fixed bottom-4 right-4 z-50">
      <transition name="slide-up">
        <div
          v-if="toast.show"
          class="p-4 rounded-lg shadow-lg max-w-sm backdrop-blur-sm"
          :class="{
            'bg-success-500/90 text-white': toast.type === 'success',
            'bg-error-500/90 text-white': toast.type === 'error',
            'bg-primary-500/90 text-white': toast.type === 'info'
          }"
        >
          <div class="flex items-center">
            <span class="mr-3 text-lg">
              {{ toast.type === 'success' ? '✅' : toast.type === 'error' ? '❌' : 'ℹ️' }}
            </span>
            <span class="font-medium flex-1">{{ toast.message }}</span>
            <button @click="toast.show = false" class="ml-3 hover:opacity-70">
              <span class="text-xl">&times;</span>
            </button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// SEO Meta
useSeoMeta({
  title: 'Contact | Morrgana - Cosmétiques Naturels du Maroc',
  ogTitle: 'Contact | Morrgana - Cosmétiques Naturels du Maroc',
  description: 'Contactez notre équipe marocaine pour toutes vos questions sur nos gommages corporels naturels. Service client en français, arabe et berbère.',
  ogDescription: 'Contactez notre équipe marocaine pour toutes vos questions sur nos gommages corporels naturels. Service client en français, arabe et berbère.',
  ogImage: '/images/contact-morocco.jpg',
  twitterCard: 'summary_large_image',
})

// State
const isSubmitting = ref(false)

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  countryCode: '+212',
  phone: '',
  subject: '',
  preferredLanguage: 'fr',
  message: '',
  newsletter: false
})

const toast = reactive({
  show: false,
  message: '',
  type: 'success',
  timeout: null
})

const languages = ref([
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'العربية', flag: '🇲🇦' },
  { code: 'ber', name: 'Tamazight', flag: 'ⴰⵎⴰⵣⵉⵖ' },
  { code: 'en', name: 'English', flag: '🇬🇧' }
])

const quickFAQs = ref([
  {
    id: 1,
    question: 'Vos produits sont-ils certifiés halal ?',
    answer: 'Oui, tous nos produits sont certifiés halal par l\'organisme marocain de certification. Nous respectons les traditions islamiques dans notre processus de fabrication.',
    open: false
  },
  {
    id: 2,
    question: 'Livrez-vous dans toutes les villes du Maroc ?',
    answer: 'Nous livrons dans toutes les grandes villes du Maroc (Casablanca, Rabat, Fès, Tanger, Agadir, etc.) ainsi que dans de nombreuses villes moyennes. Contactez-nous pour vérifier votre zone.',
    open: false
  },
  {
    id: 3,
    question: 'Puis-je payer en dirhams marocains ?',
    answer: 'Absolument ! Nous acceptons les paiements en MAD via virement bancaire, carte bancaire marocaine, ou paiement à la livraison dans certaines zones.',
    open: false
  },
  {
    id: 4,
    question: 'Proposez-vous des ateliers de fabrication ?',
    answer: 'Oui ! Nous organisons des ateliers découverte dans notre atelier de Marrakech. Une expérience unique pour apprendre les secrets de nos grand-mères berbères.',
    open: false
  }
])

// Methods
async function submitForm() {
  isSubmitting.value = true
  
  try {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Reset form
    Object.assign(form, {
      firstName: '',
      lastName: '',
      email: '',
      countryCode: '+212',
      phone: '',
      subject: '',
      preferredLanguage: 'fr',
      message: '',
      newsletter: false
    })
    
    showToast('شكرا لك! Votre message a été envoyé avec succès. Notre équipe vous répondra dans les 24h.', 'success')
  } catch (error) {
    showToast('Une erreur est survenue. Veuillez réessayer ou nous contacter directement.', 'error')
  } finally {
    isSubmitting.value = false
  }
}

function showToast(message, type = 'success') {
  if (toast.timeout) {
    clearTimeout(toast.timeout)
  }

  toast.message = message
  toast.type = type
  toast.show = true

  toast.timeout = setTimeout(() => {
    toast.show = false
  }, 6000)
}
</script>

<style scoped>
/* Transitions */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

/* Animation delays */
.animation-delay-100 { animation-delay: 100ms; }
.animation-delay-200 { animation-delay: 200ms; }
.animation-delay-300 { animation-delay: 300ms; }

/* Moroccan-inspired animations */
@keyframes gentle-bounce {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

.animate-gentle-bounce {
  animation: gentle-bounce 3s ease-in-out infinite;
}

/* Custom phone input styling */
.phone-input {
  @apply flex rounded-soft border-2 border-background-300 dark:border-background-600 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-400 overflow-hidden bg-background-50 dark:bg-background-800;
}

.phone-input select {
  @apply px-3 py-3 bg-background-100 dark:bg-background-700 border-0 text-background-900 dark:text-white focus:outline-none;
}

.phone-input input {
  @apply flex-1 px-4 py-3 border-0 bg-transparent text-background-900 dark:text-white placeholder-background-500 dark:placeholder-background-400 focus:outline-none;
}

/* Enhanced selection styling for Arabic text */
::selection {
  @apply bg-primary-200/30 dark:bg-primary-700/30;
}

/* RTL support for Arabic text */
[dir="rtl"] {
  text-align: right;
}

/* Moroccan pattern background */
.moroccan-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d67341' fill-opacity='0.05'%3E%3Cpath d='M30 30c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z'/%3E%3C/g%3E%3C/svg%3E");
}

/* Custom gradient text for Arabic */
.text-gradient-arabic {
  background: linear-gradient(135deg, #d67341, #7d8b5e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>