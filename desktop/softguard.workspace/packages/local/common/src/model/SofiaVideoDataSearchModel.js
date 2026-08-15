Ext.define('Common.model.SofiaVideoDataSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        { name: 'id', type: 'int' },
        { name: 'source', type: 'string' },
        { name: 'iidCuenta', type: 'int' },
        { name: 'link', type: 'string' },
        { name: 'link_dss', type: 'string' },
        { name: 'video_id', type: 'int' },
        { name: 'czona', type: 'string' },
        { name: 'launch', type: 'int' },
        { name: 'descripcion', type: 'string' },
        { name: 'nombre', type: 'string' },
        { name: 'plataforma', type: 'int' }
    ],

    proxy: {
        type: 'rest',
        url: '/Rest/search/SofiaVideoLinks',
        appendId: true,
        reader: {
            type: 'json',
            rootProperty: 'rows',
            totalProperty: 'total'
        }
    }
});
