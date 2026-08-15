Ext.define('Common.view.EncuestasGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.encuestasview',
    title : 'Encuestas',
    autoHeight : true,    
    stateful: false,
    columns : [{
            xtype:'actioncolumn',
            header: '',
            width: 45,
            items: [
                {
                    iconCls: 'icon-delete',
                    tooltip: getLocale('Eliminar'),
                    handler: function(grid, rowIndex, colIndex,item, event) {
                        Ext.MessageBox.confirm(getLocale('Delete'), getLocale('Esta a punto de borrar una encuesta, esta seguro ?'), function(btn){
                           if(btn === 'yes'){
                                var view = grid.up('encuestasview');
                                var rec = grid.getStore().getAt(rowIndex);
                                view.fireEvent('deleteitem',rec,view);
                           }
                           else{
                              //some code
                           }
                        });
                    }
                },
                {
                    iconCls: 'icon-script-link',
                    tooltip: getLocale('Mostrar link a formulario'),
                    handler: function(grid, rowIndex, colIndex,item, event) {
                        var rec = grid.getStore().getAt(rowIndex);
                        var _link = window.location.origin + '/handler/encuestaHTML?Id='+rec.get('Id')+'&imei={imei}&lat={latitud}&lng={longitud}&repetir=1&evento=SP7&oauth_token=8CDCD4D5-8284-48C0-B75A-4D3AAF379C87';
                        var win = Ext.create( 'Ext.window.Window', {
                            title: getLocale('Link a formulario'),
                            height: 150,
                            width: 600,
                            layout: 'fit',
                            items:{
                                xtype: 'form',
                                    items: {
                                    //fieldLabel: 'Link formulario',
                                    itemId: 'formlink',
                                    //labelWidth: 120,
                                    xtype: 'textarea',
                                    value: _link
                                }
                            }
                            ,
                            tbar: [
                                { 
                                    xtype: 'button',
                                    iconCls: 'icon-page-white-copy',
                                    text: 'Copiar al portapapeles',
                                    handler: function(btn){
                                        try {
                                            var el = win.down('#formlink').inputEl;
                                            el.focus();
                                            el.dom.select();
                                            var successful = document.execCommand('copy');
                                        }
                                        catch (error){
                                            notyError('Portapapeles no disponible');
                                        }
                                    }
                                }
                            ]
                        }).show();
                    }
                }
            ]
        },{
            xtype : 'gridcolumn',
            header : 'Nombre',
            dataIndex : 'enc_name',        			
            flex:1
        },{
            xtype : 'gridcolumn',
            header : 'Descripcion',
            dataIndex : 'enc_descripcion',        			
            flex:1            
		},{
            xtype : 'gridcolumn',
            header : 'Estado',
            dataIndex : 'enc_status',            		
            flex:1,
            renderer: function (value,obj,record) {
                return record.get('_enc_status')
            }
		}
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
                    iconCls: 'icon-table-add',
                    text: 'Nuevo',
                    scope: this,
                    action: 'add'
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
                                        
                                        xtype: 'combo',
                                        queryMode: 'local',
                                        itemId: 'fieldName',
                                        editable: false,
                                        store: [
                                            ['enc_descripcion', getLocale('Descripcion')],
                                            ['enc_name', getLocale('Nombre')]
                                        ],
                                        fieldLabel: 'Campo'                
                                    },{
                                        xtype: 'textfield',
                                        itemId: 'query',
                                        fieldLabel: 'Valor'
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
                },"->",{
                    iconCls: 'icon-ipod-cast',
                    text: 'Enviar encuesta',
                    itemId:'enviarencuesta'
                }
            ]// cierro items
        }); 
        this.addDocked(toolbar);
    } 
});
