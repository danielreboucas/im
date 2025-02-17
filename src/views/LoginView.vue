<template>
  <main class="flex h-screen flex-1">
    <div class="flex w-1/2 flex-col items-center justify-center gap-3">
      <p class="pb-6 text-4xl font-bold text-[#3C849B]">Login</p>
      <div class="flex w-72 flex-col gap-3">
        <InputText type="text" placeholder="Email" v-model="email" />
        <InputText type="password" placeholder="Senha" v-model="password" />
        <span class="flex gap-1 text-xs">
          Não possui uma conta?
          <p @click="goToRegister" class="cursor-pointer hover:underline">Registre-se!</p>
        </span>
      </div>
      <Button
        class="w-72 !border-[#3C849B] !bg-[#3C849B] !transition-all !duration-200 hover:!opacity-80"
        @click="requestLogin"
        >Entrar</Button
      >
    </div>
    <img class="w-1/2" src="@/assets/login-image.jpg" />
  </main>
</template>

<script lang="ts">
import { login } from '@/services/auth/authService'

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async requestLogin() {
      const response = await login(this.email, this.password)
      console.log(response)

      if (response?.status === 200) {
        this.$router.push('/dashboard')
      } else {
        console.log('adpoksadopk')

        this.$toast.add({
          severity: 'info',
          summary: 'Info',
          detail: 'Message Content',
          life: 3000,
        })
      }
    },
    goToRegister() {
      this.$router.push('/register')
    },
  },
}
</script>
