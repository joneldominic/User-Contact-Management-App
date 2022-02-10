const notificationMessage = {
  invalidCredential: {
    color: "error",
    message: "Incorrect Credentials. Please try again.",
  },
  connectionError: {
    color: "error",
    message: "Something went wrong. Please check your connection.",
  },
  invalidToken: {
    color: "error",
    message: "Invalid Token. Please Sign In.",
  },
  unknownError: {
    color: "error",
    message: "Something went wrong. Please try again.",
  },
  invalidUserDetails: {
    color: "error",
    message: "Invalid User Details. Please try again.",
  },
  duplicateUsername: {
    color: "error",
    message: "Username Already Exists. Please try another one.",
  },
  invalidContactDetails: {
    color: "error",
    message: "Invalid Contact Details. Please try again.",
  },
  registrationSuccessful: {
    color: "success",
    message: "User Registered Successfully.",
  },
  contactAddSuccessful: {
    color: "success",
    message: "Contact Added Successfully.",
  },
  contactDeleteSuccessful: {
    color: "success",
    message: "Contact Deleted Successfully.",
  },
  contactUpdateSuccessful: {
    color: "success",
    message: "Contact Updated Successfully.",
  },
  sessionTimeout: {
    color: "warning",
    message: "Session Timeout. Please Sign In again.",
  },
};

export default notificationMessage;
