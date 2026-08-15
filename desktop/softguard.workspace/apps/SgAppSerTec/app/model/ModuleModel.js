//MIGRADO2024
Ext.define('SgAppSerTec.model.ModuleModel', {
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
       /* Prueba para ver si logro ver el dato */
       {name: 'folder', type: 'string' }
   ]
});
