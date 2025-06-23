<!-- pages/index.vue -->
<template>
  <div class="min-h-screen bg-background-50 dark:bg-background-900">
    <!-- Hero Section -->
    <HeroSection />
    
    <!-- Featured Products Slider -->
    <FeaturedProductsSlider />
    
    <!-- Brand Story Section -->
    <section class="relative py-24 bg-gradient-to-br from-eucalyptus-50 to-cream-50 dark:from-eucalyptus-900/10 dark:to-cream-900/10 overflow-hidden">
      <!-- Background Elements -->
      <div class="absolute inset-0">
        <div class="absolute top-16 left-1/4 w-64 h-64 bg-gradient-to-br from-primary-200/20 to-eucalyptus-200/20 rounded-organic animate-float opacity-40"></div>
        <div class="absolute bottom-20 right-1/3 w-48 h-48 bg-gradient-to-br from-cream-200/30 to-secondary-200/30 rounded-organic animate-gentle-bounce opacity-50"></div>
      </div>
      
      <div class="responsive-container relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <!-- Content -->
          <div class="space-y-8 animate-fade-in-up">
            <div class="space-y-4">
              <h2 class="font-display text-4xl md:text-5xl font-bold text-primary-700 dark:text-primary-300 leading-tight">
                Notre Histoire
              </h2>
              <h3 class="text-2xl md:text-3xl text-secondary-600 dark:text-secondary-400 font-accent italic">
                Née de l'amour pour la beauté naturelle
              </h3>
            </div>
            
            <div class="space-y-6 text-background-700 dark:text-background-300">
              <p class="body-large leading-relaxed">
                Tout a commencé dans un petit atelier artisanal, avec une passion pour les ingrédients naturels 
                et le désir de créer des produits qui respectent votre peau et l'environnement.
              </p>
              
              <p class="body-regular">
                Chaque gommage est soigneusement formulé à la main avec des ingrédients biologiques sourcés 
                de manière éthique. Nous croyons que la beauté ne devrait jamais compromettre votre santé 
                ou celle de notre planète.
              </p>
              
              <div class="flex flex-wrap gap-6 pt-4">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-full bg-eucalyptus-100 dark:bg-eucalyptus-900/20 flex items-center justify-center">
                    <span class="text-2xl">🌱</span>
                  </div>
                  <div>
                    <h4 class="font-semibold text-primary-700 dark:text-primary-300">100% Naturel</h4>
                    <p class="text-sm text-background-600 dark:text-background-400">Ingrédients biologiques</p>
                  </div>
                </div>
                
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
                    <span class="text-2xl">♻️</span>
                  </div>
                  <div>
                    <h4 class="font-semibold text-primary-700 dark:text-primary-300">Éco-Responsable</h4>
                    <p class="text-sm text-background-600 dark:text-background-400">Emballage recyclable</p>
                  </div>
                </div>
                
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-full bg-cream-100 dark:bg-cream-900/20 flex items-center justify-center">
                    <span class="text-2xl">🤝</span>
                  </div>
                  <div>
                    <h4 class="font-semibold text-primary-700 dark:text-primary-300">Commerce Équitable</h4>
                    <p class="text-sm text-background-600 dark:text-background-400">Partenaires locaux</p>
                  </div>
                </div>
              </div>
            </div>
            
            <button @click="navigateToAbout" class="btn-eucalyptus group">
              <span>Découvrir Notre Histoire</span>
              <svg class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
          
          <!-- Visual -->
          <div class="relative">
            <div class="grid grid-cols-2 gap-6">
              <div class="space-y-6">
                <div class="card-organic p-6 bg-gradient-to-br from-eucalyptus-100 to-primary-100 dark:from-eucalyptus-900/20 dark:to-primary-900/20">
                  <div class="w-16 h-16 rounded-organic bg-eucalyptus-200 dark:bg-eucalyptus-800 flex items-center justify-center mb-4">
                    <span class="text-2xl">🌿</span>
                  </div>
                  <h4 class="font-display text-lg font-bold text-primary-700 dark:text-primary-300 mb-2">
                    Ingrédients Précieux
                  </h4>
                  <p class="text-sm text-background-600 dark:text-background-400">
                    Sélectionnés avec soin pour leurs propriétés exceptionnelles
                  </p>
                </div>
                
                <div class="card-organic p-6 bg-gradient-to-br from-cream-100 to-secondary-100 dark:from-cream-900/20 dark:to-secondary-900/20">
                  <div class="w-16 h-16 rounded-organic bg-cream-200 dark:bg-cream-800 flex items-center justify-center mb-4">
                    <span class="text-2xl">✨</span>
                  </div>
                  <h4 class="font-display text-lg font-bold text-secondary-600 dark:text-secondary-400 mb-2">
                    Rituel Spa
                  </h4>
                  <p class="text-sm text-background-600 dark:text-background-400">
                    Une expérience de détente à domicile
                  </p>
                </div>
              </div>
              
              <div class="space-y-6 pt-12">
                <div class="card-organic p-6 bg-gradient-to-br from-primary-100 to-eucalyptus-100 dark:from-primary-900/20 dark:to-eucalyptus-900/20">
                  <div class="w-16 h-16 rounded-organic bg-primary-200 dark:bg-primary-800 flex items-center justify-center mb-4">
                    <span class="text-2xl">🌍</span>
                  </div>
                  <h4 class="font-display text-lg font-bold text-primary-700 dark:text-primary-300 mb-2">
                    Impact Positif
                  </h4>
                  <p class="text-sm text-background-600 dark:text-background-400">
                    Respectueux de l'environnement et de votre peau
                  </p>
                </div>
                
                <div class="card-organic p-6 bg-gradient-to-br from-secondary-100 to-cream-100 dark:from-secondary-900/20 dark:to-cream-900/20">
                  <div class="w-16 h-16 rounded-organic bg-secondary-200 dark:bg-secondary-800 flex items-center justify-center mb-4">
                    <span class="text-2xl">💎</span>
                  </div>
                  <h4 class="font-display text-lg font-bold text-secondary-600 dark:text-secondary-400 mb-2">
                    Qualité Premium
                  </h4>
                  <p class="text-sm text-background-600 dark:text-background-400">
                    Fabrication artisanale de haute qualité
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="py-24 bg-background-50 dark:bg-background-900 relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 bg-natural-texture opacity-30"></div>
      
      <div class="responsive-container relative z-10">
        <div class="text-center mb-20">
          <h2 class="font-display text-4xl md:text-5xl font-bold text-primary-700 dark:text-primary-300 mb-6">
            Les Bienfaits de Nos <span class="text-gradient-natural">Gommages</span>
          </h2>
          <p class="body-large text-background-600 dark:text-background-400 max-w-3xl mx-auto">
            Découvrez comment nos gommages naturels transforment votre routine beauté en un véritable rituel de bien-être
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="(benefit, index) in benefits" :key="index"
               class="card-natural p-8 text-center group hover:shadow-natural transition-all duration-500"
               :class="{ 'animate-fade-in-up': true, [`animation-delay-${index * 100}`]: true }">
            
            <!-- Icon -->
            <div class="w-20 h-20 mx-auto mb-6 rounded-organic bg-gradient-to-br from-eucalyptus-100 to-primary-100 dark:from-eucalyptus-900/20 dark:to-primary-900/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span class="text-3xl">{{ benefit.icon }}</span>
            </div>
            
            <!-- Title -->
            <h3 class="font-display text-xl font-bold text-primary-700 dark:text-primary-300 mb-4">
              {{ benefit.title }}
            </h3>
            
            <!-- Description -->
            <p class="text-background-600 dark:text-background-400 text-sm leading-relaxed">
              {{ benefit.description }}
            </p>
            
            <!-- Additional Info -->
            <div class="mt-4 pt-4 border-t border-background-200 dark:border-background-700">
              <span class="inline-flex items-center gap-2 text-xs text-eucalyptus-600 dark:text-eucalyptus-400 font-medium">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                {{ benefit.feature }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Ingredients Showcase -->
    <section class="py-24 bg-gradient-to-br from-cream-50 to-background-100 dark:from-cream-900/10 dark:to-background-800 relative">
      <!-- Floating Elements -->
      <div class="absolute top-1/4 right-1/4 w-32 h-32 bg-eucalyptus-200/30 rounded-organic animate-float opacity-60"></div>
      <div class="absolute bottom-1/3 left-1/5 w-24 h-24 bg-primary-200/40 rounded-organic animate-gentle-bounce opacity-50"></div>
      
      <div class="responsive-container relative z-10">
        <div class="text-center mb-20">
          <h2 class="font-display text-4xl md:text-5xl font-bold text-primary-700 dark:text-primary-300 mb-6">
            Ingrédients <span class="text-gradient-warm">d'Exception</span>
          </h2>
          <p class="body-large text-background-600 dark:text-background-400 max-w-3xl mx-auto">
            Chaque ingrédient est choisi pour ses propriétés uniques et son origine naturelle
          </p>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div v-for="(ingredient, index) in premiumIngredients" :key="index"
               class="group">
            
            <!-- Ingredient Card -->
            <div class="card-organic p-8 text-center shadow-natural hover:shadow-warm transition-all duration-500 group-hover:-translate-y-2">
              <!-- Image Placeholder -->
              <div class="w-32 h-32 mx-auto mb-6 rounded-organic overflow-hidden shadow-soft">
                <div :class="[
                  'w-full h-full flex items-center justify-center text-4xl transition-transform duration-500 group-hover:scale-110',
                  ingredient.bgColor
                ]">
                  {{ ingredient.icon }}
                </div>
              </div>
              
              <!-- Name & Origin -->
              <div class="mb-6">
                <h3 class="font-display text-2xl font-bold text-primary-700 dark:text-primary-300 mb-2">
                  {{ ingredient.name }}
                </h3>
                <p class="text-eucalyptus-600 dark:text-eucalyptus-400 font-medium text-sm">
                  {{ ingredient.origin }}
                </p>
              </div>
              
              <!-- Benefits -->
              <div class="space-y-3 mb-6">
                <h4 class="font-semibold text-background-900 dark:text-background-100 text-sm uppercase tracking-wide">
                  Bienfaits
                </h4>
                <ul class="space-y-2">
                  <li v-for="benefit in ingredient.benefits" :key="benefit"
                      class="flex items-center gap-2 text-sm text-background-600 dark:text-background-400">
                    <svg class="w-3 h-3 text-eucalyptus-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    {{ benefit }}
                  </li>
                </ul>
              </div>
              
              <!-- Scientific Info -->
              <div class="pt-4 border-t border-background-200 dark:border-background-700">
                <p class="text-xs text-background-500 dark:text-background-500 italic">
                  {{ ingredient.science }}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Call to Action -->
        <div class="text-center">
          <button @click="navigateToIngredients" class="btn-primary btn-lg group">
            <span>Découvrir Tous Nos Ingrédients</span>
            <svg class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="py-24 bg-background-50 dark:bg-background-900">
      <div class="responsive-container">
        <div class="text-center mb-20">
          <h2 class="font-display text-4xl md:text-5xl font-bold text-primary-700 dark:text-primary-300 mb-6">
            Votre Rituel <span class="text-gradient-natural">Bien-Être</span>
          </h2>
          <p class="body-large text-background-600 dark:text-background-400 max-w-3xl mx-auto">
            Transformez votre salle de bain en spa privé avec notre rituel de gommage en 4 étapes simples
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="(step, index) in ritualSteps" :key="index"
               class="relative group">
            
            <!-- Step Number -->
            <div class="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-sage-eucalyptus text-white flex items-center justify-center font-bold text-lg shadow-natural z-10">
              {{ index + 1 }}
            </div>
            
            <!-- Step Card -->
            <div class="card-natural p-8 pt-12 text-center group-hover:shadow-natural transition-all duration-300">
              <!-- Icon -->
              <div class="w-20 h-20 mx-auto mb-6 rounded-organic bg-gradient-to-br from-eucalyptus-100 to-primary-100 dark:from-eucalyptus-900/20 dark:to-primary-900/20 flex items-center justify-center">
                <span class="text-3xl">{{ step.icon }}</span>
              </div>
              
              <!-- Title -->
              <h3 class="font-display text-xl font-bold text-primary-700 dark:text-primary-300 mb-4">
                {{ step.title }}
              </h3>
              
              <!-- Description -->
              <p class="text-background-600 dark:text-background-400 text-sm leading-relaxed mb-4">
                {{ step.description }}
              </p>
              
              <!-- Tip -->
              <div class="mt-4 p-3 rounded-soft bg-eucalyptus-50 dark:bg-eucalyptus-900/20">
                <p class="text-xs text-eucalyptus-700 dark:text-eucalyptus-300 font-medium">
                  💡 {{ step.tip }}
                </p>
              </div>
            </div>
            
            <!-- Connector Line (except for last item) -->
            <div v-if="index < ritualSteps.length - 1" 
                 class="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary-300 to-eucalyptus-300 transform -translate-y-1/2 z-0">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-24 bg-gradient-to-br from-eucalyptus-50 to-primary-50 dark:from-eucalyptus-900/10 dark:to-primary-900/10 relative overflow-hidden">
      <!-- Background Elements -->
      <div class="absolute top-0 left-0 w-full h-full opacity-10">
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-200 rounded-organic animate-float"></div>
        <div class="absolute bottom-1/4 right-1/4 w-64 h-64 bg-eucalyptus-200 rounded-organic animate-gentle-bounce"></div>
      </div>
      
      <div class="responsive-container relative z-10">
        <div class="text-center mb-20">
          <h2 class="font-display text-4xl md:text-5xl font-bold text-primary-700 dark:text-primary-300 mb-6">
            Elles Nous Font <span class="text-gradient-warm">Confiance</span>
          </h2>
          <p class="body-large text-background-600 dark:text-background-400 max-w-3xl mx-auto">
            Découvrez les transformations authentiques de nos clientes qui ont adopté nos gommages naturels
          </p>
        </div>
        
        <!-- Featured Testimonial -->
        <div class="card-organic p-12 text-center shadow-warm hover:shadow-elevated transition-all duration-500 max-w-4xl mx-auto mb-16">
          <div class="flex justify-center mb-6">
            <div class="flex">
              <svg v-for="i in 5" :key="i" class="w-6 h-6 text-cream-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
          </div>
          
          <blockquote class="text-2xl md:text-3xl font-accent italic text-primary-700 dark:text-primary-300 leading-relaxed mb-8">
            "Ce gommage a complètement transformé ma routine beauté. Ma peau n'a jamais été aussi douce et éclatante. 
            C'est devenu mon moment de détente privilégié !"
          </blockquote>
          
          <div class="flex items-center justify-center gap-4">
            <div class="w-16 h-16 rounded-full bg-gradient-to-br from-eucalyptus-200 to-primary-200 flex items-center justify-center">
              <span class="text-white font-bold text-lg">AL</span>
            </div>
            <div class="text-left">
              <h4 class="font-semibold text-background-900 dark:text-background-100">Anne-Laure M.</h4>
              <p class="text-sm text-background-600 dark:text-background-400">Cliente depuis 2 ans</p>
            </div>
          </div>
        </div>
        
        <!-- Stats Row -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div v-for="(stat, index) in stats" :key="index"
               class="text-center p-6">
            <div class="text-4xl md:text-5xl font-bold text-secondary-600 dark:text-secondary-400 mb-2">
              {{ stat.number }}
            </div>
            <div class="text-background-600 dark:text-background-400 font-medium">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trust & Security Section -->
    <section class="py-16 bg-background-100 dark:bg-background-800 border-t border-background-200 dark:border-background-700">
      <div class="responsive-container">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <!-- Trust Indicators -->
          <div class="flex flex-col items-center text-center group">
            <div class="w-16 h-16 rounded-full bg-eucalyptus-100 dark:bg-eucalyptus-900/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-8 h-8 text-eucalyptus-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
            <h3 class="font-semibold text-background-900 dark:text-background-100 text-sm mb-1">
              Livraison Gratuite
            </h3>
            <p class="text-xs text-background-600 dark:text-background-400">
              Dès 50€ d'achat
            </p>
          </div>
          
          <div class="flex flex-col items-center text-center group">
            <div class="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <h3 class="font-semibold text-background-900 dark:text-background-100 text-sm mb-1">
              Paiement Sécurisé
            </h3>
            <p class="text-xs text-background-600 dark:text-background-400">
              SSL & 3D Secure
            </p>
          </div>
          
          <div class="flex flex-col items-center text-center group">
            <div class="w-16 h-16 rounded-full bg-secondary-100 dark:bg-secondary-900/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-8 h-8 text-secondary-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                <path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clip-rule="evenodd" />
              </svg>
            </div>
            <h3 class="font-semibold text-background-900 dark:text-background-100 text-sm mb-1">
              Retour Gratuit
            </h3>
            <p class="text-xs text-background-600 dark:text-background-400">
              30 jours pour changer d'avis
            </p>
          </div>
          
          <div class="flex flex-col items-center text-center group">
            <div class="w-16 h-16 rounded-full bg-cream-100 dark:bg-cream-900/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-8 h-8 text-cream-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" />
              </svg>
            </div>
            <h3 class="font-semibold text-background-900 dark:text-background-100 text-sm mb-1">
              Support Client
            </h3>
            <p class="text-xs text-background-600 dark:text-background-400">
              7j/7 pour vous aider
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useToast } from '~/composables/useToast'

