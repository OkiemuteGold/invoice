<template>
    <div class="modal flex">
        <div class="modal-content flex flex-column">
            <p>Please enter password to continue</p>

            <div class="input">
                <input
                    :type="isPasswordShown ? 'text' : 'password'"
                    name="downloadPassword"
                    id="downloadPassword"
                    v-model="downloadPassword"
                />

                <span class="show-password-icon">
                    <svg
                        class="show-password"
                        viewBox="0 0 576 512"
                        v-if="isPasswordShown"
                        @click="isPasswordShown = !isPasswordShown"
                    >
                        <title>Show Password</title>
                        <path
                            d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                        />
                    </svg>

                    <svg
                        class="hide-password"
                        viewBox="0 0 640 512"
                        v-if="!isPasswordShown"
                        @click="isPasswordShown = !isPasswordShown"
                    >
                        <title>Hide Password</title>
                        <path
                            d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                        />
                    </svg>
                </span>
            </div>

            <div class="actions flex">
                <button
                    class="purple"
                    v-if="isPasswordCorrect"
                    @click="download"
                >
                    Download
                </button>

                <button @click="closeModal" class="red">Close</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default {
    props: ["invoiceId", "invoiceContent"],

    computed: {
        isPasswordCorrect() {
            return (
                this.downloadPassword === process.env.VUE_APP_DOWNLOAD_PASSWORD
            );
        },
    },

    data() {
        return {
            downloadPassword: null,
            isPasswordShown: null,
        };
    },

    methods: {
        ...mapMutations(["TOGGLE_PASSWORD_INPUT_MODAL"]),

        closeModal() {
            this.TOGGLE_PASSWORD_INPUT_MODAL();
            this.isPasswordShown = null;
        },

        download() {
            const invoiceName = this.invoiceId;
            const content = this.invoiceContent;
            // const contentHtml = content.innerText;

            // {orientation: "landscape",} as arg in jsPDF
            const doc = new jsPDF({
                orientation: "landscape",
                unit: "px",
                format: "a4",
                hotfixes: ["px_scaling"],
            });

            // doc.text(contentHtml, 10, 10);
            // doc.save("invoice-" + invoiceName + ".pdf");

            // let canvasElement = document.createElement("canvas");
            // html2canvas(content, { canvas: canvasElement }).then(function (
            //     canvas
            // ) {
            //     const img = canvas.toDataURL("image/jpeg", 0.8);
            //     doc.addImage(img, "JPEG", 20, 20);
            //     doc.save("invoice-" + invoiceName + ".pdf");
            // });

            html2canvas(content, {
                width: doc.internal.pageSize.getWidth(),
                height: doc.internal.pageSize.getHeight(),
            }).then((canvas) => {
                const img = canvas.toDataURL("image/png");

                doc.addImage(
                    img,
                    "PNG",
                    140,
                    10,
                    doc.internal.pageSize.getWidth(),
                    doc.internal.pageSize.getHeight()
                );

                doc.save("invoice-" + invoiceName + ".pdf");
            });

            this.isPasswordShown = null;
        },
    },
};
</script>

<style lang="scss" scoped>
.modal {
    position: absolute;
    bottom: 15%;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
    justify-content: center;
    align-items: center;
    z-index: 100;

    .modal-content {
        height: 250px;
        max-width: 350px;
        width: 100%;
        justify-content: center;
        align-items: center;
        padding: 48px 32px;
        background-color: var(--darkPurple);
        color: var(--white);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
        border: 1px solid rgba(0, 0, 0, 0.125);
        border-radius: 20px;

        p,
        .show-password-icon {
            font-size: 14px;
        }

        .input {
            position: relative;
            width: 100%;
            margin-top: 25px;

            input {
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

            .show-password-icon {
                position: absolute;
                top: 10px;
                right: 10px;
                padding: 1px;
                cursor: pointer;

                svg {
                    height: 18px;
                    width: 18px;
                    fill: var(--white);
                    vertical-align: middle;
                }
            }
        }

        .actions {
            margin-top: 30px;

            button {
                -ms-flex: 1;
                flex: 1;

                &:first-child {
                    margin-left: 0;
                }
            }
        }
    }
}
</style>
