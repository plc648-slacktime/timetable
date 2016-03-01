<script type="text/babel">
    export default {
        data() {
            return {
                ram: 0,
                disk: 0
            }
        },
        methods: {
            logout() {

            },
            alert() {
                alert('kuku');
            }
        }
    }
</script>

<template>
    <header>
        Balance: {{balance}}
        <input type="button" value="RAM: {{ram}} MB, Disk: {{disk}} GB" class="float-right">
        <input type="button" value="Logout" @click="logout" class="float-right">
    </header>
</template>

<style scoped>
    header {
        height: 40px;
    }
</style>