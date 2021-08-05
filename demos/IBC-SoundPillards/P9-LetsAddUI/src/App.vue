<template>
    <LoadingScreen />
    <ThreeScene />
    <TitleScreen />
</template>

<script>
import ThreeScene from "./components/ThreeScene.vue";
import TitleScreen from "./components/TitleScreen.vue";
import LoadingScreen from "./components/LoadingScreen.vue";

export default {
    name: "App",
    components: {
        ThreeScene,
        TitleScreen,
        LoadingScreen,
    },
};
</script>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

body {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
}
</style>
