exports.list = (data = []) => {
    return {
        status: true,
        result: data
    }
}

exports.success = (message) =>  {
    return {
        status: true,
        message: message
    }
}