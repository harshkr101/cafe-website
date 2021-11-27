const uniqid = require('uniqid');
const  {promisify} = require('util');
const  fs = require('fs');
const  readdirAsync = promisify(fs.readdir);
const  readFileAsync = promisify(fs.readFile);
const  writeFileAsync = promisify(fs.writeFile);

const updateItems = async (req, res) =>{
    try {
        const email = req.params.email,
            title = req.params.title,
            action = req.params.action;
        let data = require('../data');
        switch (action) {
            case 'ADD':
                if (data[email].currentItems[title]) {
                    data[email].currentItems[title]++;
                } else {
                    data[email].currentItems[title] = 1;
                }
                break;
            case 'SUB':
                if (data[email].currentItems[title] > 1) {
                    data[email].currentItems[title]--;
                } else {
                    delete data[email].currentItems[title];
                }
                break;
            case 'ZERO':
                delete data[email].currentItems[title];
                break;
        }
        await writeFileAsync('../data.json', JSON.stringify(data));
        res.status(200).send({msg: 'Items we\'re updated'});
    } catch (e) {
        res.status(500).send({msg: e.message});
    }
}

const newOrder = async (req,res) => {
    try {
        const email = req.params.email,
            payment = req.body.payment,
            items = req.body.items,
            total = req.body.total,
            totalPrice = req.body.totalPrice,
            orderId = uniqid(),
            date = Date.now();
        let data = require('../data');
        if (data[email]) {
            data[email].orders[orderId] = {
                total: total,
                totalPrice: totalPrice,
                payment: payment,
                items: items,
                date: date
            };
            data[email].currentItems = {};
            await writeFileAsync('../data.json', JSON.stringify(data));
            res.status(200).send({msg: 'Order successfully placed', data: data[email], orderId: orderId, date: date});
        } else {
            res.status(500).send({msg: `Error placing order`});
        }
    } catch (e) {
        res.status(500).send({msg: e.message});
    }
};

module.exports = {
    updateItems,
    newOrder
}