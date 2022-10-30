<template>
    <div class="home">
        <!-- header -->
        <div class="header flex">
            <div class="left flex flex-column">
                <h1>Invoices</h1>
                <p>
                    <span v-show="allInvoiceData.length > 1">
                        There are <span>{{ allInvoiceData.length }}</span> total
                        invoices
                    </span>
                    <span v-show="allInvoiceData.length === 1">
                        There is only 1 invoice
                    </span>
                    <span v-show="allInvoiceData.length === 0">
                        There are no invoice currently
                    </span>
                </p>
            </div>

            <div class="right flex">
                <div class="filter flex" @click="toggleFilterMenu">
                    <span
                        >Filter by
                        <span v-if="filteredStatus"
                            >: {{ filteredStatus }}</span
                        >
                    </span>

                    <img
                        src="@/assets/icon-arrow-down.svg"
                        alt="down arrow icon"
                        aria-label="filter menu options"
                    />

                    <transition name="zoomIn">
                        <ul class="filter-menu" v-show="filterMenu">
                            <li
                                @click="filterInvoices"
                                v-for="(option, index) in filterMenuOptions"
                                :key="index"
                            >
                                {{ option }}
                            </li>
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

        <!-- invoice -->
        <div v-if="filteredInvoices && filteredInvoices.length > 0">
            <AllInvoices
                v-for="(invoiceSingle, index) in filteredInvoices"
                :key="index"
                :invoice="invoiceSingle"
            />
        </div>

        <div v-else class="empty flex flex-column">
            <img
                src="@/assets/illustration-empty.svg"
                alt="no invoice illustration"
            />

            <h3>There is nothing here</h3>
            <p>
                Create a new invoice by clicking the New Invoice button and get
                started
            </p>
        </div>
    </div>
</template>

<script>
import AllInvoices from "@/components/AllInvoices";
import { mapMutations, mapState } from "vuex";

export default {
    name: "HomeView",

    components: {
        AllInvoices,
    },

    computed: {
        ...mapState(["allInvoiceData"]),

        filteredInvoices() {
            return this.allInvoiceData.filter((invoice) => {
                if (this.filteredStatus === "Draft") {
                    return invoice.invoiceDraft === true;
                }

                if (this.filteredStatus === "Pending") {
                    return invoice.invoicePending === true;
                }

                if (this.filteredStatus === "Paid") {
                    return invoice.invoicePaid === true;
                }

                return invoice;
            });
        },
    },

    data() {
        return {
            filterMenuOptions: ["Draft", "Pending", "Paid", "Clear Filter"],
            filterMenu: null,
            filteredStatus: null,
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

        filterInvoices(e) {
            const elem = e.target.innerText;

            if (elem.toLowerCase() === "clear filter") {
                this.filteredStatus = null;
                return;
            }

            this.filteredStatus = elem;
        },
    },
};
</script>

<style lang="scss" scoped>
.home {
    color: var(--white);
    z-index: 98;
    padding-bottom: 3%;

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
        max-width: 320px;
        justify-content: center;
        align-items: center;
        margin: 100px auto;

        h3 {
            font-size: 20px;
            margin-top: 40px;
        }

        p {
            max-width: 230px;
            font-size: 12px;
            font-weight: 300;
            margin-top: 16px;
            text-align: center;
        }
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
