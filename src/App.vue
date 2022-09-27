<template>
    <div>
        <div class="app flex flex-column flex-md-row" v-if="!mobile">
            <MainNavigation />
            <div class="app-content flex flex-column">
                <router-view />
            </div>
        </div>
        <div class="mobile-message flex flex-column" v-else>
            <h1>Sorry, this app is not suited for Mobile Devices</h1>
            <p>For better experience, please use a computer or tablet</p>

            <label aria-label="Continue on mobile" class="flex">
                <input
                    type="checkbox"
                    name="Continue on mobile"
                    id="continueOnMobile"
                    @change="continueOnMobile"
                />
                Continue on mobile anyways
            </label>
        </div>
    </div>
</template>

<script>
import MainNavigation from "@/components/MainNavigation.vue";

export default {
    data() {
        return {
            mobile: null,
        };
    },

    components: {
        MainNavigation,
    },

    created() {
        this.checkMobileScreen();
        window.addEventListener("resize", this.checkMobileScreen);
    },

    methods: {
        checkMobileScreen() {
            const windowWidth = window.innerWidth;

            if (windowWidth <= 750) {
                this.mobile = true;
                return;
            } else {
                this.mobile = false;
            }
        },

        continueOnMobile(event) {
            console.log(event);
            this.mobile = false;
        },
    },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");

:root {
    --fontPoppins: "Poppins", Arial, sans-serif;

    --purple: #7c5dfa;
    --darkPurple: #252945;
    --gray: #dfe3fa;
    --green: #33d69f;
    --orange: #ff8f00;
    --red: #ec5757;
    --white: #fff;
    --black: #141625;
    --black2: #1e2139;

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
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: var(--customText);
    letter-spacing: 0.05px;
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

.mobile-message {
    height: 100vh;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0 20px;
    background-color: var(--black);
    color: var(--white);

    h1 {
        font-size: 24px;
    }

    p,
    label {
        margin-top: 16px;
    }

    label input {
        margin-right: 5px;
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
