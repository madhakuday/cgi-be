const {
  createCertificate,
  updateCertificate,
  deleteCertificate,
  getUserCertificates,
} = require("../services/certificate.service");
const {
  uploadImageToAWS,
  deleteImageFromAWS,
} = require("../services/aws.service"); // Import your AWS service
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../helper/response.handler");
const {
  getCertificateById,
  getAllCertificates,
} = require("../repos/certificate_repo");

const createCertificateController = async (req, res) => {
  try {
    const {
      cgi_no,
      colour,
      weight,
      shape_cut,
      sr_dr,
      reflective_index,
      specific_gravity,
      inclusion,
      indian_name,
    } = req.body;
    const image = req.file; // Multer will store the uploaded file in req.file
    console.log(req.user);
    const { id } = req.user;
    console.log(id);
    console.log(image);

    // Upload the image to AWS or another storage service
    const generatedImageLink = await uploadImageToAWS(image); // Replace with your image upload service
    console.log(generatedImageLink);

    const certificate = await createCertificate({
      user_id: id,
      cgi_no,
      colour,
      weight,
      shape_cut,
      sr_dr,
      reflective_index,
      specific_gravity,
      inclusion,
      indian_name,
      certificate_image: generatedImageLink, // Use the generated image link
    });

    return sendSuccessResponse(res, certificate);
  } catch (error) {
    // Handle errors
    console.error(error);
    return sendErrorResponse(res, "Error creating certificate", 500);
  }
};

// Update a certificate
const updateCertificateController = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      cgi_no,
      colour,
      weight,
      shape_cut,
      sr_dr,
      reflective_index,
      specific_gravity,
      inclusion,
      indian_name,
      user_id, // Check if user_id is in req.body
    } = req.body;

    const image = req.file;

    // Check if the certificate with the given ID exists
    const existingCertificate = await getCertificateById(id);

    if (!existingCertificate) {
      return sendErrorResponse(res, "Certificate not found", 404);
    }

    // Check if the role is "user"
    if (req.user.role === "user") {
      // For users, make sure the user_id matches their ID
      if (req.user.id !== existingCertificate.user_id) {
        return sendErrorResponse(
          res,
          "Certificate doesn't exist in your collection",
          403
        ); // Forbidden
      }
    }

    // Update the certificate payload based on user_id and image presence
    const certificatePayload = {
      cgi_no,
      colour,
      weight,
      shape_cut,
      sr_dr,
      reflective_index,
      specific_gravity,
      inclusion,
      indian_name,
    };

    // Add user_id to the payload if it's present in req.body
    if (user_id) {
      certificatePayload.user_id = user_id;
    }

    // Check if a new image is provided
    if (image) {
      // Delete the previous image from AWS
      const previousImage = existingCertificate.certificate_image
        .split("/")
        .pop();
      await deleteImageFromAWS(previousImage);

      // Upload the new image to AWS and get its URL
      const imageLink = await uploadImageToAWS(image);
      certificatePayload.certificate_image = imageLink;
    }

    // Update the certificate with the new information
    await updateCertificate(id, certificatePayload);

    return sendSuccessResponse(res, "Certificate updated successfully");
  } catch (error) {
    console.log(error);
    return sendErrorResponse(res, error.message, 500);
  }
};

// Delete a certificate by ID
const deleteCertificateController = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the certificate with the given ID exists
    const existingCertificate = await getCertificateById(id);
    if (!existingCertificate) {
      return sendErrorResponse(res, "Certificate not found", 404);
    }

    // Check if the role is "user"
    if (req.user.role === "user") {
      // For users, make sure the user_id matches their ID
      if (req.user.id !== existingCertificate.user_id) {
        return sendErrorResponse(
          res,
          "Certificate doesn't exist in your collection",
          403
        ); // Forbidden
      }
    }

    // Delete the image from AWS
    const imageLink = existingCertificate.certificate_image.split("/").pop();
    await deleteImageFromAWS(imageLink);

    // Delete the certificate from the database
    await deleteCertificate(id);

    return sendSuccessResponse(res, "Certificate deleted successfully");
  } catch (error) {
    console.error(error);
    return sendErrorResponse(res, error.message, 500);
  }
};

// Get certificate controller
const getCertificateController = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      // If the user is an admin, fetch all certificates
      const certificates = await getAllCertificates();
      sendSuccessResponse(res, certificates);
    } else {
      const userId = req.user.id;
      const userCertificates = await getUserCertificates(userId);
      sendSuccessResponse(res, userCertificates);
    }
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, "Error fetching certificates", 500);
  }
};

module.exports = {
  createCertificateController,
  updateCertificateController,
  deleteCertificateController,
  getCertificateController,
};
