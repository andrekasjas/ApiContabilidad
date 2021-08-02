const { Router } = require('express');
const router = Router();
const { getVentas, getProductos, getProducto, getVenta, deleteVenta, deleteProducto, updateVenta, updateProducto, createVenta, createProducto, getGastoseinversion, getGastoeinversion, createGastooinversion, deleteGastooinversion, updateGastosoinversion, createFoto, getFotos, getFoto, deleteFoto, getAdministrador, getAdministradores, createAdministrador, deleteAdministrador, updateAdministrador } = require('../controller/index.controller');
const multer = require('../libs/multer');


router.get('/administradores', getAdministradores);
router.get('/administrador/:id', getAdministrador);
router.get('/ventas', getVentas);
router.get('/venta/:id', getVenta);
router.get('/productos', getProductos);
router.get('/producto/:id', getProducto);
router.get('/gastosoinversion', getGastoseinversion);
router.get('/gastooinversion/:id', getGastoeinversion);

router.post('/administrador', createAdministrador);
router.post('/venta', createVenta);
router.post('/producto', createProducto);
router.post('/gastooinversion', createGastooinversion);


router.delete('/administrador/:id', deleteAdministrador);
router.delete('/venta/:id', deleteVenta);
router.delete('/producto/:id', deleteProducto);
router.delete('/gastooinversion/:id', deleteGastooinversion);

router.put('/administrador/:id', updateAdministrador);
router.put('/producto/:id', updateProducto);
router.put('/venta/:id', updateVenta);
router.put('/gastooinversion/:id', updateGastosoinversion);

router.post('/foto', multer.single('image'), createFoto);
router.get('/fotos', getFotos);
router.get('/foto/:id', getFoto);
router.delete('/foto/:id', deleteFoto);



module.exports = router;