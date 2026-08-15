Ext.define('Trackguard.view.RestriccionFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.restriccionformview'],
    preventHeader: true,
    frame: true,
    border : 0,
    autoScroll: true,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 100,
        enforceMaxLength: true
    },
    items : [
        {
            xtype:'textfield',
            name:'Name',
            fieldLabel:'Nombre'
        },
        {
            xtype: 'fieldset',
            title:'Dispositivo 1',
            layout: 'hbox',
            margin:'0 0 10 0',
            items:[
                    {
                        xtype:'button',
                        text     : 'Seleccione una cuenta',
                        iconCls: 'icon-find',
                        itemId: 'seleccionarcuentareceptora',
                        margin:'0 10 0 0'
                    },{
                        xtype:'button',
                        text     : '',
                        iconCls: 'icon-cancel',
                        itemId: 'sacarcuenta',
                        hidden:true,
                        margin:'0 5 0 0',
                        listeners: {
                            click: function(button) {
                         		button.up('restriccionformview').down('#idcuentareceptora').setValue('')
                                button.up('restriccionformview').down('#nombrecuentareceptora').setValue('')
                                button.hide()
            				}
            			}
                    },{
                        xtype:'displayfield',                                    
                        itemId: 'nombrecuentareceptora',
                        name:'nombrecuentareceptora'
                    },{
                        xtype:'displayfield',
                        hidden:true,                                    
                        itemId: 'idcuentareceptora',
                        name:'idcuentareceptora'
                    }
            ]
        
        },{
            xtype: 'fieldset',
            title:'Dispositivo 2',
            layout: 'hbox',
            margin:'0 0 10 0',
            items:[
                    {
                        xtype:'button',
                        text     : 'Seleccione una cuenta',
                        iconCls: 'icon-find',
                        itemId: 'seleccionarcuentamonitoreada',
                        margin:'0 10 0 0'
                    },{
                        xtype:'button',
                        text     : '',
                        iconCls: 'icon-cancel',
                        itemId: 'sacarcuenta',
                        hidden:true,
                        margin:'0 5 0 0',
                        listeners: {
                            click: function(button) {
                         		button.up('restriccionformview').down('#idcuentamonitoreada').setValue('')
                                button.up('restriccionformview').down('#nombrecuentamonitoreada').setValue('')
                                button.hide()
            				}
            			}
                    },{
                        xtype:'displayfield',                                    
                        itemId: 'nombrecuentamonitoreada',
                        name:'nombrecuentamonitoreada'
                    },{
                        xtype:'displayfield',
                        hidden:true,                                    
                        itemId: 'idcuentamonitoreada',
                        name:'idcuentamonitoreada'
                    }
            ]
        
        },
        {
            xtype:'numberfield',
            fieldLabel:'Distancia mínima (metros)',
            itemId:'distancia'
        }
        
        
        
        
    ],

	initComponent : function() {
		this.callParent();
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-table-save',
                    text: 'Guardar',
                    scope: this,
                    action: 'save',
                    formBind: true
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
	} // cierro init
});