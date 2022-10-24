<template>
    <div
        class="invoice-wrap flex flex-column"
        @click="checkClick"
        ref="invoiceWrap"
    >
        <form class="invoice-content" @submit.prevent="submitForm">
            <LoadingProcess v-show="loading" />

            <h2 v-if="!editInvoice">New Invoice</h2>
            <h2 v-else>Edit Invoice</h2>

            <!-- Bill From -->
            <div class="bill-from flex flex-column">
                <h3>Bill From</h3>

                <div class="input flex flex-column">
                    <label for="billerStreetAddress">Street Address</label>
                    <input
                        type="text"
                        id="billerStreetAddress"
                        aria-label="street address"
                        required
                        v-model="billerStreetAddress"
                    />
                </div>

                <div class="location-details flex">
                    <div class="input flex flex-column">
                        <label for="billerCity">City</label>
                        <input
                            type="text"
                            id="billerCity"
                            aria-label="city"
                            required
                            v-model="billerCity"
                        />
                    </div>

                    <div class="input flex flex-column">
                        <label for="billerZipCode">Zip Code</label>
                        <input
                            type="text"
                            id="billerZipCode"
                            aria-label="zip code"
                            required
                            v-model="billerZipCode"
                        />
                    </div>

                    <div class="input flex flex-column">
                        <label for="billerCountry">Country</label>
                        <input
                            type="text"
                            id="billerCountry"
                            aria-label="country"
                            required
                            v-model="billerCountry"
                        />
                    </div>
                </div>
            </div>

            <!-- Bill To -->
            <div class="bill-to flex flex-column">
                <h3>Bill To</h3>

                <div class="input flex flex-column">
                    <label for="clientName">Client's Name</label>
                    <input
                        type="text"
                        id="clientName"
                        aria-label="client's name"
                        required
                        v-model="clientName"
                    />
                </div>

                <div class="input flex flex-column">
                    <label for="clientEmail">Client's Email</label>
                    <input
                        type="text"
                        id="clientEmail"
                        aria-label="client's email"
                        required
                        v-model="clientEmail"
                    />
                </div>

                <div class="input flex flex-column">
                    <label for="clientStreetAddress">Street Address</label>
                    <input
                        type="text"
                        id="clientStreetAddress"
                        aria-label="street address"
                        required
                        v-model="clientStreetAddress"
                    />
                </div>

                <div class="location-details flex">
                    <div class="input flex flex-column">
                        <label for="clientCity">City</label>
                        <input
                            type="text"
                            id="clientCity"
                            aria-label="city"
                            required
                            v-model="clientCity"
                        />
                    </div>

                    <div class="input flex flex-column">
                        <label for="clientZipCode">Zip Code</label>
                        <input
                            type="text"
                            id="clientZipCode"
                            aria-label="zip code"
                            required
                            v-model="clientZipCode"
                        />
                    </div>

                    <div class="input flex flex-column">
                        <label for="clientCountry">Country</label>
                        <input
                            type="text"
                            id="clientCountry"
                            aria-label="country"
                            required
                            v-model="clientCountry"
                        />
                    </div>
                </div>
            </div>

            <!-- Invoice Work Details -->
            <div class="invoice-work flex flex-column">
                <div class="payment flex">
                    <div class="input flex flex-column">
                        <label for="invoiceDate">Invoice Date</label>
                        <input
                            type="text"
                            id="invoiceDate"
                            aria-label="invoice date"
                            disabled
                            v-model="invoiceDate"
                        />
                    </div>

                    <div class="input flex flex-column">
                        <label for="paymentDueDate">Payment Due</label>
                        <input
                            type="text"
                            id="paymentDueDate"
                            aria-label="payment due"
                            disabled
                            v-model="paymentDueDate"
                        />
                    </div>
                </div>

                <div class="input flex flex-column">
                    <label for="paymentTerms">Payment Terms</label>
                    <select
                        name="paymentTerms"
                        id="paymentTerms"
                        aria-label="payment terms"
                        required
                        v-model="paymentTerms"
                    >
                        <option value="30">Net 30 Days</option>
                        <option value="60">Net 60 Days</option>
                    </select>
                </div>

                <div class="input flex flex-column">
                    <label for="productDescription">Product Description</label>
                    <input
                        type="text"
                        id="productDescription"
                        aria-label="product description"
                        required
                        v-model="productDescription"
                    />
                </div>

                <div class="work-items">
                    <h3>Item List</h3>

                    <table class="item-list">
                        <tr class="table-heading flex">
                            <th class="item-name">Item Name</th>
                            <th class="qty">Qty</th>
                            <th class="price">Price</th>
                            <th class="total">Total</th>
                        </tr>

                        <tr
                            class="table-items flex"
                            v-for="(item, index) in invoiceItemList"
                            :key="index"
                        >
                            <td class="item-name">
                                <input type="text" v-model="item.itemName" />
                            </td>
                            <td class="qty">
                                <input type="text" v-model="item.qty" />
                            </td>
                            <td class="price">
                                <input type="text" v-model="item.price" />
                            </td>
                            <td class="total flex">
                                ${{ (item.total = item.qty * item.price) }}
                            </td>

                            <img
                                src="@/assets/icon-delete.svg"
                                alt="delete icon"
                                @click="deleteInvoice(item.id)"
                            />
                        </tr>
                    </table>

                    <div
                        class="flex button"
                        aria-label="add new invoice"
                        @click="addNewInvoice"
                    >
                        <img src="@/assets/icon-plus.svg" alt="plus icon" />
                        Add New Invoice
                    </div>
                </div>
            </div>

            <!-- Save/Exit -->
            <div class="save flex">
                <div class="left">
                    <button type="button" class="red" @click="closeInvoice">
                        Cancel
                    </button>
                </div>

                <div class="right flex">
                    <button
                        type="submit"
                        class="dark-purple"
                        v-if="!editInvoice"
                        @click="saveDraft"
                    >
                        Save Draft
                    </button>

                    <button
                        type="submit"
                        class="purple"
                        v-if="!editInvoice"
                        @click="publishInvoice"
                    >
                        Create Invoice
                    </button>

                    <button type="sumbit" class="purple" v-if="editInvoice">
                        Update Invoice
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { uid } from "uid";
import { db } from "../firebase/firebaseInit";
import { collection, addDoc } from "firebase/firestore";
import LoadingProcess from "./LoadingProcess.vue";

