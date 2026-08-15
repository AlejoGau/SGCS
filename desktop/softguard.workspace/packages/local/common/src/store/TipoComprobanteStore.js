//MIGRADO2024
Ext.define('Common.store.TipoComprobanteStore', {
    extend: 'Ext.data.Store',
    model: 'Common.model.IdNameModel',
    storeId: 'TipoComprobanteStore',    
    data: [
        {
            Id:0,
            Name:getLocale('No definido')
        },{
            Id:1,
            Name:getLocale('Factura de Venta')
        },{
            Id:2,
            Name:getLocale('Nota Debito')
        },{
            Id:3,
            Name:getLocale('Ajuste Debito')
        },{
            Id:4,
            Name:getLocale('Orden Pedido')
        },{
            Id:5,
            Name:getLocale('Factura de compra')
        },{
            Id:6,
            Name:'-----'
        },{
            Id:7,
            Name:getLocale('Recibo')
        },{
            Id:8,
            Name:getLocale('Nota Credito')
        },{
            Id:9,
            Name:getLocale('Ajuste Credito')
        }
    ]
})