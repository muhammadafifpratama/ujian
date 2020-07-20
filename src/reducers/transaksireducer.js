const initial_state = { id: 1 }

export default (asd = initial_state, action) => {
    switch (action.type) {
        case 'click':
            console.log(action.payload + "ini yang mana");
            return action.payload
        default:
            return asd
    }
}