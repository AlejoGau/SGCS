//MIGRADO2024
Ext.define('Common.view.p_objetos_modificacionesGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.objectomodificacionesview'],
    title : 'Productos',
    autoHeight : true,
    //selModel: Ext.create('Ext.selection.CheckboxModel'),
    columns : [{
        	xtype : 'gridcolumn',
			header : 'Usuario pedido',
            dataIndex : 'udw_usuario',
            flex:1
		},{
            xtype : 'gridcolumn',
			header : 'Cuenta',
            dataIndex : 'pom_cueiid',
            flex:1,
            renderer: function (value, object, record) {
                return record.get('cue_clinea')+'-'+record.get('cue_ncuenta')+' '+record.get('cue_cnombre')
            }
		},{
            xtype : 'datecolumn',
			header : 'Fecha solicitud',
            dataIndex : 'pom_fechapedido'	,
            flex:1,
            renderer: function (value, object, record) {
                return Ext.Date.format(record.get('pom_fechapedido'), 'd/m/Y')
            }
		},{
            xtype : 'gridcolumn',
    		header : 'Formulario',
            dataIndex : 'pom_metadata'	,
            flex:1,
            renderer: function (value) {
                if(value){
                    var obj = Ext.JSON.decode(value)
                    if(obj && obj.form && obj.form.title) {
                        return obj.form.title
                    } else {    
                        return getLocale('No definido')
                    }
                } else {
                    return '';
                }
            }
		},{
            xtype : 'datecolumn',
    		header : 'Estado',
            dataIndex : 'pom_estado'	,
            flex:1,
            renderer: function (value, object, record) {
                var estadoStr = '';
                if(value == 1) {
                    estado = getLocale('Aceptado')
                } else if(value == 2) {
                    estado = getLocale('Rechazado')
                } else {                
                    estado = getLocale('Pendiente')                
                }
                return estado
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
                    text : 'Filtros',
                    itemId: 'filtro',
                	menu: {
                        xtype: 'menu',
                        width: 280,
                        items: [
                            {
                                xtype: 'form',
                                bodyPadding: 5,
                                defaultButton: 'cuentagridview #search',
                                items: [
                                      {
                                            xtype:'fieldset',
                                            padding:'0 0 0 0',
                                            border:0,
                                            layout:'hbox',
                                            width:270,
                                            margin:'0 0 5 0',
                                            items:[
                                                {
                                                    xtype: 'textfield',
                                                    itemId: 'dealer',
                                                    enforceMaxLength: true,
                                                    maxLength: 3,
                                                    emptyText: getLocale('Dealer'),
                                                    width:110
                                                    
                                                },{
                                                    xtype: 'textfield',
                                                    itemId: 'cuenta',
                                                    enforceMaxLength: true,
                                                    maxLength: 4,
                                                    emptyText: getLocale('Cuenta'),
                                                    width:147,
                                                    margin:'0 0 0 5'
                                                }
                                            ]
                                        },{
                                            xtype: 'textfield',
                                            itemId: 'nombre',
                                            emptyText: getLocale('Nombre cuenta'),                                            
                                            width:260
                                        }/*,{
                                            xtype: 'textfield',
                                            itemId: 'formulario',
                                            emptyText: getLocale('Formulario'),                                           
                                            width:260
                                        }*/,{
                                            xtype: 'textfield',
                                            itemId: 'usuariosolicitante',
                                            emptyText: getLocale('Usuario solicitante'),                                            
                                            width:260
                                        }, {
                                            xtype:'combo',
                                            itemId:'estado',
                                            store:[
                                                [0, getLocale('Pendiente')],
                                                [1, getLocale('Aceptado')],
                                                [2, getLocale('Rechazado')]
                                                ],
                                            value: 0,
                                            emptyText: getLocale('Estado'),             
                                        }
                                    ]
                            }
                        ]
        			}
                },{
                    text:'buscar',
                    itemId:'buscar'
                },{
                    text:'Todos',
                    itemId:'todos'
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
        
        this.addDocked(pagingtoolbar);
    } 
});