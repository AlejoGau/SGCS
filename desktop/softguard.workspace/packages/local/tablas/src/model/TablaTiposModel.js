Ext.define('Tablas.model.TablaTiposModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Codigo',
    fields: ['Codigo', 'Descripcion', 'UrlImagen', 'Servicio']
});