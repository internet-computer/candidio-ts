# candidio-ts

### **Candid Idio**matic **T**ype**S**cipt makes sense of Candid's typescript oddities.

Internet Computer backends provide typescript definitions with an excess of type fidelity that compromises readability for everyday typescript development. This library wraps the default candid typescript bindings into idiomatic typescript.

## Wrap An Actor

Wrap your actor in candidio to do an automated idiomatic remap all of its parameter and return types.

```typescript
import candidio from "candidio-ts";
import { actor } from "declarations/my-canister";

const wrapped = candidio(actor);

await actor.queryOptional(); // [value] | [];
await wrapped.queryOptional(); // value | undefined;
```

## Custom Conversion

You can customize your actor wrapper by passing custom configuration for each type. If you want the default type fidelity, you can disable mapping of certain types. You can also pass a custom map function for a certain type, or for a certain actor method.

```typescript
import candidio from "candidio-ts";
import { actor } from "declarations/my-canister";

const wrapped = candidio(actor, {
    types: {
        optional: false,
    },
    methods: {
        query: {
            map ([value]: [string] | []) {
                return value || "default";
            },
            reverse (value: string) {
                return [value]
            }
        }
    }
});
```

## Conversion Functions

Access individual conversion methods by importing them individually.

Supported types:

- [x] Optional
- [ ] Date
- [ ] 

Example usage:

```typescript
// Map an optional field received from a canister

import { mapOptional } from "candidio-ts";

const data = await myActor.query(); // [value] | []
const result = mapOptional(data); // value | undefined
```

```typescript
// Map an optional field before sending it to a canister

import { reverseOptional } from "candidio-ts";

const data : string | undefined = "value";
const result = await.myActor.update(reverseOptional(data))
```