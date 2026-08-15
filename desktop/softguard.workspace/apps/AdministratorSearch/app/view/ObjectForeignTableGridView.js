Ext.define('AdministratorSearch.view.ObjectForeignTableGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.objectforeigntablegridview',
    title : 'Data Applicacion',
    autoHeight : true,
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    plugins: [
        Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 2
        })
    ],
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    columns : [
        {
            xtype : 'gridcolumn',            
            header : 'Valor a mostrar',
            dataIndex : 'NameText',
            editor: {
                xtype: 'textfield',
                allowBlank: false
            },
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Código / Clave',
        	dataIndex : 'Name',
            editor: {
                xtype: 'textfield',
                allowBlank: false
            },
            flex: 1
		}



    ],
    
    initComponent: function () {
       
       
                        
        this.callParent(arguments);   
        
        this.onSelectChange = function (selModel, selections) {
            this.down('[action="delete"]').setDisabled(selections.length == 0);
        };
        //this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
        
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                  {
                    iconCls: 'icon-add',
                    action: 'add',
                    scope: this,
                    text: 'Nuevo'
                                          
                },{
                    iconCls: 'save',
                    text: 'Guardar',
                    scope: this,
                    action: 'save'
                },'-', {
                    iconCls: 'icon-delete',
                    text: 'Eliminar',
                    disabled: true,
                    action: 'delete'
                }
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
    } 
});