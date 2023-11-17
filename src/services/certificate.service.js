const certificateRepo = require("../repos/certificate_repo");

// Create a certificate
const createCertificate = async (certificateData) => {
  try {
    const certificate = await certificateRepo.createCertificate(
      certificateData
    );
    return certificate;
  } catch (error) {
    // Handle errors, e.g., log the error or throw a custom error
    throw new Error("Error creating certificate");
  }
};

// Update a certificate by ID
const updateCertificate = async (certificateId, certificateData) => {
  try {
    const updatedCertificate = await certificateRepo.updateCertificate(
      certificateId,
      certificateData
    );
    return updatedCertificate;
  } catch (error) {
    throw error;
  }
};

// Delete a certificate by ID
const deleteCertificate = async (certificateId) => {
  try {
    await certificateRepo.deleteCertificate(certificateId);
  } catch (error) {
    // Handle errors, e.g., log the error or throw a custom error
    throw error;
  }
};

// Service function to get all certificates
const getAllCertificates = async () => {
  try {
    // Use the certificateRepo function to fetch all certificates
    return await certificateRepo.getAllCertificates();
  } catch (error) {
    throw error; // You can handle the error as needed
  }
};

// Service function to get certificates by user ID
const getUserCertificates = async (userId) => {
  try {
    // Use the certificateRepo function to fetch certificates by user ID
    return await certificateRepo.getCertificatesByUserId(userId);
  } catch (error) {
    throw error; // You can handle the error as needed
  }
};

module.exports = {
  createCertificate,
  updateCertificate,
  deleteCertificate,
  getUserCertificates,
  getAllCertificates,
};
