Ext.define('Common.view.AvisoProgramadoGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.avisoprogramadogridview'],
    title : '',
    autoHeight : true,
    //selModel: Ext.create('Ext.selection.CheckboxModel'),
    columns : [{
                        xtype:'actioncolumn',
                        header: '',
                        width: 60,
                        items: [
                            {
                                iconCls: 'icon-delete',
                                tooltip: 'Eliminar',
                                handler: function(grid, rowIndex, colIndex,item, event) {
                                    var view = grid.up('avisoprogramadogridview');
                                    var rec = grid.getStore().getAt(rowIndex);
                                    view.fireEvent('objectdelete',rec,view);
                                }
                            },{
                                iconCls: 'icon-clock',
                                tooltip: 'Modificar',
                                handler: function(grid, rowIndex, colIndex,item, event) {
                                    var view = grid.up('avisoprogramadogridview');
                                    var rec = grid.getStore().getAt(rowIndex);
                                    view.fireEvent('objectedit',rec,view);
                                }
                            }
                        ]
                    },{
                        xtype : 'gridcolumn',
                        header : 'Nombre',
                        dataIndex : 'Name',                    
                        flex:1,
                        sortable : true
            		},{
                        xtype : 'datecolumn',
                        header : 'Fecha',
                        dataIndex : 'prg_prgdatetime',  
                        format: 'd/m/Y',
                        flex:1,
                        sortable : true
            		},{
                        xtype : 'gridcolumn',
                        header : 'Estado',
                        dataIndex : 'prg_estado',                          
                        flex:1,
                        renderer: function (value) {
                            console.log(arguments)
                            if(value == 1) {
                                return '<img src="/resources/global/images/icons/tick.png" />'
                            } else {
                                return getLocale('Pendiente');
                            }
                        }
                        
                	}
    ],
    
    initComponent: function () {
        this.callParent(arguments);        
        this.view.targetTab = this.targetTab;
        
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [ {
                    text : 'Nuevo aviso',
        			iconCls : 'icon-add',
                    action: 'new'
        		},{
                    text : 'Templates',
            		iconCls : 'icon-plugin',
                    action: 'template'
        		}
            ]// cierro items
         }); 

         this.addDocked(toolbar);
        

    },
    
});