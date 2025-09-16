<script setup lang="ts"></script>

<template>
  <main class="flex flex-col m-6 gap-6">
    <nav class="flex items-center gap-6">
      <h1 class="text-indigo-500/50 text-xl">Учетные записи</h1>
      <button class="size-10 border-1 rounded-md border-indigo-500/50">
        <div class="text-indigo-500/50 text-xs text-center h-fit">✚</div>
      </button>
    </nav>
    <div class="flex flex-row gap-4 items-center p-2 bg-indigo-300 rounded-md">
      <img src="/public/vopros.png" alt="Подсказка" class="size-8 invert" />
      <p class="m-[0] text-center h-full text-white">
        Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
      </p>
    </div>

    <!-- основной блок -->
    <div class="flex flex-col gap-4">
      <!-- предупреждение -->
      <div class="grid grid-cols-16 w-full text-indigo-500/50 font-bold gap-4">
        <div class="col-span-4">Метки</div>
        <div class="col-span-3">Тип записи</div>
        <div class="col-span-4">Логин</div>
        <div class="col-span-5">Пароль</div>
      </div>

      <div class="flex flex-col gap-4">
        <!-- форма -->
        <div class="grid grid-cols-16 w-full gap-4 text-indigo-500/50">
          <!-- метка -->
          <input type="text" class="col-span-4 p-1.5 border-1 rounded-md border-indigo-500/50" />
          <!-- тип записи -->
          <select
            name="typeOfRecord"
            class="col-span-3 p-1.5 border-1 rounded-md bg-white border-indigo-500/50"
          >
            <option value="local" class="bg-white">Локальная</option>
            <option value="ldap" class="bg-white">LDAP</option>
          </select>
          <!-- логин -->
          <input type="text" class="col-span-4 p-1.5 border-1 rounded-md border-indigo-500/50" />
          <!-- пароль -->
          <input
            type="password"
            class="col-span-4 p-1.5 border-1 rounded-md border-indigo-500/50"
          />
          <button class="w-[38px]">🗑️</button>
        </div>
        <!-- форма -->
        <div class="grid grid-cols-16 w-full gap-4 text-indigo-500/50">
          <!-- метка -->
          <input type="text" class="col-span-4 p-1.5 border-1 rounded-md border-indigo-500/50" />
          <!-- тип записи -->
          <select
            name="typeOfRecord"
            class="col-span-3 p-1.5 border-1 rounded-md bg-white border-indigo-500/50"
          >
            <option value="local" class="bg-white">Локальная</option>
            <option value="ldap" class="bg-white">LDAP</option>
          </select>
          <!-- если без пароля -->
          <input type="text" class="col-span-8 border-1 rounded-md p-1.5 border-indigo-500/50" />

          <button class="w-[38px]">🗑️</button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
