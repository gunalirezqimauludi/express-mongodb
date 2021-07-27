const express = require('express');
const router = express.Router();

const client = require('./connection');
const ObjectId = require('mongodb').ObjectId;

router.get('/', async (_, res) => {
    res.send('ExpressJS - MongoDB Native Driver')
});

router.get('/products', async (_, res) => {
    try {
        const db = await client.db('learning');
        const data = await db.collection('products').find().toArray();
        res.json({
            status: 'success',
            message: 'list product',
            data: data,
        });
    } catch (error) {
        res.json({
            status: 'error',
            message: 'database connection failed.',
        });
    }
});

router.get('/product/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const db = await client.db('learning');
        const data = await db.collection('products').findOne({
            _id: ObjectId(id)
        });

        res.json({
            status: 'success',
            message: 'single product',
            data: data,
        });
    } catch (error) {
        console.log(error);
        res.json({
            status: 'error',
            message: 'database connection failed.',
        });
    }
});

router.post('/product', async (req, res) => {
    const { name, price, stock, status } = req.body;

    try {
        const db = client.db('learning');
        const result = await db.collection('products').insertOne({
            name: name,
            price: price,
            stock: stock,
            status: status,
        });

        if (result.acknowledged) {
            res.json({
                status: 'success',
                message: 'add product successfully.',
            });
        } else {
            res.json({
                status: 'warning',
                message: 'add product failed.',
            });
        }
    } catch (error) {
        res.json({
            status: 'error',
            message: 'database connection failed.',
        });
    }
});

router.put('/product/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price, stock, status } = req.body;

    try {
        const db = client.db('learning');
        const result = await db.collection('products').updateOne({
            _id: ObjectId(id)
        }, {
            $set: {
                name: name,
                price: price,
                stock: stock,
                status: status,
            }
        });

        if (result.acknowledged) {
            res.json({
                status: 'success',
                message: 'change product successfully.',
            });
        } else {
            res.json({
                status: 'warning',
                message: 'change product failed.',
            });
        }
    } catch (error) {
        res.json({
            status: 'error',
            message: 'database connection failed.',
        });
    }
});

router.delete('/product/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const db = client.db('learning');
        const result = await db.collection('products').deleteOne({
            _id: ObjectId(id)
        });

        if (result.acknowledged) {
            res.json({
                status: 'success',
                message: 'delete product successfully.',
            });
        } else {
            res.json({
                status: 'warning',
                message: 'delete product failed.',
            });
        }
    } catch (error) {
        res.json({
            status: 'error',
            message: 'database connection failed.',
        });
    }
});

module.exports = router;