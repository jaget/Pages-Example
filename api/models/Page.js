module.exports = {
    autoWatch: true,

    schema: true,

    attributes: {
        title: {
            type: 'string',
            required: true
        },
        slug: {
            type: 'string'
        },
        content: {
            type: 'string'
        }
    }
};
