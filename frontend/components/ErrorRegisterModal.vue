<script setup lang="ts"></script>

<template>
  <UModal>
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            Inscription
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
          />
        </div>
      </template>
      <div class="text-center">
        <p>Vous devez être connecté pour vous inscrire à un tournoi</p>
      </div>
    </UCard>
  </UModal>
</template>
