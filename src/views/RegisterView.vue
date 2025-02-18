<template>
  <main class="flex h-screen flex-1">
    <img class="w-1/2" src="@/assets/signup-image.jpg" />
    <div class="flex w-1/2 flex-col items-center justify-center gap-3">
      <div class="flex w-full flex-col items-center">
        <p class="pb-6 text-4xl font-bold text-[#445267]">Criação de usuário</p>
        <div class="flex flex-col items-center gap-3">
          <InputText class="w-72" type="text" placeholder="Nome" v-model="name" />
          <InputText class="w-72" type="text" placeholder="Sobrenome" v-model="last_name" />
          <InputText class="w-72" type="text" placeholder="Email" v-model="email" />
          <DatePicker
            class="w-72"
            placeholder="Data de Nascimento"
            v-model="birth_date"
            date-format="dd/mm/yy"
          />
          <InputText class="w-72" type="password" placeholder="Senha" v-model="password" />
          <!-- <InputText class="w-72" type="password" placeholder="Confirmação da senha" /> -->
          <span class="flex gap-1 text-xs">
            Já possui uma conta?
            <p @click="goToLogin" class="cursor-pointer hover:underline">Entrar!</p>
          </span>
        </div>
        <div class="flex w-72 flex-col pt-2">
          <Button
            class="w-full !border-[#445267] !bg-[#445267] !transition-all !duration-200 hover:!opacity-80"
            @click="requestRegister"
            >Cadastrar</Button
          >
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { register } from '@/services/auth/authService'
import { format } from 'date-fns'

export default {
  data() {
    return {
      name: '',
      last_name: '',
      email: '',
      birth_date: new Date(),
      password: '',
    }
  },
  computed: {
    birthDateFormatted() {
      return format(this.birth_date, 'yyyy/MM/dd')
    },
  },
  methods: {
    async requestRegister() {
      const response = await register(
        this.name,
        this.last_name,
        this.email,
        format(this.birth_date, 'yyyy/MM/dd'),
        this.password,
      )

      if (response.status === 201) {
        this.$router.push('/login')
        this.$toast.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Usuário cadastrado com sucesso!',
          life: 3000,
        })
      } else if (response.status === 409) {
        this.$toast.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Usuário já existente',
          life: 3000,
        })
      } else {
        this.$toast.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro',
          life: 3000,
        })
      }
    },
    goToLogin() {
      this.$router.push('/login')
    },
  },
}
</script>
