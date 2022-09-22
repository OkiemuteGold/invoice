<template>
    <div>
        <div class="app flex flex-column flex-md-row">
            <MainNavigation />
            <div class="app-content flex flex-column">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
import MainNavigation from "@/components/MainNavigation.vue";

export default {
    components: {
        MainNavigation,
    },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");

:root {
    --fontPoppins: "Poppins", sans-serif;

    --purple: #7c5dfa;
    --darkPurple: #252945;
    --gray: #dfe3fa;
    --green: #33d69f;
    --orange: #ff8f00;
    --red: #ec5757;
    --white: #fff;
    --black: #141625;

    --customParaText: #737373;
    --customText: #2c3e50;

    --radius4: 4px;
    --radius10: 10px;
    --radius30: 30px;
}

* {
    font-family: var(--fontPoppins);
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: var(--customText);
    overflow-x: hidden;
}

.app {
    min-height: 100vh;
    background-color: var(--black);

    .app-content {
        position: relative;
        -ms-flex: 1;
        flex: 1;
        padding: 0 20px;
    }
}

// nav {
//     padding: 30px;

//     a {
//         font-weight: bold;
//         color: var(--customText);

//         &.router-link-exact-active {
//             color: #42b983;
//         }
//     }
// }

.nav-link {
    text-decoration: none;
    color: initial;
}

img {
    max-width: 100%;
    height: auto;
}

button,
.button {
    font-size: 12px;
    color: var(--white);
    margin-right: 8px;
    padding: 16px 24px;
    border-radius: var(--radius30);
    border: none;
    cursor: pointer;
}

.dark-purple {
    background-color: var(--darkPurple);
}

.red {
    background-color: var(--red);
}

.purple {
    background-color: var(--purple);
}

.green {
    background-color: var(--green);
}

.orange {
    background-color: var(--orange);
}

// utility classes

.flex {
    display: flex;
}

.flex-row {
    -ms-flex-direction: row;
    flex-direction: row;
}

.flex-column {
    -ms-flex-direction: column;
    flex-direction: column;
}

.container {
    width: 100%;
    padding: 40px 10px;
    max-width: 850px;
    margin: 0 auto;

    @media (min-width: 900px) {
        padding-top: 72px;
    }
}

// Status Button Styling

.status-button {
    font-size: 12px;
    align-items: center;
    margin-right: 30px;
    padding: 8px 30px;
    border-radius: var(--radius10);

    &::before {
        content: "";
        width: 10px;
        height: 10px;
        margin-right: 8px;
        border-radius: 50%;
    }
}

.paid {
    background-color: rgba(51, 214, 160, 0.1);
    color: var(--green);

    &::before {
        background-color: var(--green);
    }
}

.pending {
    background-color: rgba(255, 145, 0, 0.1);
    color: var(--orange);

    &::before {
        background-color: var(--orange);
    }
}

.draft {
    background-color: rgba(223, 227, 250, 0.1);
    color: var(--gray);

    &::before {
        background-color: var(--gray);
    }
}

@media (min-width: 900px) {
    .flex-md-row {
        -ms-flex-direction: row;
        flex-direction: row;
    }

    .flex-md-column {
        -ms-flex-direction: column;
        flex-direction: column;
    }
}
</style>
