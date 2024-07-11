<template>
  <h1>Hello World!</h1>
  <button @click="connect_wallet">链接钱包</button>
  <button @click="login">鉴权</button>
</template>

<script setup>
import { useAxiosStore } from "@/store/modules/axios.js";
import { useModalStore } from "@/store/modules/modal.js";
import { ethers } from "ethers";
import { getVerifyToken } from "@/api/login.js";

const axiosStore = useAxiosStore();
const modelStore = useModalStore();

function connect_wallet() {
  modelStore.modal.open();
}

async function login() {
  console.log(axiosStore.currentProvider);
  let signer = await axiosStore.currentProvider.getSigner();
  let message = ethers.utils.toUtf8Bytes("hello jasper");
  let signature = await signer.signMessage(message);
  let account = await signer.getAddress();
  let token = await getVerifyToken(account, signature);
  console.log("Token", token);
  localStorage.setItem("Auth", token.access_token);
}
</script>

<style scoped lang="less"></style>
