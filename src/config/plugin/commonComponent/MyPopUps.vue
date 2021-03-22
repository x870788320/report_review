<template>
    <div>
        <div ref = "msg" 
            :class = "{
                msgBaseStyle: true,
                activeMsg: msgState
            }" >
            <div class = "msg_warpper">
                {{text}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"MyPopUps",
    props:{
        msg: String
    },
    data(){
        return {
            text:"",
            msgState: false
        }
    },
    methods:{
        msgPlugin(msg, time = 2000) {
            this.text = msg;
            this.msgState = true;
            setTimeout(() => {
                this.msgState = false;
            }, time)
        }
    },
    mounted(){
        // console.log(this.$refs.msg)
    }
}
</script>

<style scoped>
.msgBaseStyle{
    width: 300px;
    position :absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 0;
    min-height: 0;
    text-align: center;
    background: rgba(0, 0, 0, .6);
    border-radius: 10px;
    color:#fff;
    font-size:20px;
    line-height: 60px;
    transition: all 0.5s;
    z-index: -1;
    opacity: 0;
}
.msgBaseStyle.activeMsg{
    min-height: 60px;
    opacity: 1;
    z-index: 11;
}
</style>