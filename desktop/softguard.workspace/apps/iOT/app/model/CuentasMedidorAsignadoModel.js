Ext.define('iOT.model.CuentasMedidorAsignadoModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        { name: 'Id', type: 'int' },
        { name: 'ped_idCta', type: 'int' },
        { name: 'ped_cUri', type: 'string' },
        { name: 'ped_cDeviceID', type: 'string' },
        { name: 'ped_cLabel', type: 'string' },
        { name: 'ped_cName', type: 'string' },
        { name: 'ped_iVarCount', type: 'string' },
        { name: 'cue_clinea', type: 'string' },
        { name: 'cue_cnombre', type: 'string' },
        { name: 'cue_ncuenta', type: 'string' },
        {
            name: 'ped_tCreatedAt',
            type: 'date', dateFormat: 'c'
        },
    ],
    proxy: {
        type: 'rest',
        reader: {
            type: 'json',
            rootProperty: 'rows',
            totalProperty: 'total'
        },
        url: '/Rest/search/CuentasMedidorAsignadoSearch',
        appendId: false
    }
});