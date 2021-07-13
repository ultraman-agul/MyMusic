<template>
    <div class="content">
        <headnav title='注册'></headnav>
        <van-form @submit="registerHandle">
            <van-cell-group>
                <van-field v-model="nickName" label="昵称" placeholder="昵称"
                    :rules="[{ required: true, message: '请填写昵称' }]" />
                <van-field v-model="cellphone" label="手机号" placeholder="手机号"
                    :rules="[{ required: true, message: '请填写手机号' }]" />
                <van-field v-model="password" label="密 码" placeholder="密码" type="password"
                    :rules="[{ required: true, message: '请填写密码' }]" />
                <van-field v-model="password2" label="确认密码" placeholder="密码" type="password"
                    :rules="[{ required: true, message: '请确认密码' }]" />
                <van-field v-model="checkCode" label="验证码" placeholder="验证码"
                    :rules="[{ required: true, message: '请填写验证码' }]" />
                <van-button round type="info" @click='getCheckCode'>
                    获取验证码
                </van-button>
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                    注册
                </van-button>
            </div>
        </van-form>
        <div style="margin: 16px;">
            <van-button round block type="info" @click='goLogin'>
                去登录
            </van-button>
        </div>
    </div>
</template>

<script>
    import headnav from '@/components/HeadNav.vue'
    import axios from 'axios'
    export default {
        name: 'register',
        components: { headnav },
        data() {
            return {
                nickName: '',
                cellphone: '',
                password: '',
                password2: '',
                checkCode: ''
            }
        },
        methods: {
            goLogin() {
                this.$router.push('/login')
            },
            registerHandle() {
                this.handleToCheckCode()
                // if (this.handleToCheckCode) {

                // }
            },
            checkPhoneExist() {
                axios.get('/cellphone/existence/check?phone=' + this.cellphone).then(res => {
                    console.log(res)
                    if (res.data.code === 200) {
                        if (res.data.exist === 1) {
                            this.$toast.fail('用户已注册,请返回登陆')
                            return 1
                        }
                    }
                })
            },
            //这个接口有问题,暂时罢工,未完成注册
            getCheckCode() {
                if (this.checkPhoneExist() !== 1) {
                    if (this.cellphone.trim().length != 0) {
                        axios.get('/captcha/sent?phone=' + this.cellphone).then(res => {
                            console.log(res)
                        })
                    }
                }
            },
            handleToCheckCode() {
                axios.get('/captcha/verify?phone=' + this.cellphone + '&captcha=' + this.checkCode).then(res => {
                    console.log(res)
                    return
                })
            }
        }
    }
</script>

<style></style>