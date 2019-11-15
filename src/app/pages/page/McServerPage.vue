<template>
    <div class="mc-serve">
        McServer
    </div>
</template>
<script>
    export default {
        name: 'McServer',
        data() {
            return {

            }
        },
        components: {

        },
        methods: {},
        created() {
            this.$router.push({
                name: "McLogin"
            });
        },
    }
</script>

<style>
</style>