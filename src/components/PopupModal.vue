<template>
    <div class="modal flex">
        <div class="modal-content">
            <p>
                Are you sure you want to exit? Your changes will not be saved?
            </p>

            <div class="actions flex">
                <button @click="closeModal" class="purple">Return</button>
                <button @click="closeInvoice" class="red">Close</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
    methods: {
        ...mapMutations(["TOGGLE_POPUP_MODAL", "TOGGLE_INVOICE"]),

        closeModal() {
            this.TOGGLE_POPUP_MODAL();
        },

        closeInvoice() {
            this.TOGGLE_POPUP_MODAL();
            this.TOGGLE_INVOICE();

            //   if (this.editInvoice) {
            //     this.TOGGLE_EDIT_INVOICE();
            //   }
        },
    },

    //   computed: {
    //     ...mapState(["editInvoice"]),
    //   },
};
</script>

<style lang="scss" scoped>
.modal {
    position: fixed;
    height: 100vh;
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 100;

    .modal-content {
        max-width: 450px;
        background-color: #252945;
        color: #fff;
        padding: 48px 32px;
        border-radius: 20px;

        p {
            text-align: center;
        }

        .actions {
            margin-top: 24px;

            button {
                -ms-flex: 1;
                flex: 1;
            }
        }
    }
}
</style>
