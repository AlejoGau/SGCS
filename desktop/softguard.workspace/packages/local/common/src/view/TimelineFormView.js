//MIGRADO2024
Ext.define('Common.view.TimelineFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.timelineformview'],
    title : 'Evento',
    preventHeader: true,
    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'start'
    },
    showtoolbar: false,
    autoScroll: true,    
    fieldDefaults : {
        labelWidth : 100,
        anchor : '100%',
		labelAlign: 'left'					
	},
    //bodyPadding :0,
	items : [
        {
            xtype : 'displayfield',
            //name : 'fecha',
            name : 'etl_tFechaHora',
            renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s'),
            fieldLabel : 'Fecha',
            itemId:'etl_tFechaHora'
    	},
        {
            xtype : 'displayfield',
            //name : 'usuario',
            name : 'ope_clogin',
            fieldLabel : 'Usuario',
            itemId:'ope_clogin'
        },
        {
            xtype : 'displayfield',
            name: 'etl_cObservacion',
            // cambio el name para respetar nueva tabla de timeline
            //name : 'comentario',
            fieldLabel: 'Comentario',
            renderer: Ext.util.Format.nl2br,
            fieldBodyCls: "align-top",
            //labelWidth: 0,
            flex: 1,
            itemId:'etl_cObservacion'
        }
    ],
	initComponent : function() {
		this.callParent();
	} // cierro init
});