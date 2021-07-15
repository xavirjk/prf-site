const mongoose = require('mongoose');

const { Schema, model, Types } = mongoose;
const { ObjectId } = Types;

const delims = {
  type: String,
  required: false,
};

const linksSchema = new Schema({
  client_id: {
    type: ObjectId,
    required: true,
    ref: 'Auth',
  },
  Instagram: delims,
  Facebook: delims,
  Twitter: delims,
  TikTok: delims,
  SnapChat: delims,
});

const { statics, methods } = linksSchema;

statics.findByClient_id = async function (client_id) {
  return await this.findOne({ client_id, client_id });
};

statics.addDetails = async function (data) {
  const details = { ...data };
  details.client_id = data.id;
  return await this.create(details);
};

methods.editDetails = async function (details) {
  for (const field in details) {
    await this.editField(field, details[field]);
  }
};

methods.editField = async function (field, data) {
  this[field] = data;
  return await this.save();
};
module.exports = model('Links', linksSchema);
/**
 *
 * ===============================================================================
 *                            To update handles
 * ===============================================================================
 *
 * client exists in the collection
 *
 * query Links collection using the client_id and update
 *
 * Successfully updated
 */
