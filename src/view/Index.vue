<template>
    <div class="container">
        <div class="header-content">
            <img class="header-main" src="../assets/header_03.png" width="100%" alt="">
            <img class="header-main" src="../assets/header_06.png" width="100%" alt="">
            <img class="header-main" src="../assets/header_08.png" width="100%" alt="">
        </div>
    </div>
</template>
<script>
export default {
    name: 'Index'
}
</script>
<style lang="scss" scoped>
    @import '../scss/app';
    .container{
        .header-content{
            width: calc(100% - #{r(20px)});
            margin: r(10px) r(10px) 0 r(10px);
            .header-main{
                display: block;
                margin-bottom: r(7px);
            }
        }
    }
</style>
