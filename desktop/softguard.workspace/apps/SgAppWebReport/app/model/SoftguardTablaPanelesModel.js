Ext.define('SgAppWebReport.model.SoftguardTablaPanelesModel', {
    extend: 'Ext.data.Model',
    fields: [
        'pan_ccodigo', 'pan_cdescripcion', 'pan_mobservacion','pan_nesgprs',
        {
            name: 'pan_rpmidkey',
            type: 'int'
        }
    ],
    proxy: { 
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        type: 'rest',
        url: '/Rest/t_paneles/'  	 
    }
});