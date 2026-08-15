Ext.define('SGWebCrm.view.ProductFormView', {
    extend : 'Ext.form.Panel',
    alias : 'widget.productformview',
    title : 'Propiedades',
    bodyPadding : 5,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    fieldDefaults : {
		labelWidth : 120,
		anchor : '100%',
		labelAlign: 'left'					
	},
	items : [
        {
            xtype : 'displayfield',
            name : 'Id',    
            hidden: true,
            fieldLabel : 'Id'
		},{
            xtype: 'container',
            layout: 'hbox',
            defaults: {
                labelWidth: 55
            },
            items: [
                {
                    xtype: 'textfield',
                    name: 'Code',
                    hidden: false,
                    allowBlank : true,
                    fieldLabel: 'Código'
                },
                {
                	xtype : 'textfield',
                    name : 'Name',
        			fieldLabel : 'Nombre',
                    itemId: 'nameText',	
                    flex: 1,
                    margin: '0 0 0 15',
        			allowBlank : false,
                    validator: function(field){
                        if(!field.includes(',')){
                            return true
                        }
                        return 'No puede crear productos con caracteres especiales en el nombre'
                    }
        		}
            ]
		},
        {
            xtype: 'fieldset',
            layout: {
                type: 'hbox',
                pack: 'start'
            },
            title: 'Valores',
            defaults: {
                labelWidth: 45,
                margin: '0 0 0 15'
            },
            items: [
                {
                    xtype: 'numberfield',
                    name: 'Cost',
                    minValue: 0,
                    flex: 1,
                    hideTrigger:true,
                    fieldLabel: 'Costo',
                    hidden:true
                },{
                    xtype: 'numberfield',
                    name: 'Price',
                    minValue: 0,
                    flex: 1,
                    hideTrigger:true,
                    fieldLabel: 'Precio'
                },{
                    xtype: 'numberfield',
                    name: 'VAT',
                    minValue: 0,
                    flex: 1,
                    decimalPrecision: 1,
                    hideTrigger:true,
                    fieldLabel: 'Impuesto'
                }
            ]
        },
        /*{
            xtype: 'textareafield',
            name: 'SmallComment',
            anchor: '100%',
            fieldLabel: 'Condiciones'
		},*/{
            xtype: 'textfield',
            name: 'MetaDescription',
            hidden: true,
            fieldLabel: 'Meta - Descripción'
		},{
            xtype: 'textfield',
            name: 'MetaKeywords',
            hidden: true,
            fieldLabel: 'Meta - Palabra clave'
		},{
            xtype: 'htmleditor',
            name: 'Body',
            flex: 1,
            margin: '0 0 10 0',
            fieldLabel: 'Descripción'
        }
    ],
	initComponent : function() {
		this.callParent();
        //('objectchanged');
        // agrego la toolbar
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'save',
                    text: 'Guardar',
                    scope: this,
                    action: 'save'
                },{
                    iconCls: 'icon-delete',
                    text: 'Eliminar',
                    action: 'delete',
                    itemId: 'delete',
                    scope: this                    
                },{
                    text : 'Rubros',
                    itemId:'rubros',
        			menu: {
                        xtype: 'menu',
                        layout: 'fit',
                        width: 420,
                        items: {
                            xtype : 'taxonomiestree',
                            record: this.record,
                            preventHeader: true,
                            rootId: 7,
                            height: 400,
                            width: 414
                        }
                    }
				},/*,{
                    iconCls : 'icon-Attach-add',
                    text    : 'Nuevo Adjunto',
                    action  : 'newAttach',
                    scope   : this 
                }*/
            ]// cierro items
         }); 
         this.addDocked(toolbar);
	} // cierro init
});