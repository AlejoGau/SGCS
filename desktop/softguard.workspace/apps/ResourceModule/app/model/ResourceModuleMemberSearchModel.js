Ext.define('ResourceModule.model.ResourceModuleMemberSearchModel', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'Id', type: 'int' },
        { name: 'Name', type: 'string' },
        { name: 'rmb_cNombre', type: 'string' },
        { name: 'rmb_cNumeroIdentificacion', type: 'string' },
        { name: 'rmb_iLegajo', type: 'string' },
        { name: 'rmb_cNacionalidad', type: 'string' }
    ],
    proxy: {
        type: 'rest',
        url: '/rest/ResourceModuleMember/',
        appendId: true,
        reader: {
            type: 'json',
            root: 'rows',
            totalProperty: 'total'
        }
    }

});