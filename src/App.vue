<template>
  <HelloWorld />
</template>

<script setup>
import HelloWorld from "./view/HelloWorld.vue";
import { arbitrum } from "@/config/chainBlock/arbitrum.js";
import { useModalStore } from "@/store/modules/modal.js";
import { useAxiosStore } from "@/store/modules/axios.js";
import { ethers } from "ethers";
import { useRouteStore } from "@/store/modules/route.js";
import { useRouter } from "vue-router";
import { computed, watch } from "vue";

// 初始化modal
let modalStore = useModalStore();
modalStore.initModal();
// 初始化axios
const axiosStore = useAxiosStore();
let provider = new ethers.providers.JsonRpcProvider(arbitrum.chainInfo.rpcUrl);
axiosStore.initAxios(provider, null, "");
axiosStore.setChainId(arbitrum.chainInfo.chainId);
axiosStore.setIsConnect(2);
// 全局路由管理
const routeStore = useRouteStore();
const router = useRouter();
// 监听路由状态
let routeResult = computed(() => router.currentRoute.value);
watch(routeResult, (newVal, oldVal) => {
  console.log("新路由", newVal);
  routeStore.setCurrentRoute(oldVal, newVal);
});
watch(
  computed(() => routeStore.changeRoute),
  (newVal, oldVal) => {
    console.log("切换路由", newVal, oldVal);
    router.push(newVal);
  },
);
</script>

<style scoped></style>
