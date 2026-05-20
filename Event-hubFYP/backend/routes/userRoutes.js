import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUserProfile, getSingleUser} from "../controllers/userController.js";

import {verifyToken, verifyAdmin} from "../utils/verifyToken.js";
const router = express.Router();

router.put("/:id", verifyToken, updateUserProfile);
router.delete("/:id",verifyToken, deleteUserProfile);
router.get("/", verifyAdmin, getUserProfile);

router.get("/:id", verifyToken, getSingleUser);

router.post('/register', registerUser);
router.post('/login', loginUser);
// router.post('/login', loginUser);

router.post('/admin/route', verifyToken, verifyAdmin, (req, res) => {
    // Only executed if the user is authenticated and has admin role
    res.status(200).json({ success: true, message: 'Admin route accessed successfully' });
});


export default router;


