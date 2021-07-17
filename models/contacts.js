const mongoose = require('mongoose');

const { Schema, Types, model } = mongoose;
const { ObjectId } = Types;

const contactsSchema = new Schema({
  client_id: {
    type: ObjectId,
    required: true,
    ref: 'Auth',
  },
  tel: {
    type: String,
    required: false,
    minlength: 9,
    maxlength: 11,
  },
});

const { statics, methods } = contactsSchema;

statics.createEntry = async function (data) {
  const details = { ...data };
  details.client_id = data.id;
  return await this.create(details);
};

statics.findByClient_id = async function (client_id) {
  return await this.findOne({ client_id: client_id });
};

methods.editContacts = async function (details) {
  for (const entry in details) {
    await this.editField(entry, details[entry]);
  }
};

methods.editField = async function (entry, data) {
  this[entry] = data;
  return await this.save();
};

module.exports = model('Contacts', contactsSchema);
