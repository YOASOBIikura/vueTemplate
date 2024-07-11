import { useAxiosStore } from "@/store/modules/axios.js";

function getVerifyToken(account, signedMsg) {
  return useAxiosStore().axios({
    mode: "http",
    target: "/user/walletLogin/",
    loop: 5,
    method: "post",
    data: {
      address: String(account),
      sign: String(signedMsg),
    },
  });
}

export { getVerifyToken };
