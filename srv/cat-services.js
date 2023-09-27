const cds = require('@sap/cds')
module.exports = cds.service.impl(function () {
    const { Products } = this.entities()

    this.after('each', Products, row => {
        console.log(`Read Product: ${row.ID}`)
    })

    this.after(['CREATE', 'UPDATE', 'DELETE'], [Products], async (Product, req) => {
        const header = req.data
        req.on('succeeded', () => {
            global.it || console.log(`< emitting: product_Changed ${Product.ID}`)
            this.emit('prod_Change', header)
        })
    })
    this.on('get_supplier_info', async () => {
        try {
            const db = await cds.connect.to('db')
            const dbClass = require("sap-hdbtext-promisfield")
            let dbConn = new dbClass(await dbClass.createConnection(db.options.credentials))
            const hdbext = require("@sap/hdbext")
            const sp = await dbConn.loadProcedurePromisifield(hdbext,null, 'getsupplier_info')
            const output = await dbConn.callProcedurePromisifield(sp,[])
            console.log(output.results)
            return output.results

        } catch (error) {
            console.error(error)
            return
        }
    })
})
