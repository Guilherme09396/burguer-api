const productsDTO = (obj) => {
    return {
        id: obj.id,
        name: obj.name,
        description: obj.description,
        value_unit: obj.value_unit
    }
}

module.exports = productsDTO;