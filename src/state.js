export const initial = {
    id: "",
    name: "",
    type: "",
    required: false,
    fields: [
        {
            name: "name",
            type: "object",
            required: false,
            fields: [
                {
                    name: "firstName",
                    type: "object",
                    required: false,
                    fields: [
                        {
                            name: "age",
                            type: "number",
                            required: true
                        }
                    ]
                }
            ]
        }
    ],
}

export const reducer = (state = initial, action) => {
    switch (action.type) {
        case "add":
            return addField(state, action)
        case "remove":
            return removeField(state, action)
        case "update":
            return updateField(state, action)
        default:
            return state
    }
}

const updateField = (state, action) => {
    const copy = structuredClone(state)

    let node = copy;

    action.payload.path.forEach(p => {
        node = node.fields[p]
    })

    node[action.payload.name] = action.payload.value

    if (action.payload.name === "type") {
        if (action.payload.value === "object") {
            node.fields = []
        } else {
            delete node.fields
        }
    }

    return copy
}

const addField = (state, action) => {
    const copy = structuredClone(state)

    let node = copy;

    action.payload.path.forEach(p => {
        node = node.fields[p];
    })

    node.fields.push({
        name: "age",
        type: "number",
        required: true
    })

    return copy
}

const removeField = (state, action) => {
    const copy = structuredClone(state)

    let node = copy;
    const toDelete = action.payload.path.pop()

    action.payload.path.forEach(p => {
        node = node.fields[p];
    })

    node.fields.splice(toDelete, 1)

    return copy
}