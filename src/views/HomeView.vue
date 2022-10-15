<template>
    <div class="home">
        <!-- header -->
        <div class="header flex">
            <div class="left flex flex-column">
                <h1>Invoices</h1>
                <p>There are <span>4</span> total invoices</p>
            </div>

            <div class="right flex">
                <div class="filter flex" @click="toggleFilterMenu">
                    <span>Filter by:</span>
                    <img
                        src="@/assets/icon-arrow-down.svg"
                        alt="down arrow icon"
                        aria-label="filter menu options"
                    />

                    <transition name="zoomIn">
                        <ul class="filter-menu" v-show="filterMenu">
                            <li>Draft</li>
                            <li>Pending</li>
                            <li>Paid</li>
                            <li>Clear Filter</li>
                        </ul>
                    </transition>
                </div>

                <div
                    class="button flex"
                    aria-label="create new invoice"
                    @click="createNewInvoice"
                >
                    <div class="inner flex">
                        <img src="@/assets/icon-plus.svg" alt="plus icon" />
                    </div>
                    <span>New invoice</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
    name: "HomeView",

    data() {
        return {
            filterMenu: null,
        };
    },

    methods: {
        ...mapMutations(["TOGGLE_INVOICE"]),

        createNewInvoice() {
            this.TOGGLE_INVOICE();
        },

        toggleFilterMenu() {
            this.filterMenu = !this.filterMenu;
        },
    },
};
</script>

<style lang="scss" scoped>
.home {
    color: var(--white);
    z-index: 98;

    .header {
        margin-top: 2%;
        margin-bottom: 65px;

        .left,
        .right {
            -ms-flex: 1;
            flex: 1;
        }

        .right {
            justify-content: flex-end;
            align-items: center;

            .button,
            .filter {
                align-items: center;

                span {
                    font-size: 14px;
                    text-transform: capitalize;
                }
            }

            .filter {
                position: relative;
                margin-right: 40px;
                cursor: pointer;

                img {
                    width: 10px;
                    height: 6px;
                    margin-left: 12px;
                }

                .filter-menu {
                    width: 120px;
                    position: absolute;
                    top: 30px;
                    background-color: var(--black2);
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
                        0 2px 4px -1px rgba(0, 0, 0, 0.06);
                    border-radius: var(--radius4);
                    list-style: none;

                    li {
                        font-size: 12px;
                        padding: 10px 20px;
                        cursor: pointer;

                        &:first-child {
                            border-radius: var(--radius4) var(--radius4) 0 0;
                        }

                        &:last-child {
                            border-radius: 0 0 var(--radius4) var(--radius4);
                        }

                        &:hover {
                            background-color: var(--white);
                            color: var(--black2);
                        }
                    }
                }
            }

            .button {
                background-color: var(--purple);
                padding: 8px 10px;
                border-radius: var(radius40);

                .inner {
                    align-items: center;
                    justify-content: center;
                    background-color: var(--white);
                    margin-right: 8px;
                    padding: 8px;
                    border-radius: 50%;

                    img {
                        width: 10px;
                        height: 10px;
                        margin: auto;
                    }
                }
            }
        }
    }

    .empty {
        align-items: center;
        margin-top: 160px;

        img {
            width: 214px;
            height: 200px;
        }

        h3 {
            font-size: 20px;
            margin-top: 40px;
        }

        p {
            max-width: 224px;
            font-size: 12px;
            font-weight: 300;
            margin-top: 16px;
            text-align: center;
        }
    }

    .zoomIn-enter-active,
    .zoomIn-leave-active {
        -o-transition: 0.2s ease-in-out all;
        -moz-transition: 0.2s ease-in-out all;
        -webkit-transition: 0.2s ease-in-out all;
        transition: 0.2s ease-in-out all;
    }

    .zoomIn-enter-from,
    .zoomIn-leave-to {
        -o-transform: scale(0.8);
        -ms-transform: scale(0.8);
        -moz-transform: scale(0.8);
        -webkit-transform: scale(0.8);
        transform: scale(0.8);
    }

    @media (max-width: 541px) {
        .header {
            -ms-flex-direction: column;
            flex-direction: column;
            margin-top: 30px;

            .right {
                justify-content: space-between;
                margin-top: 1.5rem;
            }
        }
    }

    @media (max-width: 300px) {
        .header {
            .right {
                align-items: flex-start;
                flex-direction: column-reverse;

                .button {
                    margin-left: 0;
                    margin-bottom: 1.5rem;
                }
            }
        }
    }
}
</style>