const router = useRouter()
const toast = useToast()

// Newsletter
const email = ref('')
const isSubscribing = ref(false)

// Data for sections
const benefits = ref([
  {
    icon: '✨',
    title: 'Exfoliation Douce',
    description: 'Élimine les cellules mortes en douceur pour révéler une peau plus lisse et éclatante.',
    feature: 'Texture ultra-fine'
  },
  {
    icon: '💧',
    title: 'Hydratation Intense',
    description: 'Nourrit en profondeur grâce aux huiles naturelles pour une peau douce et souple.',
    feature: 'Formule non-desséchante'
  },
  {
    icon: '🌿',
    title: 'Ingrédients Naturels',
    description: 'Formulé avec des ingrédients biologiques respectueux de votre peau et de l\'environnement.',
    feature: '100% certifié bio'
  },
  {
    icon: '🧘‍♀️',
    title: 'Aromathérapie',
    description: 'Les huiles essentielles créent une expérience sensorielle relaxante et apaisante.',
    feature: 'Parfums thérapeutiques'
  }
])

const premiumIngredients = ref([
  {
    name: 'Eucalyptus Bio',
    origin: 'Australie',
    icon: '🌿',
    bgColor: 'bg-gradient-to-br from-eucalyptus-200 to-eucalyptus-300',
    benefits: [
      'Purifie la peau',
      'Effet rafraîchissant',
      'Propriétés antiseptiques',
      'Aromathérapie relaxante'
    ],
    science: 'Riche en eucalyptol, connu pour ses propriétés purifiantes et rafraîchissantes naturelles.'
  },
  {
    name: 'Sel de Mer Morte',
    origin: 'Jordanie',
    icon: '🧂',
    bgColor: 'bg-gradient-to-br from-primary-200 to-primary-300',
    benefits: [
      'Exfoliation naturelle',
      'Reminéralise la peau',
      'Détoxifie en profondeur',
      'Améliore la circulation'
    ],
    science: 'Concentré en minéraux essentiels : magnésium, potassium et calcium pour nourrir la peau.'
  },
  {
    name: 'Huile de Coco Vierge',
    origin: 'Philippines',
    icon: '🥥',
    bgColor: 'bg-gradient-to-br from-cream-200 to-cream-300',
    benefits: [
      'Hydratation longue durée',
      'Protection naturelle',
      'Propriétés antibactériennes',
      'Texture soyeuse'
    ],
    science: 'Riche en acides gras saturés qui forment une barrière protectrice naturelle sur la peau.'
  }
])

