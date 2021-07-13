import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        topListIds: [], // 列表歌曲id
        nextId: '',  //下一曲id
        preId: '' //上一曲id
    },
    mutations: {
        INIT_TOPLISTIDS(state, payload) {
            state.topListIds = payload
        },
        //找到当前id，存储下一首id
        NEXT_ID(state, payload) {
            for (let i = 0; i < state.topListIds.length; i++) {
                if (state.topListIds[i].id == payload) {
                    if (i == state.topListIds.length - 1) {
                        // 最后一首，下一首重回到第一首
                        state.nextId = state.topListIds[0].id
                        state.preId = state.topListIds[i - 1].id
                        break
                    } else if (i == 0) {
                        // 第一首，上一首回到最后一首
                        state.preId = state.topListIds[state.topListIds.length - 1].id
                        state.nextId = state.topListIds[i + 1].id
                        break
                    }
                    state.nextId = state.topListIds[i + 1].id
                    state.preId = state.topListIds[i - 1].id

                }
            }
        }
    }
})