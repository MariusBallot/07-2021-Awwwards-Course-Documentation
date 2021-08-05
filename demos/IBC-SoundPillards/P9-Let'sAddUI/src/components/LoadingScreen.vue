<template>
    <div class="loadingScreen" ref="loadingScreen">
        <div class="wrapper">
            <h2>Loading</h2>
            <div class="progressBar">
                <div
                    class="progressFill"
                    :style="{ width: progress + '%' }"
                ></div>
            </div>

            <div class="progressUrl">{{ progressURL }}</div>
        </div>
    </div>
</template>

<script>
import LoadingController from "../classes/LoadingController";
export default {
    name: "LoadingScreen",
    data() {
        return {
            progress: 0,
            progressURL: "",
        };
    },
    mounted() {
        LoadingController.onProgress = this.onProgress;
        LoadingController.onLoad = this.onLoad;
    },
    methods: {
        onProgress(url, loaded, total) {
            this.progressURL = url;
            this.progress = (loaded / total) * 100;
        },
        onLoad() {
            this.$refs.loadingScreen.classList.add("finished");
        },
    },
};
</script>

<style scoped lang="stylus">
.loadingScreen {
    width: 100vw;
    height: 100vh;
    background: #151515;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    color: white;
    transition: all 0.5s;
    display: flex;
    justify-content: center;
    align-items: center;

    .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;

        h2 {
            margin-bottom: 20px;
        }

        .progressBar {
            width: 300px;
            height: 30px;
            background: black;

            .progressFill {
                width: 50%;
                height: 100%;
                background: purple;
                transition: width 0.2s;
            }
        }

        .progressUrl {
            color: gray;
            margin-top: 30px;
            font-size: 0.8em;
        }
    }

    &.finished {
        opacity: 0;
        pointer-events: none;
    }
}
</style>
