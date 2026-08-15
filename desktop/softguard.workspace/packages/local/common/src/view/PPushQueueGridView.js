//MIGRADO2024
Ext.define('Common.view.PPushQueueGridView', {
    extend : 'Ext.grid.Panel',
    alias : 'widget.ppushqueuegridview',
    autoHeight : true,
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    autoScroll : true,
    columns : [
        {
            xtype: 'datecolumn',
            dataIndex: 'ppq_fechacreacion',
            header: 'Fecha de Creacion',
            sortable: true,
            flex: 1,
            format: 'd/m/Y H:i:s'
        },{   
            xtype: 'gridcolumn',
            dataIndex : 'ppq_idcuenta',
            header : 'Cuenta',
            sortable : true,
            flex : 1,            
            renderer : function(value, metadata, record, colIndex, store, view) {
                var cuenta = record.get('clineaOrigen')+"-"+record.get('ncuentaOrigen')+" "+record.get('nombreOrigen');
                return cuenta;
            }
        },{
            xtype: 'gridcolumn',
            dataIndex: 'ppq_estado',
            header: 'Estado',
            sortable: true,
            flex: 1,
            renderer: function (value, metadata, record, colIndex, store, view) {
                var msStatus = record.get('ppq_estado');
                
                if (msStatus ==0){
                    return getLocale('Pendiente');
                }else if(value == 1) {
                    return getLocale('Enviado');
                }else if(value == 2) {
                    return getLocale('Rechazado');
                }else if(value == 3) {
                    return getLocale('Error');
                }
            }
        },{
            xtype: 'gridcolumn',
            dataIndex: 'nombreDestino',
            header: 'Nombre',
            sortable: true,
            flex: 1
        },{
            xtype: 'gridcolumn',
            dataIndex: 'telefonoDestino',
            header: 'Teléfono Destino',
            sortable: true,
            flex: 1
        },{
            xtype: 'gridcolumn',
            dataIndex: 'ppq_msg',
            header: 'Mensaje',
            sortable: true,
            flex: 2,
            renderer: function(value, metadata, record, colIndex, store, view){
                var msg = record.get('msgBody');
                if (msg != ''){
                    metadata.tdAttr = 'data-qtip="' + msg + '"';
                }
                var notificacion = Ext.JSON.decode(value);
                //console.log(notificacion.data.action);
                var action = notificacion.data.action;
                /* Guardo en el campo Action el record del mensaje */
                if (action === "INBOX_MESSAGE") {
                    var mensaje = record.get('msName');
                    return mensaje;
                }                                
            }
        }  
    ],
    
    initComponent: function () {
        this.callParent(arguments);  
        var me = this;
        
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
        
        /* Creo las opciones del combo tipo de mensaje */
        var comboSearch =  [
            ['UPDATE_LOGIN',getLocale('UPDATE_LOGIN')],
            ['INBOX_MESSAGE',getLocale('INBOX_MESSAGE')],
            ['ALARM_STOP',getLocale('ALARM_STOP')]
        ];
        
        /* Agrego el menu de filtros */
        var items= [
                {
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
                                            fieldLabel: 'Tipo de mensaje',
                                            queryMode: 'local',
                                            itemId: 'message',
                                            store: comboSearch                                                                                                       
                                        },
                                        /*{
                                            xtype: 'textfield',
                                            itemId: 'query',
                                            fieldLabel: 'Mensaje'
                                          
                                        },*/
                                        {
                                            xtype : 'datefield',
                                            fieldLabel : 'Fecha creacion',
                                            name : "fechacreacion",
                                            itemId : 'fechacreacion'			
                                        }
                                        /*,{
                                            xtype : 'datefield',
                                            fieldLabel : 'Fecha envio',
                                            itemId : 'fechaenvio',
                                            name : "fechaenvio"
                        				}*/
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
                },'->',{
                    xtype : 'button',
                    itemId : 'btnExport',
                    text: 'Exportar',
                    iconCls : 'icon-page-excel',
                    action : 'export'
                }];   
            
             
         
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: items
         });      
        
        this.addDocked(toolbar);
        
    }
});
/*,{
    xtype: 'gridcolumn',
    dataIndex: 'Id',
    header: 'Id mensaje',
    sortable: true,
    flex: 1
},{
    xtype: 'gridcolumn',
    dataIndex: 'ppq_msg',
    header: 'Mensaje',
    sortable: true,
    flex: 1,
    renderer: function(value, metadata, record, colIndex, store, view){
        var notificacion = Ext.JSON.decode(value);
        
        //console.log(notificacion.data.action);
        var action = notificacion.data.action;
        // Guardo en el campo Action el record del mensaje
        if (action === "INBOX_MESSAGE") {
            var title = notificacion.notification.title;
            var text = getLocale(notificacion.notification.text);
            var mensaje = title + ' : ' + text;
            return mensaje;
        }                                
    }
},{
    xtype: 'datecolumn',
    dataIndex: 'ppq_fechaenvio',
    header: 'Fecha de Envio',
    sortable: true,
    flex: 1,
    format: 'd/m/Y H:i:s'
}*/