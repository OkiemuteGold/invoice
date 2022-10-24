<template>
    <div v-if="currentInvoice" class="invoice-view container">
        <router-link class="nav-link flex" :to="{ name: 'Home' }">
            <img src="@/assets/icon-arrow-left.svg" alt="left arrow icon" /> Go
            Back
        </router-link>

        <!-- Header -->
        <div class="header flex">
            <div class="left flex">
                <span>Status</span>
                <div
                    class="status-button flex"
                    :class="{
                        paid: currentInvoice.invoicePaid,
                        draft: currentInvoice.invoiceDraft,
                        pending: currentInvoice.invoicePending,
                    }"
                >
                    <span v-if="currentInvoice.invoicePaid">Paid</span>
                    <span v-if="currentInvoice.invoiceDraft">Draft</span>
                    <span v-if="currentInvoice.invoicePending">Pending</span>
                </div>
            </div>

            <div class="right flex">
                <button
                    @click="toggleEditInvoice(currentInvoice.docId)"
                    class="dark-purple"
                >
                    Edit
                </button>
                <button
                    @click="deleteInvoice(currentInvoice.docId)"
                    class="red"
                >
                    Delete
                </button>

                <button
                    @click="updateStatusToPaid(currentInvoice.docId)"
                    v-if="currentInvoice.invoicePending"
                    class="green"
                >
                    Mark as Paid
                </button>

                <button
                    v-if="
                        currentInvoice.invoiceDraft ||
                        currentInvoice.invoicePaid
                    "
                    @click="updateStatusToPending(currentInvoice.docId)"
                    class="orange"
                >
                    Mark as Pending
                </button>
            </div>
        </div>

        <!-- Invoice Details -->
        <div class="invoice-details flex flex-column">
            <div class="top flex">
                <div class="left flex flex-column">
                    <p><span>#</span>{{ currentInvoice.invoiceId }}</p>
                    <p>{{ currentInvoice.productDescription }}</p>
                </div>

                <div class="right flex flex-column">
                    <p>{{ currentInvoice.billerStreetAddress }}</p>
                    <p>{{ currentInvoice.billerCity }}</p>
                    <p>{{ currentInvoice.billerZipCode }}</p>
                    <p>{{ currentInvoice.billerCountry }}</p>
                </div>
            </div>

            <div class="middle flex">
                <div class="payment flex flex-column">
                    <h4>Invoice Date</h4>
                    <p>{{ currentInvoice.invoiceDate }}</p>

                    <h4>Payment Date</h4>
                    <p>{{ currentInvoice.paymentDueDate }}</p>
                </div>

                <div class="bill flex flex-column">
                    <h4>Bill To</h4>
                    <p>{{ currentInvoice.clientName }}</p>
                    <p>{{ currentInvoice.clientStreetAddress }}</p>
                    <p>{{ currentInvoice.clientCity }}</p>
                    <p>{{ currentInvoice.clientZipCode }}</p>
                    <p>{{ currentInvoice.clientCountry }}</p>
                </div>

                <div class="send-to flex flex-column">
                    <h4>Sent To</h4>
                    <p>{{ currentInvoice.clientEmail }}</p>
                </div>
            </div>

            <div class="bottom flex flex-column">
                <div class="billing-items">
                    <div class="heading flex">
                        <p>Item Name</p>
                        <p>QTY</p>
                        <p>Price</p>
                        <p>Total</p>
                    </div>

                    <div
                        v-for="(item, index) in currentInvoice.invoiceItemList"
                        :key="index"
                        class="item flex"
                    >
                        <p>{{ item.itemName }}</p>
                        <p>{{ item.qty }}</p>
                        <p>{{ item.price }}</p>
                        <p>{{ item.total }}</p>
                    </div>
                </div>

                <div class="total flex">
                    <p>Amount Due</p>
                    <p>{{ currentInvoice.invoiceTotal }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
    name: "invoiceView",

    computed: {
        ...mapState(["currentInvoiceArray", "editInvoice"]),
    },

    data() {
        return {
            currentInvoice: null,
        };
    },

    methods: {
        ...mapMutations([
            "SET_CURRENT_INVOICE",
            "TOGGLE_EDIT_INVOICE",
            "TOGGLE_INVOICE",
        ]),

        ...mapActions([
            "DELETE_INVOICE",
            "UPDATE_STATUS_TO_PENDING",
            "UPDATE_STATUS_TO_PAID",
        ]),

        getCurrentInvoice() {
            this.SET_CURRENT_INVOICE(this.$route.params.invoiceId);
            this.currentInvoice = this.currentInvoiceArray[0];
        },

        toggleEditInvoice() {
            this.TOGGLE_EDIT_INVOICE();
            this.TOGGLE_INVOICE();
        },

        async deleteInvoice(docId) {
            await this.DELETE_INVOICE(docId);
            this.$router.push({ name: "Home" });
        },

        updateStatusToPaid(docId) {
            this.UPDATE_STATUS_TO_PAID(docId);
        },

        updateStatusToPending(docId) {
            this.UPDATE_STATUS_TO_PENDING(docId);
        },
    },

    created() {
        this.getCurrentInvoice();
    },

    watch: {
        editInvoice() {
            if (!this.editInvoice) {
                this.currentInvoice = this.currentInvoiceArray[0];
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.invoice-view {
    .nav-link {
        font-size: 12px;
        align-items: center;
        color: var(--white);
        margin-bottom: 32px;

        img {
            height: 10px;
            width: 7px;
            margin-right: 16px;
        }
    }

    .header,
    .invoice-details {
        background-color: var(--black2);
        border-radius: 20px;
    }

    .header {
        font-size: 12px;
        align-items: center;
        padding: 24px 32px;

        .left {
            align-items: center;

            span {
                color: var(--gray);
                margin-right: 16px;
            }
        }

        .right {
            -ms-flex: 1;
            flex: 1;
            justify-content: flex-end;

            button {
                color: var(--white);
            }
        }
    }

    .invoice-details {
        padding: 48px;
        margin-top: 24px;

        .top {
            div {
                -ms-flex: 1;
                flex: 1;
                color: var(--gray);
            }

            .left {
                font-size: 12px;

                p:first-child {
                    font-size: 24px;
                    color: var(--white);
                    margin-bottom: 8px;
                    text-transform: uppercase;
                }

                p:nth-child(2) {
                    font-size: 16px;
                }

                span {
                    color: #888eb0;
                }
            }

            .right {
                font-size: 12px;
                align-items: flex-end;
            }
        }

        .middle {
            gap: 16px;
            color: var(--gray);
            margin-top: 50px;

            h4 {
                font-size: 12px;
                font-weight: 400;
                margin-bottom: 12px;
            }

            p {
                font-size: 16px;
            }

            .bill,
            .payment {
                -ms-flex: 1;
                flex: 1;
            }

            .payment {
                h4:nth-child(3) {
                    margin-top: 32px;
                }

                p {
                    font-weight: 600;
                }
            }

            .bill {
                p:nth-child(2) {
                    font-size: 16px;
                }

                p:nth-child(3) {
                    margin-top: auto;
                }

                p {
                    font-size: 12px;
                }
            }

            .send-to {
                -ms-flex: 2;
                flex: 2;
            }
        }

        .bottom {
            margin-top: 50px;

            .billing-items {
                background-color: var(--darkPurple);
                padding: 32px;
                border-radius: 20px 20px 0 0;

                .heading {
                    font-size: 12px;
                    color: var(--gray);
                    margin-bottom: 32px;

                    p:first-child {
                        -ms-flex: 3;
                        flex: 3;
                        text-align: left;
                    }

                    p {
                        -ms-flex: 1;
                        flex: 1;
                        text-align: right;
                    }
                }

                .item {
                    font-size: 13px;
                    color: var(--white);
                    margin-bottom: 32px;

                    &:last-child {
                        margin-bottom: 0;
                    }

                    p:first-child {
                        -ms-flex: 3;
                        flex: 3;
                        text-align: left;
                    }

                    p {
                        -ms-flex: 1;
                        flex: 1;
                        text-align: right;
                    }
                }
            }

            .total {
                align-items: center;
                background-color: rgba(12, 14, 22, 0.7);
                color: var(--white);
                padding: 32px;
                border-radius: 0 0 20px 20px;

                p {
                    font-size: 12px;
                    -ms-flex: 1;
                    flex: 1;
                }

                p:nth-child(2) {
                    font-size: 28px;
                    text-align: right;
                }
            }
        }
    }
}
</style>
