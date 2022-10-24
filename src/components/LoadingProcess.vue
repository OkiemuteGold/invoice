<template>
    <div class="loading">
        <span></span>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.loading {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 101;

    @keyframes spin {
        to {
            transform: rotateZ(360deg);
        }
    }

    span {
        display: block;
        width: 60px;
        height: 60px;
        margin: 0 auto;
        border: 3px solid transparent;
        border-top-color: var(--white);
        border-bottom-color: var(--white);
        border-radius: 50%;
        -o-animation: spin ease 1000ms infinite;
        -moz-animation: spin ease 1000ms infinite;
        -webkit-animation: spin ease 1000ms infinite;
        animation: spin ease 1000ms infinite;
    }
}
</style>
