//MIGRADO2024
Ext.define('Common.model.TablaEventosFeriadosModel', {
    extend: 'Ext.data.Model',
    idProperty : 'Codigo',
    fields: [
        {name:'Codigo',type:'string',convert:function(v, record){
            return v.trim();
        }}
        ,'Descripcion', 'FechaDesde', 'HoraDesde', 'FechaHasta', 'HoraHasta'],
    proxy: { type: 'rest', 
    	 url: '/Rest/Tablas/EventosFeriados/' }
});