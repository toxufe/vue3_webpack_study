<template>
    <div class="name">{{  name }}</div>

</template>
<script setup lang="ts">
import {ref} from 'vue'
let name = ref('hello world')

</script>
<style lang="less" scoped>
.name {
    color: red;
}
</style>
