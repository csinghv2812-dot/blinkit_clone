const express = require ('express')
const{
    createAdmin,
    getAllAdmin,
    getAdminById,
    updateAdmin,
    deleteAdmin,
    loginAdmin,
} = require ('../Controller/AdminController');

const router = express.Router();

router.post('/register',createAdmin);
router.post('/login',loginAdmin);
router.get('/',getAllAdmin);
router.get('/:id',getAdminById);
router.put('/:id',updateAdmin);
router.delete('/:id',deleteAdmin);

module.exports = router;