module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
          name: String,
          description: String,
          ingredients: [String],
          steps: [String],
          tags: [String],
          published: Boolean
        },
        { timestamps: true }
    );
  

    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });

    const Recipe = mongoose.model("recipe", schema);

    return Recipe;
  };

  