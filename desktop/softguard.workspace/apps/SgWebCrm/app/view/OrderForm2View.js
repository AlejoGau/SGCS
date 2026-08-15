Ext.define('SGWebCrm.view.OrderForm2View', {
    extend : 'Ext.form.Panel',
    alias : ['widget.orderform2view'],
    title : 'Order',
    frame : false,
    
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    autoScroll:true,
    bodyPadding : 5,    
    fieldDefaults : {
        labelWidth : 100,
        labelAlign: 'left', 
        editable:false
    },
	items : [
        //{xtype:'hiddenfield', name:'DateCreated'},
        {xtype:'textfield',fieldLabel:'Id', name:'Id', hidden: true},
        {xtype:'textfield',fieldLabel:'Nombre', name:'Name'},
        {xtype:'textfield',fieldLabel:'Cuit', name:'Cuit'},
        {xtype:'textfield',fieldLabel:'Email', name:'Email'},
        {xtype:'textfield',fieldLabel:'Teléfono', name:'HomePhone'},
        {xtype:'textfield',fieldLabel:'Celular xxxxx', name:'MobilePhone'},
        {
            xtype: 'fieldset',
            title: 'Condiciones comerciales',
            collapsible: true,
            collapsed: true,
            layout: 'anchor',
            margin: '0 0 10 0',
            items: [
                {
                    xtype:'htmleditor',
                    //fieldLabel:'Comentarios', 
                    name:'DiscountDescription',
                    shrinkWrap: false,
                    anchor: '100%'
                },{
                    xtype: 'box'
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Dirección',
            collapsible: true,
            collapsed: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'combo',
                    name: 'Country',
                    itemId: 'comboPais',
                    queryMode: 'local',
                    valueField: 'Id',
                    displayField:'Name',
                    lastQuery: '',
                    fieldLabel: 'País'
                },{
                    xtype: 'combo',     
                    name: 'State',
                    itemId: 'comboProvincia',
                    fieldLabel: 'Estado',
                    queryMode: 'local',
                    valueField: 'Id',
                    displayField:'Name',
                    lastQuery: '',
            	},
                //{xtype:'textfield',fieldLabel:'Pais', name:'Country'},
                //{xtype:'textfield',fieldLabel:'Povincia', name:'State'},
                {xtype:'textfield',fieldLabel:'Ciudad', name:'City'},
                {xtype:'textfield',fieldLabel:'Calle y número', name:'Address'},
                {xtype:'textfield',fieldLabel:'Cod. Postal', name:'ZipCode'}
            ]
        },
        {
            xtype:'orderitemsearchview', 
            itemId:'orderitemsearchview', 
           // recordOrganizacion: this.up('orderform2view').recordOrganizacion,
            flex: 1, 
            margin: '5 0 0 0',
            minHeight:300
        },
        {
            xtype: 'fieldset',
            title: 'Estado',
            collapsible: true,
            collapsed: true,
            layout: 'anchor',
            items: [
                /*{
                    name: 'Status',
                    fieldLabel:'Estado',
                    xtype: 'combo',
                    allowBlank: false,
                    store: 'Common.store.OrderItemStatusStore',
                    queryMode: 'local',
                    displayField: 'Name',
                    valueField: 'Value'
                },*/
                {
                    xtype : 'datefield',
                    disabled: false,
                    fieldLabel: 'Cierre',
            		name : 'ForecastDate',
                    itemId: 'forecastdate',
                    //plugins: ['clearbutton'],
    				allowBlank : true
    			},
                {
                    xtype:'htmleditor',
                    fieldLabel: getLocale('Comentarios'), 
                    name:'Description',
                    anchor: '100%'
                },{
                    xtype: 'box'
                }
            ]
        }
    ],
    setRecord: function(record){
        this.record = record;
        this.down('orderitemsearchview').record = record;
    },
	initComponent : function() {
		this.callParent();
        
        if (this.record){
             this.setRecord(this.record);
        }
        
        var view = this
        
        view.down('#orderitemsearchview').recordOrganizacion = view.recordOrganizacion
        
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
                    scope: this,
                    action: 'delete'
                },"->",{
                        xtype: 'button',
                        text: 'Enviar por mail',
                        itemId:'enviarpormail',
                        iconCls: 'icon-email'
                },'-',{
                    iconCls: 'icon-printer',
                    text: 'Imprimir',
                    tooltip: getLocale('Imprimir cotizacion'),
                    handler: function(btn) {
                        var view = btn.up('orderform2view');
                        var record = view.record;
                        var tabpanel = view.up('tabpanel');
                        var title = getLocale('Comprobante cotización')+' ('+record.get('Id')+')';
                        var mytab = tabpanel.down('[title="' + title + '"]');
                        if (!mytab) {
                                 
                            var newTab = Ext.widget('orderprintview',{
                                iconCls: 'icon-printer',
                                record: record,
                                title: title,
                                closable: true,
                                objectId: record.get('Id'),
                                translate: false,
                                closeAction: 'destroy',
                                recordOrganizacion:view.recordOrganizacion
                            });
                            
                           
                            // agrego la paleta creada
                            tabpanel.add(newTab);
                            tabpanel.setActiveTab(newTab);
                        }
                    }
                }
            ]
         }); 
         this.addDocked(toolbar);
	} 

});