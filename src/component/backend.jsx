import { doc, setDoc } from "firebase/firestore"; 
import { createUserWithEmailAndPassword, signOut} from "firebase/auth";
import { db, auth } from "../component/firebase";

// Function to add or edit a user
export const addOrEditUser = async (formData, editUserId, setUsers, users, toggleModal, setError) => {
    const { university, email, dateRegistered, status } = formData;
    const userType = 2;  // Assuming userType is fixed for all users

    try {
        if (editUserId) {
            // Update existing user
            await setDoc(doc(db, "users", editUserId), { userType, university, email, dateRegistered, status });
            setUsers(users.map(user => (user.id === editUserId ? { ...user, university, email, dateRegistered, status } : user)));
        } else {
            // Create new user
            const userCredential = await createUserWithEmailAndPassword(auth, email, "Default@123");
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                userType,
                university,
                email,
                dateRegistered,
                status,
                username: email.split('@')[0],
            });

            setUsers([...users, { id: user.uid, university, email, dateRegistered, status, username: email.split('@')[0] }]);
        }

        toggleModal();  // Close modal after successful submission
    } catch (err) {
        console.error("Error saving user: ", err);
        setError(err.message);  // Set error message for display
    }
};

export const logoutUser = async () => {
    await signOut(auth);
};


export const createUser = async (formData) => {
  try {
    // Create user with email and password in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
    const user = userCredential.user;

    // Save user data to Firestore
    await setDoc(doc(db, 'users', user.uid), {
      userType: formData.userType,
      firstName: formData.firstName,
      middleName: formData.middleName,
      lastName: formData.lastName,
      gender: formData.gender,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      province: formData.province,
      city: formData.city,
      fileUpload: formData.fileUpload ? formData.fileUpload.name : null, // Save file name or handle file upload to storage
    });

    return user;
  } catch (error) {
    console.error('Error during user creation:', error);
    throw error;
  }
};

