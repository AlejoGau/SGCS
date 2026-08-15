Ext.define('FileManager.model.ModuleModel', {
    extend: 'Ext.data.Model', // Updated for Ext JS 7.1
    fields: [
        { name: 'text', type: 'string' },
        { name: 'iconCls', type: 'string' },
        { name: 'leaf', type: 'boolean' },
        { name: 'url', type: 'string' },
        { name: 'class', type: 'string' },
        { name: 'view', type: 'string' },
        { name: 'profile', type: 'string' },
        { name: 'closable', type: 'boolean' },
        { name: 'viewConfig', type: 'string' },
        { name: 'opened', type: 'boolean' },
        { name: 'folder', type: 'string' }
    ]
});