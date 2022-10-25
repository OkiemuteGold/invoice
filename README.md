# invoice

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### Firebase Config v9

```
...
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
```

### Firebase - Add

```
import { collection, addDoc } from "firebase/firestore";

Use:
await addDoc(collection(db, "invoices"), { ... });

OR import { doc, setDoc } from "firebase/firestore";

Use:
await setDoc(doc(db, "invoices", "new-city-id"), { ... });

Ref: https://stackoverflow.com/questions/47474522/firestore-difference-between-set-and-add
```

### Firebase - Update

```
updateDoc():
import { doc, updateDoc } from "firebase/firestore";

const invoiceDoc = doc(db, "invoices", docId);
await updateDoc(invoiceDoc, { ... });


setDoc():
while using setDoc(), include
{ merge: true },
after the data { ... }, to merge otherwise its contents will be overwritten with the newly provided data.
```

### Download Invoice View

Using jsPDF and html2canvas with Vue

```
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
```
