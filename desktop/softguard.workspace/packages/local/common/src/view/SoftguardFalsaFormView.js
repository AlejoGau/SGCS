//MIGRADO2024
Ext.define('Common.view.SoftguardFalsaFormView', {
    extend:'Ext.panel.Panel',
    alias : 'widget.formfalsetest',
    title: 'Falsas / Test',
    bodyPadding: 0,
    autoScroll: true,
    layout: 'anchor',
    dockedItems: [{
        xtype: 'toolbar',
        items: [
         {
            text: 'Guardar',
            iconCls: 'save',
            action: 'save'
        }
        ]// cierro items
    }], // cierro dockeditems
    items: [
   
        {
            xtype: 'form',
			itemId: 'formfalse',
            //title: 'Control de Falsas Alarmas',
            collapsible: true,
            //layout: 'anchor',
			preventHeader: false,
            bodyPadding: 5,
            hidden:true,
            items:[
                    {
                        xtype: 'panel',
                        padding: '5 5 5 5',
                        header: {
                            title: 'Control de Falsas Alarmas',
                        },    
                             
                        items: [
                            {
                                xtype: 'container',
                                layout: 'hbox',
                                
                                items:[
                                    {
                                        xtype: 'numberfield',
                                        fieldLabel: 'Cantidad Máxima',
                                        name:'fal_nmargen'
                                    },
                                    {
                                        xtype: 'numberfield',
                                        fieldLabel: 'En meses',
                                    
                                        name:'fal_nmeses',
                                        margin: '0 0 5 5',
                                        flex:1
                                    }
                                    
                                ]
                            },
                            {
                                xtype: 'container',
                                layout: 'anchor',
                                items : [
                                    {
                                        xtype: 'textarea',
                                  
                                        name:'fal_mnota',
                                        fieldLabel: 'Mensaje de alerta'
                                    }                                    
                                ]
                            }
                            
                        ]
                    },
                    {
                        xtype: 'panel',
                        padding: '5 5 5 5',
                        layout: 'anchor',
                        header: {
                            title: 'Control de eventos permitidos'
                        },
                        items:[
                            {
                                xtype: 'numberfield',
                                emptyText: getLocale('No controla'),
                                name: 'cue_iExcesoLimiteDia',
                                anchor:'40%',
                                fieldLabel: 'Límite por día',
                                minValue : 0,
                                maxValue : 500
                            },{
                                xtype: 'numberfield',
                                emptyText: getLocale('No controla'),
                                anchor: '40%',
                                name: 'cue_iExcesoLimiteHora',
                                fieldLabel: 'Límite por hora',
                                minValue : 0,
                                maxValue : 100
                            }                            
                        ]
                
                    }
            ]
        }
		
        
		
	
    ]// cierro items
           
});