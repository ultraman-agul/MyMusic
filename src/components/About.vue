<template>
    <div>
        <h3>about</h3>
        <button @click="getHot">关于</button>
    </div>

</template>

<script>
    import axios from '@/plugins/axios.js'
    export default {
        name: 'About',
        methods: {
            getHot() {
                axios({
                    url: '/playlist/hot',
                    method: 'post'
                })
                    .then(res => {
                        console.log(res.data.tags)
                    })
                    .catch(err => {
                        console.log(err)
                    })
                alert(111)
            }
        }
    }
</script>