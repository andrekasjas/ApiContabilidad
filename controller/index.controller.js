const { Pool } = require('pg');
const path = require('path');
const fs = require('fs-extra');
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '1923',
    database: 'contabilidad',
    port: '5432'
});

const getAdministradores = async(req, res) => {
    const response = await pool.query('select * FROM administrador');
    res.status(200).json(response.rows);
}
const getAdministrador = async(req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM administrador WHERE adm_id = $1 ', [id]);
    res.status(200).json(response.rows);
}
const getVentas = async(req, res) => {
    const response = await pool.query('select *, EXTRACT(MONTH FROM ven_fech) from venta order by ven_fech desc');
    res.status(200).json(response.rows);
}
const getVenta = async(req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM venta WHERE ven_id = $1 ', [id]);
    res.status(200).json(response.rows);
}
const getGastoseinversion = async(req, res) => {
    const response = await pool.query('select *, EXTRACT(MONTH FROM gas_fech) from gastosoinversion');
    res.status(200).json(response.rows);
}
const getProductos = async(req, res) => {
    const response = await pool.query('SELECT * FROM producto');
    res.status(200).json(response.rows);
}
const getGastoeinversion = async(req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM gastosoinversion WHERE gas_id = $1 ', [id]);
    res.status(200).json(response.rows);
}
const getProducto = async(req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM producto WHERE pro_id = $1 ', [id]);
    res.status(200).json(response.rows);
}

const deleteAdministrador= async(req, res) => {
    const id = req.params.id;
    const response = await pool.query('DELETE FROM administrador WHERE adm_id = $1', [id]);
    res.status(200).json(`administrador ${id} eliminado ok`);
}
const deleteVenta = async(req, res) => {
    const id = req.params.id;
    const response = await pool.query('DELETE FROM venta WHERE ven_id = $1', [id]);
    res.status(200).json(`venta ${id} eliminado ok`);
}
const deleteProducto = async(req, res) => {
    const id = req.params.id;
    const response = await pool.query('DELETE FROM producto WHERE pro_id = $1', [id]);
    res.status(200).json(`producto ${id} eliminado ok`);
}
const deleteGastooinversion = async(req, res) => {
    const id = req.params.id;
    const response = await pool.query('DELETE FROM gastosoinversion WHERE gas_id = $1', [id]);
    res.status(200).json(`${id} eliminado ok`);
}

const updateAdministrador = async(req, res) => {
    const id = req.params.id;
    const { adm_val} = req.body;
    const response = await pool.query('UPDATE administrador set adm_val=adm_val + $1 WHERE adm_id = $2', [adm_val,id])
    console.log(response);
    res.json('administrador update');
}
const updateVenta = async(req, res) => {
    const id = req.params.id;
    const { ven_val, ven_cant, ven_tot, ven_gas, ven_gan} = req.body;
    const response = await pool.query('UPDATE venta set ven_val=$1, ven_cant=$2, ven_tot=$3, ven_gas=$4, ven_gan=$5 WHERE ven_id = $6', [ven_val, ven_cant, ven_tot, ven_gas, ven_gan,id])
    console.log(response);
    res.json('venta update');
}
const updateProducto = async(req, res) => {
    const id = req.params.id;
    const { pro_nom, pro_valc, pro_valv, pro_gan, pro_cant } = req.body;
    const response = await pool.query('UPDATE producto set pro_nom=$1, pro_valc=$2, pro_valv=$3, pro_gan=$4, pro_cant=$5 WHERE pro_id = $6', [pro_nom, pro_valc, pro_valv, pro_gan, pro_cant, id])
    console.log(response);
    res.json('producto update');
}
const updateGastosoinversion = async(req, res) => {
    const id = req.params.id;
    const { gas_nom, gas_val, gas_des } = req.body;
    const response = await pool.query('UPDATE gastosoinversion set gas_nom = $1, gas_val = $2, gas_des=$3 WHERE gas_id = $4', [gas_nom, gas_val, gas_des, id])
    res.json(id);
}



