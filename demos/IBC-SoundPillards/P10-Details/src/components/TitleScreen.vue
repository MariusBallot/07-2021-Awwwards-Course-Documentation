<template>
    <div class="titleScreen">
        <h1>SoundPillards</h1>
        <p>A simple creative coding example</p>
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
.titleScreen {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    color: white;
    padding: 100px;
    pointer-events: none;

    button {
        color: white;
        background: transparent;
        border-radius: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        width: 100px;
        height: 50px;
        position: absolute;
        bottom: 100px;
        right: 100px;
        border: solid purple;
        transition: all 0.3s;

        &:hover {
            background: purple;
        }
    }
}
</style>
