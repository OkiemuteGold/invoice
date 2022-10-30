import { createStore } from 'vuex';
import { db } from "../firebase/firebaseInit";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";

export default createStore({
    state: {
        allInvoiceData: [],
        invoiceModal: null,
        modalActive: null,
        passwordInputModalActive: null,
        invoicesLoaded: null,
        currentInvoiceArray: null,
        editInvoice: null,
    },

    getters: {
    },

    mutations: {
        TOGGLE_INVOICE(state) {
            state.invoiceModal = !state.invoiceModal;
        },

        TOGGLE_POPUP_MODAL(state) {
            state.modalActive = !state.modalActive;
        },

        TOGGLE_PASSWORD_INPUT_MODAL(state) {
            state.passwordInputModalActive = !state.passwordInputModalActive;
        },

        SET_INVOICE_DATA(state, payload) {
            state.allInvoiceData.push(payload);
        },

        INVOICES_LOADED(state) {
            state.invoicesLoaded = true;
        },

        SET_CURRENT_INVOICE(state, payload) {
            state.currentInvoiceArray = state.allInvoiceData.filter(invoice => {
                return invoice.invoiceId === payload;
            });
        },

        TOGGLE_EDIT_INVOICE(state) {
            state.editInvoice = !state.editInvoice;
        },

        DELETE_INVOICE(state, payload) {
            state.allInvoiceData = state.allInvoiceData.filter((invoice) => invoice.docId !== payload);
        },

        UPDATE_STATUS_TO_PAID(state, payload) {
            state.allInvoiceData.forEach((invoice) => {
                if (invoice.docId === payload) {
                    invoice.invoicePaid = true;
                    invoice.invoicePending = false;
                }
            });
        },

        UPDATE_STATUS_TO_PENDING(state, payload) {
            state.allInvoiceData.forEach((invoice) => {
                if (invoice.docId === payload) {
                    invoice.invoicePaid = false;
                    invoice.invoicePending = true;
                    invoice.invoiceDraft = false;
                }
            });
        },
    },

    actions: {
        async GET_ALL_INVOICES({ commit, state }) {
            const querySnapshot = await getDocs(collection(db, "invoices"));

            querySnapshot.forEach((doc) => {
                if (!state.allInvoiceData.some(invoice => invoice.docId === doc.id)) {
                    const data = {
                        docId: doc.id,
                        invoiceId: doc.data().invoiceId,
                        billerStreetAddress: doc.data().billerStreetAddress,
                        billerCity: doc.data().billerCity,
                        billerZipCode: doc.data().billerZipCode,
                        billerCountry: doc.data().billerCountry,
                        clientName: doc.data().clientName,
                        clientEmail: doc.data().clientEmail,
                        clientStreetAddress: doc.data().clientStreetAddress,
                        clientCity: doc.data().clientCity,
                        clientZipCode: doc.data().clientZipCode,
                        clientCountry: doc.data().clientCountry,
                        invoiceDateUnix: doc.data().invoiceDateUnix,
                        invoiceDate: doc.data().invoiceDate,
                        paymentTerms: doc.data().paymentTerms,
                        paymentDueDateUnix: doc.data().paymentDueDateUnix,
                        paymentDueDate: doc.data().paymentDueDate,
                        productDescription: doc.data().productDescription,
                        invoiceItemList: doc.data().invoiceItemList,
                        invoiceTotal: doc.data().invoiceTotal,
                        invoicePending: doc.data().invoicePending,
                        invoiceDraft: doc.data().invoiceDraft,
                        invoicePaid: doc.data().invoicePaid,
                    };

                    commit("SET_INVOICE_DATA", data);
                }
            });

            commit("INVOICES_LOADED");
        },

        async UPDATE_INVOICE({ commit, dispatch }, { docId, routeId }) {
            commit("DELETE_INVOICE", docId);
            await dispatch("GET_ALL_INVOICES");

            commit("TOGGLE_INVOICE");
            commit("TOGGLE_EDIT_INVOICE");

            commit("SET_CURRENT_INVOICE", routeId);
        },

        async DELETE_INVOICE({ commit }, docId) {
            await deleteDoc(doc(db, "invoices", docId));

            commit("DELETE_INVOICE", docId);
        },

        async UPDATE_STATUS_TO_PAID({ commit }, docId) {
            const invoiceDoc = doc(db, "invoices", docId);
            await updateDoc(invoiceDoc, {
                invoicePaid: true,
                invoicePending: false,
            });

            commit("UPDATE_STATUS_TO_PAID", docId);
        },

        async UPDATE_STATUS_TO_PENDING({ commit }, docId) {
            const invoiceDoc = doc(db, "invoices", docId);
            await updateDoc(invoiceDoc, {
                invoicePaid: false,
                invoicePending: true,
                invoiceDraft: false,
            });

            commit("UPDATE_STATUS_TO_PENDING", docId);
        },
    },

    modules: {
    }
})
