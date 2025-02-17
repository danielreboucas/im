<template>
  <main class="flex h-screen flex-1">
    <img class="w-1/2" src="@/assets/signup-image.jpg" />
    <div class="flex w-1/2 flex-col items-center justify-center gap-3">
      <div class="flex w-full flex-col items-center">
        <p class="pb-6 text-4xl font-bold text-[#445267]">Criação de usuário</p>
        <div class="flex w-full flex-col items-center gap-3">
          <div class="flex gap-2">
            <InputText type="text" placeholder="Nome" class="" />
            <InputText type="text" placeholder="Sobrenome" class="" />
          </div>
          <div class="flex gap-2">
            <InputText type="text" placeholder="Email" class="" />
            <InputText type="text" placeholder="Data de Nascimento" class="" />
          </div>
          <div class="flex gap-2">
            <InputText type="password" placeholder="Senha" />
            <InputText type="password" placeholder="Confirmação da senha" />
          </div>
          <span class="flex gap-1 text-xs">
            Já possui uma conta?
            <p @click="goToLogin" class="cursor-pointer hover:underline">Entrar!</p>
          </span>
        </div>
        <div class="flex w-72 flex-col pt-2">
          <Button
            class="w-full !border-[#445267] !bg-[#445267] !transition-all !duration-200 hover:!opacity-80"
            @click="register"
            >Cadastrar</Button
          >
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
export default {
  methods: {
    register() {
      console.log('register')
    },
    goToLogin() {
      this.$router.push('/login')
    },
  },
}
</script>
