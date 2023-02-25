const Cakes = require("../models/Cakes");

const cakesMock = require("../mock/cakes.json");

module.exports = async () => {
  const cakes = await Cakes.find();
  if (cakes.length <= cakesMock.length) {
    await createInitialEntity(Cakes, cakesMock);
  }
};

async function createInitialEntity(Model, dataMock) {
  await Model.collection.drop();
  return Promise.all(
    dataMock.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (error) {
        return error;
      }
    })
  );
}
