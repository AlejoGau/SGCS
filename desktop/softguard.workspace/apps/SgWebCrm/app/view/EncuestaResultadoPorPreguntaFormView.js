Ext.define('SGWebCrm.view.EncuestaResultadoPorPreguntaFormView', {
    extend : 'Ext.form.Panel',
    alias : 'widget.encuestaresultadoporpregunta',
    preventHeader: true,
    frame: true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 500,
        enforceMaxLength: true
    },
    
    items:[],    
        
    initComponent : function() {
    	this.callParent();
                
    }

});