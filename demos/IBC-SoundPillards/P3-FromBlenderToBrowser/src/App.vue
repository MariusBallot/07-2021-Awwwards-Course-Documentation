<template>
    <ThreeScene />
</template>

<script>
import ThreeScene from "./components/ThreeScene.vue";

export default {
    name: "App",
    components: {
        ThreeScene,
    },
};
</script>

<style lang="stylus">
body {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
</style>
