<!-- pages/about.vue -->
<template>
  <div class="min-h-screen bg-background-50 dark:bg-background-900">
    <!-- Hero Section with MORRGANA Brand Identity -->
    <section class="hero-gradient section-padding relative overflow-hidden py-24 md:py-32 lg:py-40">
      <!-- Moroccan-inspired decorative elements -->
      <div class="absolute inset-0">
        <!-- Traditional Moroccan star pattern -->
        <div class="absolute top-16 left-12 w-40 h-40 opacity-15">
          <svg viewBox="0 0 100 100" class="w-full h-full text-secondary-400 animate-gentle-bounce">
            <path d="M50 5 L60 35 L90 35 L68 53 L78 83 L50 65 L22 83 L32 53 L10 35 L40 35 Z" fill="currentColor" opacity="0.4"/>
            <circle cx="50" cy="50" r="8" fill="currentColor">
              <animate attributeName="r" values="8;12;8" dur="4s" repeatCount="indefinite"/>
            </circle>
          </svg>
        </div>
        
        <!-- Berber carpet pattern -->
        <div class="absolute bottom-20 right-16 w-32 h-32 bg-gradient-to-br from-eucalyptus-200/20 to-primary-200/20 rounded-organic animate-float opacity-60"></div>
        
        <!-- Moroccan architectural element -->
        <div class="absolute top-1/3 right-8 w-20 h-20 opacity-10 text-secondary-500 animate-pulse">
          <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full">
            <path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z"/>
          </svg>
        </div>
      </div>
      
      <div class="responsive-container relative z-10">
        <div class="text-center max-w-5xl mx-auto space-y-8">
          <!-- Brand introduction -->
          <div class="inline-flex items-center space-x-3 px-6 py-3 bg-white/80 dark:bg-background-800/80 rounded-full backdrop-blur-sm animate-fade-in-up">
            <span class="text-2xl">🇲🇦</span>
            <span class="text-lg font-accent italic text-secondary-600 dark:text-secondary-400">Une nouvelle magie marocaine</span>
          </div>
          
          <h1 class="font-display text-6xl md:text-7xl lg:text-8xl font-bold text-primary-700 dark:text-primary-300 leading-tight animate-fade-in-up animation-delay-100">
            MORR<span class="text-gradient-natural">GANA</span>
          </h1>
          
          <p class="text-2xl md:text-3xl text-secondary-600 dark:text-secondary-400 font-accent italic leading-relaxed animate-fade-in-up animation-delay-200">
            L'art du gommage réinventé par le Maroc moderne
          </p>
          
          <div class="max-w-4xl mx-auto space-y-6 animate-fade-in-up animation-delay-300">
            <p class="body-large text-background-600 dark:text-background-400 leading-relaxed">
              MORRGANA naît de la passion d'une nouvelle génération d'artisans marocains pour réinventer 
              les rituels de beauté ancestraux. Inspirée par la richesse des traditions berbères et 
              l'innovation contemporaine, notre marque crée des gommages corporels exceptionnels.
            </p>
            <p class="body-large text-background-600 dark:text-background-400 leading-relaxed">
              Chaque formule capture l'essence du Maroc moderne : authenticité, qualité premium et 
              respect de l'environnement, pour transformer votre routine en véritable rituel spa marocain.
            </p>
          </div>
          
          <!-- Brand essence badge -->
          <div class="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-secondary-100 to-cream-100 dark:from-secondary-900/30 dark:to-cream-900/30 rounded-full animate-fade-in-up animation-delay-400">
            <span class="text-3xl">✨</span>
            <div class="text-left">
              <div class="font-bold text-secondary-700 dark:text-secondary-300">Nouvelle Génération</div>
              <div class="text-sm text-background-600 dark:text-background-400">Créé en 2024 • Esprit Innovant</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Vision & Moroccan Innovation Section -->
    <section class="py-20 md:py-28 bg-background-100 dark:bg-background-800">
      <div class="responsive-container">
        <div class="grid lg:grid-cols-2 gap-20 items-center">
          <div class="space-y-10">
            <div class="space-y-6">
              <h2 class="font-display text-5xl md:text-6xl font-bold text-primary-700 dark:text-primary-300 animate-fade-in-up">
                Notre <span class="text-gradient-natural">Vision</span>
              </h2>
              <p class="text-xl text-secondary-600 dark:text-secondary-400 font-accent italic animate-fade-in-up animation-delay-100">
                Révéler la beauté du Maroc au monde entier
              </p>
            </div>
            
            <div class="space-y-8 text-background-700 dark:text-background-300 animate-fade-in-up animation-delay-200">
              <p class="body-large leading-relaxed">
                MORRGANA est née de l'ambition de créer une marque marocaine de beauté naturelle 
                qui honore nos traditions tout en embrassant l'innovation. Nous puisons dans la 
                richesse de notre patrimoine pour créer des produits d'exception.
              </p>
              <p class="body-large leading-relaxed">
                Notre mission est de faire découvrir au monde entier la sophistication des rituels 
                de beauté marocains, adaptés aux besoins contemporains et aux standards internationaux 
                les plus exigeants.
              </p>
            </div>

            <!-- Brand promise -->
            <div class="p-6 bg-gradient-to-r from-secondary-50 to-cream-50 dark:from-secondary-900/20 dark:to-cream-900/20 rounded-soft border-l-4 border-secondary-500 animate-fade-in-up animation-delay-300">
              <div class="flex items-start space-x-4">
                <span class="text-3xl flex-shrink-0">🌟</span>
                <div>
                  <h3 class="font-semibold text-secondary-700 dark:text-secondary-300 mb-2">La Promesse MORRGANA</h3>
                  <p class="text-sm text-background-600 dark:text-background-400 leading-relaxed">
                    Chaque produit MORRGANA vous transporte dans un hammam de luxe, 
                    où tradition millénaire et innovation moderne se rencontrent pour révéler 
                    votre beauté naturelle.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-8 animate-fade-in-up animation-delay-400">
            <div v-for="(value, index) in brandValues" :key="index" 
                 class="card-natural p-8 text-center group hover:shadow-warm transition-all duration-300">
              <div class="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{{ value.icon }}</div>
              <h3 class="font-semibold text-xl text-primary-700 dark:text-primary-300 mb-4">{{ value.title }}</h3>
              <p class="text-sm text-background-600 dark:text-background-400 leading-relaxed">{{ value.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Brand Story Timeline -->
    <section class="py-20 md:py-28 bg-gradient-to-br from-eucalyptus-50 via-cream-50 to-secondary-50 dark:from-eucalyptus-900/10 dark:via-cream-900/10 dark:to-secondary-900/10">
      <div class="responsive-container">
        <div class="text-center mb-20">
          <div class="inline-flex items-center space-x-3 mb-6 animate-fade-in-up">
            <div class="w-1 h-12 bg-gradient-to-b from-secondary-500 to-eucalyptus-500"></div>
            <span class="text-lg font-medium text-secondary-600 dark:text-secondary-400">Notre Histoire</span>
            <div class="w-1 h-12 bg-gradient-to-b from-eucalyptus-500 to-secondary-500"></div>
          </div>
          
          <h2 class="font-display text-5xl md:text-6xl font-bold text-primary-700 dark:text-primary-300 mb-8 animate-fade-in-up animation-delay-100">
            La Naissance de <span class="text-gradient-natural">MORRGANA</span>
          </h2>
          
          <p class="body-large text-background-600 dark:text-background-400 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            L'histoire d'une marque moderne qui puise ses racines dans l'âme créative du Maroc contemporain
          </p>
        </div>
        
        <div class="max-w-4xl mx-auto space-y-16">
          <div v-for="(milestone, index) in brandStory" :key="index" 
               class="morrgana-timeline-item group animate-fade-in-up"
               :class="`animation-delay-${(index + 1) * 150}`">
            <div class="grid md:grid-cols-[120px_1fr] gap-8 items-start">
              <!-- Timeline badge -->
              <div class="text-center">
                <div class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-secondary-500 to-eucalyptus-500 text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                  {{ milestone.year }}
                </div>
              </div>
              
              <!-- Content -->
              <div class="space-y-4">
                <div class="flex items-center space-x-3">
                  <span class="text-3xl">{{ milestone.icon }}</span>
                  <h3 class="text-2xl md:text-3xl font-semibold text-primary-700 dark:text-primary-300">{{ milestone.title }}</h3>
                </div>
                <p class="text-background-700 dark:text-background-300 leading-relaxed text-lg">{{ milestone.description }}</p>
                
                <!-- Milestone highlight -->
                <div v-if="milestone.highlight" class="p-4 bg-background-50 dark:bg-background-800 rounded-lg border-l-4 border-eucalyptus-400">
                  <p class="text-sm text-eucalyptus-700 dark:text-eucalyptus-300 italic font-medium">{{ milestone.highlight }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Founding Team Section -->
    <!--section class="py-20 md:py-28 bg-background-100 dark:bg-background-800">
      <div class="responsive-container">
        <div class="text-center mb-16">
          <h2 class="font-display text-5xl md:text-6xl font-bold text-primary-700 dark:text-primary-300 mb-8 animate-fade-in-up">
            Les Fondateurs de <span class="text-gradient-natural">MORRGANA</span>
          </h2>
          <p class="body-large text-background-600 dark:text-background-400 max-w-3xl mx-auto animate-fade-in-up animation-delay-100">
            Une équipe passionnée de jeunes entrepreneurs marocains unis par l'amour de la beauté naturelle
          </p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-10">
          <div v-for="(founder, index) in founders" :key="index" 
               class="card-natural p-8 text-center group hover:shadow-warm transition-all duration-300 animate-fade-in-up"
               :class="`animation-delay-${(index + 1) * 150}`">
            <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-secondary-100 to-eucalyptus-100 dark:from-secondary-900/20 dark:to-eucalyptus-900/20 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">
              {{ founder.avatar }}
            </div>
            <h3 class="text-2xl font-bold text-primary-700 dark:text-primary-300 mb-2">{{ founder.name }}</h3>
            <p class="text-eucalyptus-600 dark:text-eucalyptus-400 font-medium mb-4">{{ founder.role }}</p>
            <p class="text-background-600 dark:text-background-400 leading-relaxed mb-6">{{ founder.bio }}</p>

            <div class="p-4 bg-background-50 dark:bg-background-800 rounded-lg border-l-4 border-secondary-400">
              <p class="text-sm text-secondary-700 dark:text-secondary-300 italic">
                "{{ founder.quote }}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section-->

    <!-- Moroccan Ingredients Innovation -->
    <section class="py-20 md:py-28 bg-gradient-to-br from-primary-50 to-eucalyptus-50 dark:from-primary-900/10 dark:to-eucalyptus-900/10">
      <div class="responsive-container">
        <div class="text-center mb-16">
          <h2 class="font-display text-5xl md:text-6xl font-bold text-primary-700 dark:text-primary-300 mb-8 animate-fade-in-up">
            Ingrédients <span class="text-gradient-natural">Signature</span>
          </h2>
          <p class="body-large text-background-600 dark:text-background-400 max-w-3xl mx-auto animate-fade-in-up animation-delay-100">
            MORRGANA sélectionne et transforme les trésors naturels du Maroc avec des techniques innovantes
          </p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-10">
          <div v-for="(ingredient, index) in signatureIngredients" :key="index" 
               class="card-natural p-8 text-center group hover:shadow-warm transition-all duration-300 animate-fade-in-up"
               :class="`animation-delay-${(index + 1) * 150}`">
            <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-secondary-100 to-eucalyptus-100 dark:from-secondary-900/20 dark:to-eucalyptus-900/20 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">
              {{ ingredient.icon }}
            </div>
            <h3 class="text-2xl font-bold text-primary-700 dark:text-primary-300 mb-3">{{ ingredient.name }}</h3>
            <p class="text-eucalyptus-600 dark:text-eucalyptus-400 font-medium mb-4">{{ ingredient.source }}</p>
            <p class="text-background-600 dark:text-background-400 leading-relaxed mb-6">{{ ingredient.description }}</p>
            
            <!-- Innovation highlight -->
            <div class="p-4 bg-background-50 dark:bg-background-800 rounded-lg">
              <p class="text-sm text-secondary-700 dark:text-secondary-300 font-medium">
                <strong>Innovation MORRGANA :</strong> {{ ingredient.innovation }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Brand Achievements -->
    <section class="py-20 md:py-28 bg-background-100 dark:bg-background-800">
      <div class="responsive-container">
        <div class="text-center mb-16">
          <h2 class="font-display text-5xl md:text-6xl font-bold text-primary-700 dark:text-primary-300 mb-8 animate-fade-in-up">
            Nos <span class="text-gradient-natural">Premières</span> Réussites
          </h2>
          <p class="body-large text-background-600 dark:text-background-400 max-w-3xl mx-auto animate-fade-in-up animation-delay-100">
            En seulement quelques mois, MORRGANA a déjà conquis le cœur de nombreuses clientes
          </p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div v-for="(achievement, index) in achievements" :key="index" 
               class="card-natural p-8 text-center group hover:shadow-warm transition-all duration-300 animate-fade-in-up"
               :class="`animation-delay-${(index + 1) * 100}`">
            <div class="text-4xl md:text-5xl font-bold text-secondary-600 dark:text-secondary-400 mb-3 group-hover:scale-110 transition-transform duration-300">
              {{ achievement.number }}
            </div>
            <div class="text-background-600 dark:text-background-400 font-medium">{{ achievement.label }}</div>
          </div>
        </div>

        <!-- Certification and quality badges -->
        <div class="flex flex-wrap justify-center items-center gap-8 animate-fade-in-up animation-delay-500">
          <div v-for="cert in qualityBadges" :key="cert.name" 
               class="flex items-center space-x-3 px-6 py-4 bg-white dark:bg-background-700 rounded-full shadow-soft hover:shadow-natural transition-all duration-300">
            <span class="text-2xl">{{ cert.icon }}</span>
            <div class="text-left">
              <div class="font-semibold text-primary-700 dark:text-primary-300 text-sm">{{ cert.name }}</div>
              <div class="text-xs text-background-600 dark:text-background-400">{{ cert.detail }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Future Vision Call to Action -->
    <section class="py-20 md:py-28 bg-gradient-to-r from-secondary-100 via-cream-100 to-eucalyptus-100 dark:from-secondary-900/20 dark:via-cream-900/20 dark:to-eucalyptus-900/20">
      <div class="responsive-container text-center">
        <div class="max-w-4xl mx-auto space-y-8">
          <div class="inline-flex items-center space-x-3 mb-6 animate-fade-in-up">
            <span class="text-3xl">🚀</span>
            <span class="text-lg font-accent italic text-secondary-600 dark:text-secondary-400">L'aventure ne fait que commencer</span>
            <span class="text-3xl">🚀</span>
          </div>
          
          <h2 class="font-display text-5xl md:text-6xl font-bold text-primary-700 dark:text-primary-300 leading-tight animate-fade-in-up animation-delay-100">
            Rejoignez l'Aventure <span class="text-gradient-natural">MORRGANA</span>
          </h2>
          
          <p class="body-large text-background-600 dark:text-background-400 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            Soyez parmi les premières à découvrir nos rituels de beauté marocains révolutionnaires. 
            Ensemble, créons une nouvelle ère de la beauté naturelle.
          </p>
          
          <div class="space-y-6 sm:space-y-0 sm:space-x-6 sm:flex sm:justify-center animate-fade-in-up animation-delay-300">
            <button @click="navigateToProducts" class="btn-primary btn-lg group">
              <span class="mr-3">✨</span>
              <span>Découvrir MORRGANA</span>
              <svg class="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </button>
            <button @click="navigateToContact" class="btn-secondary btn-lg">
              <span class="mr-3">💬</span>
              <span>Nous Contacter</span>
            </button>
          </div>

          <!-- Brand philosophy -->
          <div class="mt-12 p-6 bg-white/60 dark:bg-background-800/60 rounded-soft backdrop-blur-sm animate-fade-in-up animation-delay-400">
            <p class="text-lg font-accent italic text-secondary-600 dark:text-secondary-400 mb-2">
              "Créer la beauté de demain avec la sagesse d'hier"
            </p>
            <p class="text-sm text-background-600 dark:text-background-400">
              Philosophie MORRGANA - Marque déposée 2024
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// SEO Meta for MORRGANA
useSeoMeta({
  title: 'À Propos | MORRGANA - Gommages Corporels Marocains Premium',
  ogTitle: 'À Propos | MORRGANA - Gommages Corporels Marocains Premium',
  description: 'Découvrez MORRGANA, la nouvelle marque marocaine de gommages corporels naturels premium. Innovation moderne et traditions berbères pour révéler votre beauté naturelle.',
  ogDescription: 'Découvrez MORRGANA, la nouvelle marque marocaine de gommages corporels naturels premium. Innovation moderne et traditions berbères pour révéler votre beauté naturelle.',
  ogImage: '/images/morrgana-about.jpg',
  twitterCard: 'summary_large_image',
})

// MORRGANA brand values
const brandValues = ref([
  {
    icon: '🎯',
    title: 'Innovation',
    description: 'Techniques modernes appliquées aux traditions marocaines ancestrales'
  },
  {
    icon: '🌿',
    title: 'Naturel Premium',
    description: 'Ingrédients 100% naturels sourcés du Maroc et certifiés bio'
  },
  {
    icon: '🤝',
    title: 'Éthique',
    description: 'Commerce équitable et soutien des communautés locales marocaines'
  },
  {
    icon: '✨',
    title: 'Excellence',
    description: 'Standards internationaux pour une expérience spa de luxe'
  }
])

// MORRGANA brand story (new company)
const brandStory = ref([
  {
    year: '2024',
    title: 'L\'Inspiration',
    icon: '💡',
    description: 'Trois amis passionnés de beauté naturelle découvrent les secrets des hammams traditionnels marocains et décident de créer une marque moderne.',
    highlight: 'Première visite dans les coopératives de l\'Atlas et naissance de l\'idée MORRGANA'
  },
  {
    year: 'Mai',
    title: 'La Recherche',
    icon: '🔬',
    description: 'Développement des premières formules en collaboration avec des artisans berbères et des laboratoires de cosmétiques naturelles de Casablanca.',
    highlight: 'Six mois de R&D pour perfectionner nos recettes signature'
  },
  {
    year: 'Sept',
    title: 'Le Lancement',
    icon: '🚀',
    description: 'Lancement officiel de MORRGANA avec notre première collection de gommages corporels, immédiatement adoptée par les amatrices de beauté naturelle.',
    highlight: 'Plus de 1000 commandes dans le premier mois'
  },
  {
    year: 'Nov',
    title: 'L\'Expansion',
    icon: '🌍',
    description: 'Extension internationale et partenariats avec des spas de luxe. MORRGANA devient la nouvelle référence du gommage marocain premium.',
    highlight: 'Livraisons dans 25 pays et collaborations avec des influenceuses beauté'
  }
])

// Founding team
const founders = ref([
  {
    name: 'Yasmine El Alami',
    role: 'Co-fondatrice & Directrice Créative',
    avatar: '👩‍💼',
    bio: 'Diplômée en cosmétologie et passionnée par les traditions berbères, Yasmine dirige la création de nos formules innovantes.',
    quote: 'MORRGANA, c\'est l\'âme du Maroc dans chaque grain de gommage.'
  },
  {
    name: 'Omar Benjelloun',
    role: 'Co-fondateur & Directeur Commercial',
    avatar: '👨‍💼',
    bio: 'Expert en marketing digital et commerce international, Omar propulse MORRGANA sur la scène mondiale.',
    quote: 'Notre mission : faire rayonner l\'excellence marocaine partout dans le monde.'
  },
  {
    name: 'Fatima Zahra Idrissi',
    role: 'Co-fondatrice & Directrice Qualité',
    avatar: '👩‍🔬',
    bio: 'Ingénieure chimiste spécialisée en cosmétiques bio, elle garantit la qualité premium de chaque produit MORRGANA.',
    quote: 'Chaque formule MORRGANA respecte nos standards d\'excellence et notre éthique naturelle.'
  }
])

// Signature ingredients with modern twist
const signatureIngredients = ref([
  {
    name: 'Argile Rose Atlas',
    source: 'Montagnes de l\'Atlas Central',
    icon: '🌸',
    description: 'Argile rare aux propriétés purifiantes exceptionnelles, récoltée à la main dans les sommets de l\'Atlas.',
    innovation: 'Micronisation brevetée pour une texture veloutée unique'
  },
  {
    name: 'Huile d\'Argan Premium',
    source: 'Coopératives féminines d\'Essaouira',
    icon: '🥜',
    description: 'Huile d\'argan bio première pression, riche en vitamine E et acides gras essentiels.',
    innovation: 'Extraction à froid contrôlée pour préserver 100% des bienfaits'
  },
  {
    name: 'Cristaux de Sel Rose',
    source: 'Salines de Oualidia',
    icon: '💎',
    description: 'Sel marin rose naturel aux propriétés exfoliantes douces et reminéralisantes.',
    innovation: 'Calibrage précis pour une exfoliation optimale sans agression'
  }
])

// Achievements for a new brand
const achievements = ref([
  { number: '3k+', label: 'Clientes conquises' },
  { number: '25', label: 'Pays livrés' },
  { number: '4.8/5', label: 'Note moyenne' },
  { number: '95%', label: 'Taux de satisfaction' }
])

// Quality badges
const qualityBadges = ref([
  { name: 'Bio Certifié', detail: 'Ecocert Maroc', icon: '🌿' },
  { name: 'Cruelty Free', detail: 'Leaping Bunny', icon: '🐰' },
  { name: 'Commerce Équitable', detail: 'Fair Trade', icon: '🤝' },
  { name: 'Made in Morocco', detail: 'Label Origine', icon: '🇲🇦' }
])

// Methods
const navigateToProducts = () => {
  router.push('/products')
}

const navigateToContact = () => {
  router.push('/contact')
}
</script>

<style scoped>
/* Enhanced hero gradient with MORRGANA brand colors */
.hero-gradient {
  background: linear-gradient(135deg, 
    rgba(213, 115, 65, 0.08) 0%,
    rgba(240, 244, 232, 0.9) 25%, 
    rgba(217, 231, 196, 0.7) 50%, 
    rgba(253, 248, 243, 0.9) 75%,
    rgba(234, 195, 116, 0.08) 100%
  );
}

/* MORRGANA timeline styling */
.morrgana-timeline-item {
  position: relative;
  padding: 2rem 0;
}

.morrgana-timeline-item:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 60px;
  top: 150px;
  bottom: -2rem;
  width: 3px;
  background: linear-gradient(to bottom, 
    rgba(213, 115, 65, 0.9) 0%,
    rgba(125, 139, 94, 0.9) 50%,
    rgba(61, 155, 122, 0.9) 100%
  );
  border-radius: 2px;
  box-shadow: 0 0 8px rgba(213, 115, 65, 0.3);
}

/* Enhanced spacing for premium feel */
.section-padding {
  @apply py-20 md:py-28 lg:py-32;
}

/* Animation delays for staggered entrance */
.animation-delay-0 { animation-delay: 0ms; }
.animation-delay-100 { animation-delay: 100ms; }
.animation-delay-150 { animation-delay: 150ms; }
.animation-delay-200 { animation-delay: 200ms; }
.animation-delay-300 { animation-delay: 300ms; }
.animation-delay-400 { animation-delay: 400ms; }
.animation-delay-500 { animation-delay: 500ms; }

/* MORRGANA brand animations */
@keyframes gentle-bounce {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(3deg); }
}

.animate-gentle-bounce {
  animation: gentle-bounce 5s ease-in-out infinite;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

/* Enhanced card styling for premium brand */
.card-natural {
  @apply bg-white/80 dark:bg-background-800/80 backdrop-blur-sm border border-background-200/50 dark:border-background-700/50;
}

.card-natural:hover {
  box-shadow: 
    0 20px 40px rgba(213, 115, 65, 0.12), 
    0 8px 16px rgba(125, 139, 94, 0.08),
    0 4px 8px rgba(61, 155, 122, 0.06);
  transform: translateY(-4px);
}

/* MORRGANA gradient text */
.text-gradient-natural {
  background: linear-gradient(135deg, #d67341 0%, #7d8b5e 50%, #3d9b7a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Enhanced typography for luxury feel */
.font-display {
  line-height: 1.05;
  letter-spacing: -0.025em;
  font-weight: 700;
}

.body-large {
  line-height: 1.8;
  letter-spacing: 0.015em;
}

/* Premium button styling */
.btn-primary, .btn-secondary {
  @apply transform transition-all duration-300 hover:scale-105 focus:scale-105 active:scale-95;
  box-shadow: 0 4px 14px rgba(213, 115, 65, 0.25);
}

.btn-primary:hover {
  box-shadow: 0 8px 25px rgba(213, 115, 65, 0.35);
}

.btn-lg {
  @apply px-10 py-5 text-lg font-semibold;
}

/* Improved responsive spacing */
@media (min-width: 768px) {
  .section-padding {
    @apply py-24;
  }
  
  .responsive-container {
    @apply px-8;
  }
}

@media (min-width: 1024px) {
  .section-padding {
    @apply py-32;
  }
  
  .responsive-container {
    @apply px-12;
  }
}

@media (min-width: 1280px) {
  .section-padding {
    @apply py-40;
  }
}

/* Enhanced container with better spacing */
.responsive-container {
  @apply max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16;
}

/* Premium grid spacing */
.grid {
  gap: 2.5rem;
}

@media (min-width: 768px) {
  .grid {
    gap: 3.5rem;
  }
}

@media (min-width: 1024px) {
  .grid {
    gap: 4.5rem;
  }
}

/* Enhanced selection styling */
::selection {
  @apply bg-secondary-200/50 dark:bg-secondary-700/50;
}

/* Smooth transitions for all elements */
* {
  transition-property: color, background-color, border-color, transform, box-shadow, opacity, filter;
  transition-duration: 250ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Custom scrollbar with MORRGANA branding */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: rgba(240, 244, 232, 0.5);
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #d67341, #7d8b5e);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #c85a2f, #657049);
}

/* Enhanced focus states for accessibility */
button:focus,
a:focus {
  outline: 3px solid rgba(213, 115, 65, 0.5);
  outline-offset: 2px;
  border-radius: 4px;
}

/* Typography enhancements */
h1, h2, h3, h4, h5, h6 {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

p {
  text-rendering: optimizeSpeed;
  -webkit-font-smoothing: subpixel-antialiased;
}

/* Enhanced spacing utilities */
.space-y-8 > * + * {
  margin-top: 2rem;
}

.space-y-10 > * + * {
  margin-top: 2.5rem;
}

.space-y-16 > * + * {
  margin-top: 4rem;
}

.space-y-20 > * + * {
  margin-top: 5rem;
}

/* MORRGANA brand pattern overlay */
.morrgana-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d67341' fill-opacity='0.02'%3E%3Cpath d='M40 40c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z'/%3E%3Cpath d='M60 60c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z'/%3E%3C/g%3E%3C/svg%3E");
}

/* Backdrop blur effects for modern feel */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

/* Enhanced card grid spacing */
.card-grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

@media (min-width: 768px) {
  .card-grid {
    gap: 3rem;
  }
}

/* Improved text hierarchy */
.text-hierarchy h2 {
  @apply mb-6;
}

.text-hierarchy p {
  @apply mb-4 last:mb-0;
}

/* Enhanced interaction states */
.interactive-element {
  @apply transition-all duration-300 ease-out;
}

.interactive-element:hover {
  @apply transform -translate-y-1;
}

.interactive-element:active {
  @apply transform translate-y-0;
}
</style>