Ext.define('AdministratorSearch.view.CuentasEnFallaTstGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.cuentaenfallotstgridview'],
    autoHeight : true,
    selModel: Ext.create('Ext.selection.CheckboxModel'),
       
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    columns : [
        {
            xtype : 'gridcolumn',            
            header : 'Cuenta',
        	dataIndex : '_fullname',
            flex: 1
		}
    ],
    
    initComponent: function () {
        this.onSelectChange = function (selModel, selections) {
            this.down('#reiniciar').setDisabled(selections.length == 0);
        };

        //this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
        this.callParent(arguments);    

        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });

        this.addDocked(pagingtoolbar);
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-lightning-go',
                    text: 'Restaurar',
                    action: 'reiniciar',
                    itemId:'reiniciar',
                    disabled: true,
                    scope: this
                },"-",{
                    text : 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 280,
                        items: [
                            {
                                xtype: 'panel',
                                bodyPadding: 5,
                                items: [
                                    {
                                        xtype:'container',
                                        layout:'hbox',
                                        margin:'0 0 5 0',
                                        items:[
                                            {
                                                xtype:'textfield',
                                                fieldLabel:'Dealer',
                                                itemId:'dealer',
                                                width:100,
                                                labelWidth:60,
                                                enforceMaxLength: true,
                                                maxLength: 3,
                                            },{
                                                xtype:'textfield',
                                                fieldLabel:'Cuenta',
                                                itemId:'cuenta',
                                                width:160,
                                                labelWidth:50,
                                                enforceMaxLength: true,
                                                maxLength: 4,
                                            }
                                        ]
                                    },{
                                        xtype:'textfield',
                                        fieldLabel:'Nombre',
                                        itemId:'nombre',
                                        labelWidth:60,
                                        width:260
                                    }
                                ]
                            }
                        ]
                    }
    			},{
                    iconCls: 'icon-find',
                    text: 'Buscar',
                    scope: this,
                    action: 'search'
                },'-',
                {
                    iconCls: 'icon-find',
                    text: 'Todos',
                    scope: this,
                    action: 'getall'
                }
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
    } 
});