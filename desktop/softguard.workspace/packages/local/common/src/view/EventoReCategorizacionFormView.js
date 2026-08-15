//MIGRADO2024
Ext.define('Common.view.EventoReCategorizacionFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.eventorecategorizacionformview'],
    preventHeader: true,
    frame: true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 100,
        enforceMaxLength: true
    },
    items : [
            {
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                margin:'0 0 5 0',
                flex: 1,
                items:[
                        {
                            xtype: 'textareafield',
                            itemId: 'obsfield',
                            emptyText: getLocale('Ingrese un nuevo comentario.'),
                            flex: 1
                        },{
                            xtype: 'button',
                            iconCls: 'icon-disk',
                            action: 'agregar-observacion'
                        }
                ]
            
            },{
                
                fieldLabel: 'Predefinidas',
                xtype: 'combobox',
                itemId: 'observaciones',
                store: "TablasObservacionesStore",
                multiselect : false,
                editable : false,
                queryMode: 'local',
                anchor: '100%',
                displayField: 'obs_cdescripcion',
                lastQuery: '',
                valueField: 'obs_mobservacion',
                forceSelection : true
            },
            {
                xtype: 'combobox',
                fieldLabel: 'Categorización',
                itemId: 'categorizacion',
               // store: "TablasResolucionesStore",
                multiselect : false,
                editable : false,
                queryMode: 'local',
                anchor: '100%',
                displayField: 'res_cdescripcion',    							
                valueField: 'res_ccodigo',
                lastQuery: '',
                allowBlank: false,
                name:'rec_idResolucion',
                forceSelection : true
            },
            {
                xtype: 'combobox',
                fieldLabel: 'Resolución',
                itemId: 'resolucion',                               
                anchor: '100%',
                store: "TablasCategorizacionStore",
                multiselect : false,
                editable : false,
                queryMode: 'local',
                displayField: 'cat_cDescripcion',        						
                valueField: 'cat_cCodigo',
                lastQuery: '',
                //plugins: ['clearbutton'],
                name:'rec_cCategorizacion',
                forceSelection : true
            }
        
    ],
	initComponent : function() {
		this.callParent();
        
       var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
               {
                    text: 'Guardar',
                    iconCls: 'save',
                    action: 'save',
                    itemId:'save',
                    hidden:true
                }
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
	} // cierro init
});