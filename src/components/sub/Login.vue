<template>
    <div class="content">
        <headnav title="登录"></headnav>
        <van-form @submit="loginHandle">
            <van-cell-group>
                <van-field
                    v-model="cellphone"
                    label="手机号"
                    placeholder="手机号"
                    :rules="[{ required: true, message: '请填写手机号' }]"
                />
                <van-field
                    v-model="password"
                    label="密 码"
                    type="password"
                    :rules="[{ required: true, message: '请填写密码' }]"
                />
            </van-cell-group>
            <div style="margin: 16px">
                <van-button round block type="primary" native-type="submit">
                    登录
                </van-button>
            </div>
        </van-form>
        <div class="register-btn">
            <van-button round block type="info" @click="handleToRegister">
                去注册
            </van-button>
        </div>
    </div>
</template>

<script>
import headnav from "@/components/HeadNav.vue";
import axios from "axios";
export default {
    name: "login",
    components: { headnav },
    data() {
        return {
            cellphone: "",
            password: "",
        };
    },
    methods: {
        loginHandle() {
            axios
                .get(
                    "/login/cellphone?phone=" +
                        this.cellphone +
                        "&password=" +
                        this.password
                )
                .then((res) => {
                    console.log(res);
                    if (res.data.code === 200) {
                        this.$toast.success("登陆成功");
                        this.$router.push({ name: "home" });
                    } else {
                        this.$toast.fail(res.data.message);
                    }
                });
        },
        handleToRegister() {
            this.$router.push({
                name: "register",
            });
        },
    },
};
</script>

<style>
.register-btn {
    padding: 0 30px;
}
</style>