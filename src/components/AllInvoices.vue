<template>
    <router-link
        class="invoice flex"
        :to="{ name: 'Invoice', params: { invoiceId: invoice.invoiceId } }"
    >
        <div class="left flex">
            <span class="tracking-number">#{{ invoice.invoiceId }}</span>
            <span class="due-date">{{ invoice.paymentDueDate }}</span>
            <span class="person">{{ invoice.clientName }}</span>
        </div>

        <div class="right flex">
            <span class="price">${{ invoice.invoiceTotal }}</span>

            <div
                class="status-button flex"
                :class="{
                    paid: invoice.invoicePaid,
                    draft: invoice.invoiceDraft,
                    pending: invoice.invoicePending,
                }"
            >
                <span v-if="invoice.invoicePaid">Paid</span>
                <span v-if="invoice.invoiceDraft">Draft</span>
                <span v-if="invoice.invoicePending">Pending</span>
            </div>

            <div class="icon">
                <img
                    src="@/assets/icon-arrow-right.svg"
                    alt="right arrow icon"
                />
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    props: ["invoice"],
};
</script>

<style lang="scss" scoped>
.invoice {
    gap: 16px;
    align-items: center;
    background-color: var(--black2);
    color: var(--white);
    padding: 28px 32px;
    margin-bottom: 16px;
    border-radius: 20px;
    text-decoration: none;
    cursor: pointer;

    span {
        font-size: 13px;
    }

    .left {
        gap: 16px;
        align-items: center;
        flex-basis: 60%;

        span {
            -ms-flex: 1;
            flex: 1;
        }

        .tracking-number {
            text-transform: uppercase;
        }
    }

    .right {
        gap: 16px;
        align-items: center;
        flex-basis: 40%;

        .price {
            font-size: 16px;
            font-weight: 600;
            -ms-flex: 1;
            flex: 1;
        }

        .icon {
            min-width: 7px;
        }
    }

    @media (max-width: 730px) {
        -ms-flex-direction: column;
        flex-direction: column;
        align-items: stretch;
        padding-left: 25px;
        padding-right: 25px;
        overflow-x: auto;

        .left,
        .right {
            flex-basis: 100%;
        }

        .right {
            .status-button {
                margin-right: 5%;
            }
        }
    }

    @media (max-width: 541px) {
        span {
            white-space: nowrap;
        }

        .left,
        .right {
            overflow-x: auto;

            span {
                -ms-flex: 1;
                flex: 1;
            }
        }
    }
}
</style>
