const mongoose = require('mongoose');

const { Schema, Types } = mongoose;
const { ObjectId } = Types;

const clientSchema = new Schema({
  client_id: {
    type: ObjectId,
    required: true,
    ref: 'Auth',
  },
  fullname: {
    type: String,
    required: true,
    maxlength: 40,
    minlength: 3,
  },
  profile: {
    type: String,
    required: false,
  },
  resume: {
    type: String,
    required: false,
    default: 'Data\\docs\\magdaline C.V-56289g52w22.pd',
  },
  Bio: {
    type: String,
    maxlength: 100,
    minlength: 5,
  },
  About: {
    type: String,
    maxlength: 1200,
    minlength: 5,
  },
  links_id: {
    type: ObjectId,
    required: true,
    ref: 'Links',
  },
  p_id: {
    type: Number,
    default: 0,
  },
});

const { statics, methods } = clientSchema;

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

statics.createClient = async function (data) {
  return await this.create(data);
};
module.exports = mongoose.model('Client', clientSchema);

/**
 * ===============================================================================
 *                           To add Client
 * ===============================================================================
 *
 * If client not exist in the collection
 *
 * create a  new entry/instance in the handles collection and add client_id
 * returning the id.
 *
 * create a new entry/instance in the client collection adding client_id, Links_id
 * and any new entry into the collection
 *
 * Successfully added into the client Collection
 *
 * ===============================================================================
 *                           To Update Details info, About etc
 * ===============================================================================
 *
 * client exists in the collection
 * query client collection using the client_id  and Update
 *
 * Successfully updated
 *
 * ===============================================================================
 *                            To update handles
 * ===============================================================================
 *
 * client exists in the collection
 *
 * query client collection using the client_id
 * returning links_id
 *
 * query Links collection with the links_id and update
 *
 * Successfully updated
 */
