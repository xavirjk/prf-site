const { signin } = require('../context/config');
const { Client, handles, contacts } = require('../models');
exports.postLinks = async (req, res, next) => {
  const { body, user } = req;

  const links = await handles.findByClient_id(user.id);
  if (!links) {
    res.status(404).send({ message: 'Setup profile' });
    return null;
  }
  await links.editDetails(body);
  res.status(200).send({ message: 'Links updated Successfully' });
};

exports.postContacts = async (req, res, next) => {
  const { body, user } = req;
  const contDet = await contacts.findByClient_id(user.id);
  if (!contDet) {
    res.status(404).send({ message: 'Setup profile' });
    return null;
  }
  await contDet.editContacts(body);
  res.status(200).send({ message: 'Contacts Updated Successfully' });
};
exports.postdescription = async (req, res, next) => {
  const { body, user } = req;

  const details = await Client.findByClient_id(user.id);
  if (!details) {
    res.status(404).send({ message: 'Setup profile' });
    return null;
  }
  await details.editDetails(body);
  res.status(200).send({ message: 'info Success' });
};

exports.postProfile = async (req, res, next) => {
  const { body, user } = req;
  body.id = user.id;
  const details = await Client.findByClient_id(user.id);
  console.log('det', details);
  if (!details) {
    const Links = await handles.addDetails({ id: user.id });
    const contDet = await contacts.createEntry({ id: user.id });
    body.links_id = Links.id;
    body.contacts_id = contDet.id;
    body.p_id = 0;
    await Client.addDetails(body);
    res.status(200).send({ message: 'profile setup success' });
  } else {
    await details.editDetails(body);
    res.status(200).send({ message: 'Successfully edited profile' });
  }
};

exports.postPid = async (req, res, next) => {
  const { body } = req;
  console.log('body', body);
  const details = await Client.findOne(body);
  if (!details) {
    res.status(200).send({ message: 'not available' });
    return null;
  }
  const cb = (err, token) => {
    try {
      if (err) return next(err);
      const data = {
        access: true,
        token: 'Bearer ' + token,
      };
      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  };

  return signin({ id: details.id }, cb, { expiresIn: 3600 });
};

exports.getClient = async (req, res, next) => {
  const { body, user } = req;
  const details = await Client.findById(user.id);

  if (!details) {
    res.status(200).send({ message: null });
    return null;
  } else {
    const links = await handles.findById(details.links_id);
    const contDet = await contacts.findById(details.contacts_id);
    const data = {
      fullname: details.fullname,
      links: links,
      About: details.About,
      Bio: details.Bio,
      profile: details.profile,
      resume: details.resume,
      contacts: contDet,
    };
    res.status(200).send({ message: 'success', data: data });
  }
};
