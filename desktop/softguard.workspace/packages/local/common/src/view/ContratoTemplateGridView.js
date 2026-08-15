//MIGRADO2024
Ext.define('Common.view.ContratoTemplateGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.contratotemplategridview'],
    title : 'Contratos Templates',
    autoHeight : true,    
    activeHelp:true,
    columns : [{
            xtype:'actioncolumn',
            header: '',
            width: 30,
            items: [
                {
                    iconCls: 'icon-page-white-code',
                    tooltip: 'Modificar',
                    handler: function(grid, rowIndex, colIndex,item, event) {
                        var view = grid.up('contratotemplategridview');
                        var rec = grid.getStore().getAt(rowIndex);
                        view.fireEvent('objectedit',rec,view);
                    }
                }
            ]
        },{
            xtype : 'gridcolumn',
            header : 'Descripcion',
            dataIndex : 'tmp_asunto',            		
            flex:1
		},{
            xtype : 'gridcolumn',
        	header : 'Organizacion',
            dataIndex : 'org_cnombre',                	
            flex:1
		},{
            xtype : 'gridcolumn',
            header : 'Tipo',
            dataIndex : 'tmp_itipo',                	
            flex:1,
            renderer: function (value) {
                if(value == 1) {
                    return getLocale('Contrato')
                } else if(value == 3) {
                    return getLocale('Header')
                } else if(value == 2) {
                    return getLocale('Aviso')
                }
            }
		}
    
    ],
    
    initComponent: function () {
        this.callParent(arguments); 
       
        this.view.targetTab = this.targetTab;
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls : 'icon-page-white-add',
                    text    : 'Nuevo template de aviso',
                    itemId: 'newAviso',
                    action  : 'newAviso',
                    hidden:true
                },{
                    iconCls : 'icon-page-white-add',
                    text    : 'Nuevo template de contrato',
                    itemId: 'new',
                    action  : 'new'
                },{
                    iconCls : 'icon-page-white-add',
                    text    : 'Nuevo header de contrato',
                    itemId: 'newheader',
                    action  : 'newheader'
                },"-",{
                    text : 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 300,
                        layout: 'fit',
                        items: [
                                {
                                    xtype: 'form',
                                    bodyPadding: 5,
                                    fieldDefaults:{
                                        labelAlign:'left', 
                                        labelWidth:100  
                                    },
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                           xtype:'textfield',
                                           fieldLabel:'Template',
                                           itemId:'nombre'
                                        },{
                                           xtype:'textfield',
                                           fieldLabel:'Descripción template',
                                           itemId:'asunto'
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
        
        this.addDocked(pagingtoolbar);
    } 
});