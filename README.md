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
await addDoc(collection(db, "invoices"), { ... })

OR import { doc, setDoc } from "firebase/firestore";

Use:
await setDoc(doc(db, "invoices", "new-city-id"), { ... })
```
