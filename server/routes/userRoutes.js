import express from 'express';
import { userUpdate,userDelete, getUser} from '../controller/user.js';
const router = express.Router();

//get user
router.get("/:id",getUser)

//update user
router.put('/:id', userUpdate);

//delete user
router.delete("/:id",userDelete)

export default router;
