<script></script>

<template>
  <header class="py-4">
    <div class="flex justify-between items-center">
      <div>
        <NuxtLink to="/">Padel Tournaments</NuxtLink>
      </div>
      <nav>
        <ul class="flex items-center gap-4">
          <li>
            <SignupForm />
          </li>
          <li>
            <LoginForm />
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