const createFoto = async(req, res) => {
    const { ima_pro_id } = req.body;
    const path = req.file.path;
    const response = await pool.query('INSERT INTO image (ima_path, ima_pro_id) VALUES ($1, $2)', [path, ima_pro_id]);
    res.json({
        message: 'imagen cargada',
        body: {
            user: { path, ima_pro_id }
        }
    })
}
const getFotos = async(req, res) => {
    const response = await pool.query('SELECT * FROM image');
    res.status(200).json(response.rows);
}
const getFoto = async(req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT i.* FROM image as i, producto WHERE ima_pro_id = $1 AND ima_pro_id = pro_id', [id]);
    res.status(200).json(response.rows);
}
const deleteFoto = async(req, res) => {
    const id = req.params.id;
    const responsed = await pool.query('SELECT * FROM image WHERE ima_id = $1 ', [id]);
    const response = await pool.query('DELETE FROM image WHERE ima_id = $1', [id]);
    if(response)
        if(responsed)
            await fs.unlink(path.resolve(responsed.rows[0].ima_path)) 
    res.status(200).json(`imagen ${id} eliminado ok`);
}

const createAdministrador= async(req, res) => {
    const { adm_nom, adm_val} = req.body;
    const response = await pool.query('INSERT INTO administrador (adm_nom, adm_val) VALUES ($1, $2)', [adm_nom, adm_val]);
    console.log(response);
    res.json({
        message: 'administrador agregado ok',
        body: {
            user: { adm_nom, adm_val }
        }
    })
}
const createVenta= async(req, res) => {
    const { ven_val, ven_cant, ven_tot, ven_fech, ven_gas, ven_gan, ven_pro_id, ven_adm_id  } = req.body;
    const response = await pool.query('INSERT INTO venta (ven_val, ven_cant,ven_tot, ven_fech, ven_gas, ven_gan, ven_pro_id, ven_adm_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [ven_val, ven_cant, ven_tot, ven_fech, ven_gas, ven_gan, ven_pro_id, ven_adm_id]);
    console.log(response);
    res.json({
        message: 'venta agregado ok',
        body: {
            user: { ven_val, ven_cant, ven_tot, ven_fech, ven_gas, ven_gan, ven_pro_id, ven_adm_id }
        }
    })
}
const createProducto= async(req, res) => {
    const { pro_id, pro_nom, pro_valc, pro_valv, pro_gan, pro_cant } = req.body;
    const response = await pool.query('INSERT INTO producto (pro_id, pro_nom, pro_valc, pro_valv, pro_gan, pro_cant) VALUES ($1, $2, $3, $4, $5, $6)', [pro_id, pro_nom, pro_valc, pro_valv, pro_gan, pro_cant]);
    console.log(response);
    res.json({
        message: 'producto agregado ok',
        body: {
            user: { pro_id, pro_nom, pro_valc, pro_valv, pro_gan, pro_cant }
        }
    })
}
const createGastooinversion= async(req, res) => {
    const { gas_tip, gas_nom, gas_val, gas_fech, gas_des, gas_adm_id  } = req.body;
    const response = await pool.query('INSERT INTO gastosoinversion (gas_tip, gas_nom, gas_val, gas_fech, gas_des, gas_adm_id) VALUES ($1, $2, $3, $4, $5)', [gas_tip, gas_nom, gas_val, gas_fech, gas_des, gas_adm_id]);
    console.log(response);
    res.json({
        message: 'agregado ok',
        body: {
            user: { gas_tip, gas_nom, gas_val, gas_fech, gas_des }
        }
    })
}


module.exports = {
    getVentas, getProductos, getVenta, getProducto, getGastoseinversion, getGastoeinversion, getAdministrador, getAdministradores,
    createVenta, createProducto, createGastooinversion, createAdministrador,
    deleteVenta, deleteProducto, deleteGastooinversion, deleteAdministrador,
    updateProducto, updateVenta, updateGastosoinversion, updateAdministrador,

    createFoto, getFoto, getFotos, deleteFoto, 
}