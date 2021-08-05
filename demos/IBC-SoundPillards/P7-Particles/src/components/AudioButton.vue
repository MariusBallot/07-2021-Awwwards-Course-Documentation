<template>
    <div class="audioButton">
        <button v-if="!playFlag" @click="onPlay()">Play</button>
        <button v-else @click="onPause()">Pause</button>
    </div>
</template>

<script>
import SoundReactor from "../classes/SoundReactor";

export default {
    name: "AudioButton",
    data() {
        return {
            initFlag: false,
            playFlag: false,
        };
    },
    methods: {
        onPlay() {
            if (!this.initFlag) {
                this.initFlag = true;
                SoundReactor.init();
            }
            SoundReactor.play();
            this.playFlag = true;
        },
        onPause() {
            SoundReactor.pause();
            this.playFlag = false;
        },
    },
};
</script>

<style scoped lang="stylus">
.audioButton {
    position: absolute;
    top: 0;
    left: 0;

    button {
        background: red;
        padding: 20px;
        width: 100px;
        height: 50px;
    }
}
</style>
