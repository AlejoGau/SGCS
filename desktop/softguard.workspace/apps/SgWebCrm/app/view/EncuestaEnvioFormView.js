Ext.define('SGWebCrm.view.EncuestaEnvioFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.encuestasenvioformview'],
    preventHeader: true,
    frame: true,
    border : 0,
    autoScroll: true,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 100,
        enforceMaxLength: true,
        anchor : '100%',
    },
    items : [
        {
            xtype:'selecterfield',
            itemId:'dealer',
            simpleSelect: false,
            config: {
                disponible: [{
                    title:'Smartpanics disponibles',
                    field:'_nombreCuenta',
                    searchField:'cue_cnombre'
                },{
                    title:'Telefono',
                    field:'Telefono',
                    searchField:'Telefono'
                }],
                selecionado: [{
                    title:'Smartpanics seleccionados',
                    field:'_nombreCuenta'
                },{
                	title:'Telefono',
                    field:'Telefono'
                }],
                valueField:'Id',
                prefijoParaFiltro:'o',
                modelItems: 'SGWebCrm.model.SmartPanicSearchModel'
                    
            },
            title:'Smartpanics'
        
        },{
            xtype:'selecterfield',
            itemId:'encuesta',
            simpleSelect: true,
            config: {
                disponible: {
                    title:'Encuesta',
                    field:'enc_name',
                    searchField:'o.[enc_name]'
                },
                selecionado: {
                    title:'Encuesta',
                    field:'enc_name'
                },
                valueField:'Id',
                prefijoParaFiltro:'o',
                modelItems: 'SGWebCrm.model.p_encuestasSearchModel'
                    
            },
            title:'Encuesta'
        
        }
        
    ],
    bbar:["->",{
        text:'Enviar',
        itemId:'enviar'
    }],
	initComponent : function() {
		this.callParent();
        
       
        
	} // cierro init
});