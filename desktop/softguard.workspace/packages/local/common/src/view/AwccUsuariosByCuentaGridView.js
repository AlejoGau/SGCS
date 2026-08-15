//MIGRADO2024
Ext.define('Common.view.AwccUsuariosByCuentaGridView', {
    extend:'Ext.grid.GridPanel',
    alias: 'widget.awccusuariosgridview',
    itemId: 'gridawccuser',
    title: 'Listado de Usuarios',
    autoHeight: true,
    columns: [{
                xtype:'actioncolumn', 
                width:30,
                items: [{
                    iconCls: 'icon-vcard',
                    tooltip: getLocale('Asignar cuentas'),
                    handler: function(grid, rowIndex, colIndex,item, event) {
                        var view = grid.up('awccusuariosgridview');
                        var rec = grid.getStore().getAt(rowIndex);
                        view.fireEvent('agregarcuentas',rec,view);
                    }
                }]
            },{
                xtype:'actioncolumn', 
                width:30,
                items: [{
                    iconCls: 'icon-userEdit',
                    tooltip: getLocale('Modificar datos'),
                    handler: function(grid, rowIndex, colIndex,item, event) {
                        var view = grid.up('griduser');
                        var rec = grid.getStore().getAt(rowIndex);
                        view.fireEvent('objectedit',rec,view);
                    }
                }]
            },
            {
                xtype:'actioncolumn', 
                width:30,
                items: [{
                    iconCls: 'icon-email',
                    tooltip: getLocale('Enviar email'),
                    handler: function(grid, rowIndex, colIndex,item, event) {
                        var view = grid.up('awccusuariosgridview');
                        var rec = grid.getStore().getAt(rowIndex);
                        view.fireEvent('enviarmail',rec,view);
                    }
                }]
            },
            {
                xtype: 'gridcolumn',
                header: 'Nombre',
                sortable: true,
                dataIndex: "nombre_mostrar",
                width: 100
            },
            {
                xtype: 'gridcolumn',
                header: 'Login',
                sortable: true,
            	dataIndex: "nombrelogin",
                width: 250
            }
        ],
        initComponent: function () {

               
            this.onSelectChange = function (selModel, selections) {
                this.down('button[action=delete]').setDisabled(selections.length === 0);
            };
            
            
            var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
               items: [
                   {
            		xtype : 'combo',
        			fieldLabel : 'Usuario',
                    labelWidth: 55,
                    plugins: ['clearbutton'],
                    editable: true,
                    forceSelection: true,
                    itemId: 'usuarioCombo',
                    queryMode: 'local',
        			displayField : 'nombrelogin',
        			valueField : 'nombrelogin',
                    hidden:true
        
        		},
                {
                    iconCls: 'icon-add',
                    text: 'Asignar',
                    action: 'add',
                    itemId: 'asignar',
                    hidden:true
                }, {
                    iconCls: 'icon-delete',
                    text: 'Eliminar',
                    disabled: true,
                    action: 'delete'
                },'-', {
                    iconCls: 'icon-user-add',
                    text: 'Nuevo usuario',
                    action: 'createUser'
                }]
             }); 
             
         this.callParent(arguments);
         this.addDocked(toolbar);
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
        } // cierro init
});