const ritualSteps = ref([
  {
    icon: '🚿',
    title: 'Préparez',
    description: 'Sous la douche tiède, humidifiez votre peau pour la préparer au gommage.',
    tip: 'L\'eau tiède ouvre les pores pour une meilleure efficacité'
  },
  {
    icon: '🌊',
    title: 'Appliquez',
    description: 'Prenez une noisette de gommage et massez délicatement par mouvements circulaires.',
    tip: 'Commencez par les pieds et remontez vers le cœur'
  },
  {
    icon: '💆‍♀️',
    title: 'Massez',
    description: 'Insistez sur les zones rugueuses comme les coudes et les genoux pendant 2-3 minutes.',
    tip: 'Prenez votre temps, c\'est votre moment de détente'
  },
  {
    icon: '✨',
    title: 'Rincez',
    description: 'Rincez à l\'eau tiède et admirez votre peau douce et éclatante.',
    tip: 'Terminez par un jet d\'eau fraîche pour tonifier'
  }
])

const stats = ref([
  { number: '10k+', label: 'Clientes satisfaites' },
  { number: '4.9/5', label: 'Note moyenne' },
  { number: '98%', label: 'Recommandent' },
  { number: '100%', label: 'Ingrédients naturels' }
])

// Methods
const navigateToAbout = () => {
  router.push('/about')
}

