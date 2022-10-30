import setUserToFirestore from "../firebase/firestore/SetUser";
export default (code, userData, setMessage) => {
  // Get confirmationResult
  let confirmationResult = window.confirmationResult;
  console.log(userData);

  // Let's check if code is same as code we got in mobile message
  confirmationResult
    .confirm(code)
    .then(async (result) => {
      // Get user credentials
      const { user } = result;
      // Set user data to firestore
      await setUserToFirestore(user.uid, {
        displayName: `${userData.firstName} ${userData.lastName}`,
        spelledName:
          `${userData.firstName} ${userData.lastName}`.split(" ") || null,
        gender: userData.gender,
        birthDate: userData.birthDate,
        number: userData.number,
        email: userData.email || null,
        photoURL: null,
      });
      // Display successfully message
      setMessage({
        type: "success",
        value: "User uspjesno kreiran",
      });
    })
    .catch((error) => {
      // Display error
      setMessage({
        type: "error",
        value: error.message,
      });
    });
};
