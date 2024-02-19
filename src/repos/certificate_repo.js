const Certificate = require("../models/Certificate");

// Create a certificate
const createCertificate = async (certificateData) => {
  try {
    const certificate = await Certificate.create(certificateData);
    return certificate;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Update a certificate by ID
const updateCertificate = async (certificateId, certificateData) => {
  try {
    const [rowsUpdated] = await Certificate.update(certificateData, {
      where: { id: certificateId },
    });

    if (rowsUpdated === 0) {
      // Handle the case where no rows were updated (certificate not found).
      throw new Error("Certificate not found");
    }

    const updatedCertificate = await Certificate.findByPk(certificateId);

    return updatedCertificate;
  } catch (error) {
    throw error; // You can handle the error at a higher level, if needed.
  }
};

// Delete a certificate by ID
const deleteCertificate = async (certificateId) => {
  try {
    const deletedRows = await Certificate.destroy({
      where: { id: certificateId },
    });

    if (deletedRows === 0) {
      throw new Error("Certificate not found");
    }
  } catch (error) {
    throw new Error("Error deleting certificate");
  }
};

// Get a certificate by ID
const getCertificateById = async (certificateId) => {
  try {
    const certificate = await Certificate.findByPk(certificateId);
    if (!certificate) {
      throw new Error("Certificate not found");
    }
    return certificate;
  } catch (error) {
    throw error;
  }
};

// Get all certificates (you can add filtering options as needed)
const getAllCertificates = async () => {
  try {
    const certificates = await Certificate.findAll();
    return certificates;
  } catch (error) {
    throw new Error("Error retrieving certificates");
  }
};

// Get all certificates of a user by user_id
const getCertificatesByUserId = async (userId) => {
  try {
    const certificates = await Certificate.findAll({
      where: {
        user_id: userId,
      },
    });
    return certificates;
  } catch (error) {
    throw new Error("Error retrieving certificates for the user");
  }
};

module.exports = {
  createCertificate,
  updateCertificate,
  deleteCertificate,
  getCertificateById,
  getAllCertificates,
  getCertificatesByUserId,
};
