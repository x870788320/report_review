<template>
    <div :class = '{
            myModalBox: true,
            activeMsg: msgState
        }'
        @click.stop="msgPlugin(false)">
            <div @click.stop="_ => false">
                <slot/>
            </div>
    </div>
</template>

<script>
export default {
    name:"MyModalBox",
    props:{},
    data(){
        return {
            text:"",
            msgState: false
        }
    },
    methods:{
        msgPlugin(isShow) {
            this.msgState = isShow;
        }
    },
    mounted(){
        // console.log(this.$refs.msg)
    }
}
</script>

<style scoped>
.myModalBox{
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgba(0, 0, 0, .3);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s;
    z-index: -1;
    opacity: 0;
}
.activeMsg{
    opacity: 1;
    z-index: 10;
}
</style>