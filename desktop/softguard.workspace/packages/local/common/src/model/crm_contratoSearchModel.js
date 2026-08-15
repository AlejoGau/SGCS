Ext.define( 'Common.model.crm_contratoSearchModel', {
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
            defaultValue: 3148
        },
        {
            name: 'ObjectTypeName',
            type: 'string',
            defaultValue: 'Order'
        },
        { name: 'cnt_estado', type: 'int' },
        { name: 'cnt_fechaalta', type: 'date' },
        { name: 'cnt_fechavto', type: 'date' },
        { name: 'cnt_formapago', type: 'int' },
        { name: 'cnt_idcliente', type: 'int' },
        { name: 'cnt_metadata', type: 'string' },
        { name: 'cnt_org_fc', type: 'int' },
        { name: 'con_cdescripcion', type: 'string' },
        { name: 'org_cnombre', type: 'string' },
        { name: 'nombreOrganizacion', type: 'string' },
        { name: 'idOrganizacion', type: 'string' },
        { name: 'cnt_tmp_id', type: 'int' },
        { name: 'cnt_dinamico', type: 'int', defaultValue: 0 },
        { name: 'cnt_cantidad_auto', type: 'int', defaultValue: 0 }

    ],


    proxy: {
        type: 'rest',
        reader: {
            type: 'json',
            rootProperty: 'rows',
            totalProperty: 'total'
        },
        url: '/Rest/search/crm_contrato',
        appendId: false
    }
});
