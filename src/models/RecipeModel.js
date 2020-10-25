module.exports = (mongoose) => {
    const schema = new mongoose.Schema(
        {
            name: String,
            description: String,
            ingredients: [String],
            steps: [String],
            tags: [String],
            favourite: Boolean,
        },
        {timestamps: true},
    );


    schema.method('toJSON', function() {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    const Recipe = mongoose.model('recipe', schema);

    return Recipe;
};
