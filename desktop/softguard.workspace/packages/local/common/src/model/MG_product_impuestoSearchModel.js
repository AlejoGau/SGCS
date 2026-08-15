//MIGRADO2024
Ext.define( 'Common.model.MG_product_impuestoSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [ {
        name: 'Id',
        type: 'int'
    },
        {
            name: 'Name',
            type: 'string'
        },
        {
            name: 'ObjectTypeId',
            type: 'int',
            defaultValue: 3107
        },
        {
            name: 'ObjectTypeName',
            type: 'string',
            defaultValue: 'MG_product_impuesto'
        },
        { name: 'mpi_idproduct', type: 'int' },
        { name: 'mpi_impidkey', type: 'int' },
         {name:'nombreOrganizacion',type:'string'},
         {name:'imp_cdescripcion',type:'string'},
        {
            name: '_imp_cdescripcion', type: 'string', convert: function( v, rec ) {
                return rec.get( 'imp_cdescripcion' ) + ' (' + rec.get( 'nombreOrganizacion' ) + ')';
            }
        }
    ],
    proxy: {
        type: 'rest',
        reader: {
            type: 'json',
            rootProperty: 'rows',
            totalProperty: 'total'
        },
        url: '/Rest/search/MG_product_impuesto',
        appendId: true
    }
});