export default {
    components: { LoadingProcess },

    computed: {
        ...mapState(["editInvoice"]),
    },

    data() {
        return {
            loading: null,

            dateOptions: {
                year: "numeric",
                month: "short",
                day: "numeric",
            },

            billerStreetAddress: null,
            billerCity: null,
            billerZipCode: null,
            billerCountry: null,
            clientName: null,
            clientEmail: null,
            clientStreetAddress: null,
            clientCity: null,
            clientZipCode: null,
            clientCountry: null,

            invoiceDateUnix: null,
            invoiceDate: null,
            paymentTerms: null,
            paymentDueDateUnix: null,
            paymentDueDate: null,
            productDescription: null,
            invoiceItemList: [],
            invoiceTotal: 0,

            invoicePending: null,
            invoiceDraft: null,
        };
    },

    created() {
        this.invoiceDateUnix = Date.now();
        this.invoiceDate = new Date(this.invoiceDateUnix).toLocaleDateString(
            "en-us",
            this.dateOptions
        );
    },

    methods: {
        ...mapMutations([
            "TOGGLE_INVOICE",
            "TOGGLE_POPUP_MODAL",
            "TOGGLE_EDIT_INVOICE",
        ]),

        checkClick(e) {
            if (e.target === this.$refs.invoiceWrap) {
                this.TOGGLE_POPUP_MODAL();
            }
        },

        closeInvoice() {
            this.TOGGLE_INVOICE();

            if (this.editInvoice) {
                this.TOGGLE_EDIT_INVOICE();
            }
        },

        addNewInvoice() {
            this.invoiceItemList.push({
                id: uid(),
                itemName: "",
                qty: "",
                price: 0,
                total: 0,
            });
        },

        deleteInvoice(currentItemId) {
            this.invoiceItemList = this.invoiceItemList.filter(
                (item) => item.id !== currentItemId
            );
        },

        calculateInvoiceTotalPrice() {
            this.invoiceTotal = 0;
            this.invoiceItemList.forEach((item) => {
                this.invoiceTotal += item.total;
            });
        },

        publishInvoice() {
            this.invoicePending = true;
        },

        saveDraft() {
            this.invoiceDraft = true;
        },

        async uploadInvoice() {
            if (this.invoiceItemList.length <= 0) {
                alert("Please fill out the invoice!");
                return;
            }

            this.loading = true;
            this.calculateInvoiceTotalPrice();

            // Add a new document in collection "invoices"
            await addDoc(collection(db, "invoices"), {
                invoiceId: uid(8),
                billerStreetAddress: this.billerStreetAddress,
                billerCity: this.billerCity,
                billerZipCode: this.billerZipCode,
                billerCountry: this.billerCountry,
                clientName: this.clientName,
                clientEmail: this.clientEmail,
                clientStreetAddress: this.clientStreetAddress,
                clientCity: this.clientCity,
                clientZipCode: this.clientZipCode,
                clientCountry: this.clientCountry,
                invoiceDateUnix: this.invoiceDateUnix,
                invoiceDate: this.invoiceDate,
                paymentTerms: this.paymentTerms,
                paymentDueDateUnix: this.paymentDueDateUnix,
                paymentDueDate: this.paymentDueDate,
                productDescription: this.productDescription,
                invoiceItemList: this.invoiceItemList,
                invoiceTotal: this.invoiceTotal,
                invoicePending: this.invoicePending,
                invoiceDraft: this.invoiceDraft,
                invoicePaid: null,
            });

            this.loading = false;
            this.TOGGLE_INVOICE();
        },

        submitForm() {
            this.uploadInvoice();
        },
    },

    watch: {
        paymentTerms() {
            const date = new Date(),
                dateDay = date.getDate();

            const futureDate = dateDay + parseInt(this.paymentTerms);

            this.paymentDueDateUnix = date.setDate(futureDate);

            this.paymentDueDate = new Date(
                this.paymentDueDateUnix
            ).toLocaleDateString("us-en", this.dateOptions);
        },
    },
};
</script>

