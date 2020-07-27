const userAction = (type = null, payload = {}) => {
    return {
        type: type,
        payload: payload
    }
}

export default userAction;