Ext.define('iOT.model.iOT_seccionesModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'text', type: 'string'},
        {name: 'iconCls', type: 'string'},
        {name: 'leaf', type: 'bool'},
        {name: 'url', type: 'string'},
        {name: 'class', type: 'string' },
        {name: 'view', type: 'string' },
        {name: 'profile', type: 'string' },
        {name: 'closable', type: 'bool'},
        {name: 'viewConfig', type: 'string'},
        {name: 'opened', type: 'bool' },
        {name: 'folder', type: 'string' }
    ]
});