<style lang="scss" scoped>
.invoice-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: scroll;
    z-index: 99;

    &::-webkit-scrollbar {
        display: none;
    }

    @media (min-width: 900px) {
        left: 90px;
    }

    .invoice-content {
        position: relative;
        max-width: 700px;
        width: 100%;
        background-color: var(--black);
        color: var(--white);
        padding: 56px;
        box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);

        h2 {
            color: var(--white);
            margin-bottom: 48px;
        }

        h3 {
            font-size: 12px;
            color: var(--purple);
            margin-bottom: 24px;
        }

        // Bill To / Bill From -------
        .bill-to,
        .bill-from {
            margin-bottom: 48px;

            .location-details {
                gap: 16px;

                div {
                    -ms-flex: 1;
                    flex: 1;
                }
            }
        }

        // Invoice Work -------
        .invoice-work {
            .payment {
                gap: 24px;

                div {
                    -ms-flex: 1;
                    flex: 1;
                }
            }

            .work-items {
                margin-top: 24px;

                h3 {
                    font-size: 18px;
                    color: var(--customText);
                    margin-bottom: 16px;
                }

                .item-list {
                    width: 100%;

                    // Item Table Styling --------
                    .table-heading,
                    .table-items {
                        font-size: 12px;
                        gap: 16px;

                        .item-name {
                            flex-basis: 50%;
                        }

                        .qty {
                            flex-basis: 10%;
                        }

                        .price {
                            flex-basis: 20%;
                        }

                        .total {
                            flex-basis: 20%;
                            align-self: center;
                        }
                    }

                    .table-heading {
                        margin-bottom: 16px;

                        th {
                            text-align: left;
                        }
                    }

                    .table-items {
                        position: relative;
                        margin-bottom: 24px;

                        img {
                            position: absolute;
                            top: 15px;
                            right: 0;
                            width: 12px;
                            height: 15px;
                            cursor: pointer;
                        }
                    }
                }

                .button {
                    width: 100%;
                    align-items: center;
                    justify-content: center;
                    background-color: var(--darkPurple);
                    color: var(--white);

                    img {
                        margin-right: 5px;
                    }
                }
            }
        }

        .save {
            margin-top: 50px;

            div {
                -ms-flex: 1;
                flex: 1;
            }

            .right {
                justify-content: flex-end;
            }
        }
    }

    .input {
        margin-bottom: 24px;
    }

    label {
        font-size: 12px;
        margin-bottom: 6px;
    }

    input,
    select {
        width: 100%;
        background-color: var(--black2);
        color: var(--white);
        padding: 12px 10px;
        border-radius: var(--radius4);
        border: none;

        &:focus {
            outline: none;
        }
    }

    @media (max-width: 541px) {
        .invoice-content {
            padding: 120px 20px 100px;

            .invoice-work .payment {
                gap: 18px;
            }

            .bill-to,
            .bill-from {
                .location-details {
                    gap: 0;
                    -ms-flex-direction: column;
                    flex-direction: column;
                }
            }

            .save {
                &,
                & .right {
                    -ms-flex-direction: column-reverse;
                    flex-direction: column-reverse;
                    justify-content: center;
                }

                button {
                    width: 100%;
                    margin-top: 0.5rem;
                    margin-left: 0;
                }
            }
        }
    }
}
</style>