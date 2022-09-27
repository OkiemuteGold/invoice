<template>
    <header class="flex flex-row flex-md-column">
        <div class="logo flex">
            <img
                src="@/assets/file-invoice-dollar-solid.png"
                alt="invoice app logo"
            />
        </div>
    </header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
header {
    background-color: var(--black2);
    z-index: 99;

    @media (min-width: 900px) {
        min-width: 90px;
        min-height: 100%;
        border-radius: 0 20px 20px 0;
    }

    .logo {
        justify-content: center;
        background-color: var(--purple);
        padding: 24px;
        border-radius: 0 20px 20px 0;

        @media (min-width: 900px) {
            width: 100%;
        }

        img {
            width: auto;
            height: 30px;
        }
    }
}
</style>
