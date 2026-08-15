//MIGRADO2024
Ext.define('Common.view.p_controlAcceso_AutorizacionGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.p_controlacceso_autorizacionview'],
    title : 'Templates',
    autoHeight : true,
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    activeHelp:true,
  
   
    viewConfig: {
     getRowClass: function(record, index, rowParams, ds) {
        
         
         return record.get('estadoStyle')
     }
  },
    columns : [
       {
            xtype:'actioncolumn',
            iconToolTips: [
                {tip: 'Editar autorización'}
            ],
            width:30,
            items: [{
                iconCls: 'icon-table-edit',
                //tooltip: getLocale('Editar'),
                getTip: function(value, metadata, record, a, b, c, grid) {
                    return metadata.column.config.iconToolTips[0];
                },
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('p_controlacceso_autorizacionview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectedit',rec,grid);
                }
            }]
       },{
            xtype : 'gridcolumn',            
            header : 'Usuario',
            dataIndex : 'usu_cnombre',
            flex: 1
    	},/*{
            xtype : 'gridcolumn',            
            header : 'Autorizado',
            dataIndex : 'caa_idautorizado',           
            flex: 1
        },*//*{
            xtype : 'gridcolumn',            
            header : 'Tipo',
        	dataIndex : 'caa_tipo',
            flex: 1
		},*/{
            xtype : 'gridcolumn',            
            header : 'Fecha desde',
            dataIndex : 'caa_fechadesde',
            flex: 1,
            renderer: function (value,obj, record) {
                return value?Ext.Date.format(new Date(value), 'd-m-Y G:i:s'): ''
            }
        },{
            xtype : 'gridcolumn',            
            header : 'Fecha hasta',
            dataIndex : 'caa_fechahasta',
            flex: 1,
            renderer: function (value,obj, record) {
                return value?Ext.Date.format(new Date(value), 'd-m-Y G:i:s'): ''
            }
        },{
            xtype : 'gridcolumn',            
            header : 'Dia',
        	dataIndex : 'caa_diasemana',
            flex: 1,
            renderer: function (value,obj, record) {
                if(value == 1) {
                    return getLocale('Lunes')
                } else if (value == 2) {
                    return getLocale('Martes')
                } else if (value == 3) {
                    return getLocale('Miercoles')
                } else if (value == 4) {
                    return getLocale('Jueves')
                } else if (value == 5) {
                    return getLocale('Viernes')
                } else if (value == 6) {
                    return getLocale('Sabado')
                } else if (value == 7) {
                    return getLocale('Domingo')
                }
            }
		},{
            xtype : 'gridcolumn',            
            header : 'Hora desde',
        	dataIndex : 'caa_horadesde',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Hora hasta',
        	dataIndex : 'caa_horahasta',
            flex: 1
		}/*,{
            xtype : 'gridcolumn',            
            header : 'Codigo',
            dataIndex : 'caa_codigo',
            flex: 1
		}*/
        
    ],
    
    initComponent: function () {
       
        
      
       
                
        this.callParent(arguments);     
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
               {
                    text : 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 320,
                        items: [
                                {
                                    xtype: 'panel',
                                    bodyPadding: 5,
                                    items: [
                                        {
                                            xtype : 'datefield',
                                            fieldLabel: 'Fecha desde',
                                            itemId:'caa_fechadesde',
                                            format : 'd-m-Y'
                                        },{
                                            xtype : 'datefield',
                                            fieldLabel: 'Fecha hasta',
                                            itemId:'caa_fechahasta',
                                            format : 'd-m-Y'
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