const navigateToIngredients = () => {
  router.push('/ingredients')
}

const subscribeNewsletter = async () => {
  if (!email.value) return
  
  isSubscribing.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    toast.success('Merci ! Vous êtes maintenant abonnée à notre newsletter.')
    email.value = ''
  } catch (error) {
    toast.error('Une erreur est survenue. Veuillez réessayer.')
  } finally {
    isSubscribing.value = false
  }
}

// SEO Meta
useSeoMeta({
  title: 'Gommages Corporels Naturels | Beauté & Bien-être',
  ogTitle: 'Gommages Corporels Naturels | Beauté & Bien-être',
  description: 'Découvrez notre collection de gommages corporels artisanaux formulés avec des ingrédients 100% naturels. Transformez votre routine beauté en rituel spa à domicile.',
  ogDescription: 'Découvrez notre collection de gommages corporels artisanaux formulés avec des ingrédients 100% naturels. Transformez votre routine beauté en rituel spa à domicile.',
  ogImage: '/images/hero-scrub.jpg',
  twitterCard: 'summary_large_image',
})
</script>

<style scoped>
/* Animation delays for staggered effects */
.animation-delay-0 { animation-delay: 0ms; }
.animation-delay-100 { animation-delay: 100ms; }
.animation-delay-200 { animation-delay: 200ms; }
.animation-delay-300 { animation-delay: 300ms; }
.animation-delay-400 { animation-delay: 400ms; }
.animation-delay-500 { animation-delay: 500ms; }
.animation-delay-600 { animation-delay: 600ms; }

/* Custom scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Enhanced hover effects */
.card-organic:hover,
.card-natural:hover {
  transform: translateY(-4px);
}

/* Newsletter input focus enhancement */
input:focus {
  transform: scale(1.02);
}

/* Custom selection styling */
::selection {
  background-color: rgba(125, 139, 94, 0.3);
  color: inherit;
}
</style>