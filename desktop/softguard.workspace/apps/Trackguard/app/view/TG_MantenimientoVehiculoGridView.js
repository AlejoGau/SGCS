Ext.define('Trackguard.view.TG_MantenimientoVehiculoGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.mantvehiculogridview',
    title : 'Templates',
    autoHeight : true,
    
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    
    columns : [
        {
            xtype:'actioncolumn',
            width: 30,
            items: [{
                iconCls: 'icon-book-edit',
                tooltip: 'Nuevo',
                handler: function (grid, rowIndex, e, colIndex, item, event) {
                    var view = grid.up('mantvehiculogridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    this.fireEvent('onAdd', grid, rec );
                    
                }
            }]
        },
        {
            xtype : 'gridcolumn',            
            header : 'Servicio',
            dataIndex : 'tgms_cnombre',
            sortable : true,
            flex: 1
        },{
            xtype : 'gridcolumn',            
            header : 'Se realiza cada',
            dataIndex : 'tgms_meses',
            sortable : true,
            flex: 1,
            renderer : function (grid, value, record) {
                var meses = record.get('tgms_meses');
                var km = record.get('tgms_kilometros');
                if ( meses != 0 ) {
                    return meses + " " + getLocale(" Meses");
                } else {
                    return km + " " + getLocale(" Kilómetros");
                }
            }
        },{
            xtype : 'gridcolumn',            
            header : 'Kilometraje Actual',
            dataIndex : 'Odometer',
            //format: 'd/m/Y',
            sortable : true,
            flex: 1
        },{
            xtype : 'datecolumn',            
            header : 'Fecha Servicio Anterior',
            dataIndex : 'tgmh_dfecha',
            format: 'd/m/Y',
            sortable : true,
            flex: 1
        },{
            xtype : 'gridcolumn',            
            header : 'Kilometraje del Ultimo Servicio',
            dataIndex : 'tgmh_iodometro',
            sortable : true,
            flex: 1
        },{
            xtype : 'datecolumn',            
            header : 'Próximo Servicio',
            dataIndex : 'fechaServicioProximo',
            format: 'd/m/Y',
            sortable : true,
            flex: 1,            
            renderer: function(value, metadata, record, colIndex, store, view){
                /* Obtengo la fecha de hoy */
                var now = Ext.Date.format(new Date(),'d/m/Y');
                /* Obtengo los datos del vehículo (Mes indicado que hizo ultimo service, que KM tenía y los meses que ese servicio
                 * indica que debe realizarse nuevamente 
                 */
                var mesesServicio = record.get('tgms_meses');
                var kilometrajeServicio = record.get('tgms_kilometros');
                var mesVehiculo = record.get('tgmh_dfecha');
                var kilometrajeHistoricoVehiculo = parseInt(record.get('tgmh_iodometro'));
                var kilometrajeVehiculo = record.get('Odometer');
                
                var nextService;
                
                /* Si el mes del servicio es mayor a 0, calculo por Fecha
                 * caso contrario, calculo por KM indicado en el servicio
                 */
                if (mesesServicio > 0) {
                    /* Calculo la fecha del próximo servicio en base a lo ultimo ingresado y lo que indica el servicio en cuestión */
                    if ( mesVehiculo != null ) {
                        nextService = Ext.Date.format(Ext.Date.add(new Date(mesVehiculo), Ext.Date.MONTH, mesesServicio), 'd/m/Y') ;
                    
                        var nowParsed = Ext.Date.parse(now, 'd/m/Y');
                        var nextServiceParsed = Ext.Date.parse(nextService, 'd/m/Y');
                        
                        if (nextServiceParsed < nowParsed) {
                            metadata.style = 'color: #FFF; background-color: #ff0000';
                            return nextService;
                        } else {
                            metadata.style = 'color: #FFF; background-color: #65a063';
                            return nextService;
                        } 
                    } else {
                        return "";
                    }                   
                    
                } else if (kilometrajeVehiculo > 0){
                    /* Calculo el KM del proximo Service en base a el cargado por el usuario + lo que se indica en el servicio
                     * esto tiene que ser MENOR al Odometro de _Datos..iDispositivoMovil
                     */
                    if  (kilometrajeHistoricoVehiculo != null) {
                        if (kilometrajeHistoricoVehiculo > 0) {
                            nextService = parseInt(kilometrajeServicio) + parseInt(kilometrajeHistoricoVehiculo);
                        } else {
                            nextService = parseInt(kilometrajeServicio);
                        }
                    } else {
                        nextService = parseInt(kilometrajeServicio);
                    }                    
                    
                    
                    if (nextService > kilometrajeVehiculo) {
                        metadata.style = 'color: #FFF; background-color: #65a063';
                        return nextService;
                    } else {
                        metadata.style = 'color: #FFF; background-color: #ff0000';
                        return nextService;
                    }
                    
                } else {
                    /* Respuesta a que no tengo KM cargado por eso, pongo el del Servicio */
                    nextService = kilometrajeServicio;
                    return nextService;
                }
                
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
                /*
                {
                    iconCls: 'icon-table-add',
                    text: 'Nuevo',
                    scope: this,
                    action: 'add'
                },"-",  {
                    iconCls: 'icon-delete',
                    text: 'Eliminar',
                    action: 'delete',                    
                    disabled: true,
                    scope: this
                },"-",
                */
                {
                    text : 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 350,
                        items: [
                            {
                                xtype: 'panel',
                                bodyPadding: 5,
                                items: [
                                    {
                                        xtype: 'datefield',
                                        itemId: 'fechaDesde',
                                        fieldLabel: 'Fecha del Ultimo Servicio',
                                        anchor:'100%',
                                        labelWidth: 150              
                                    },{
                                        xtype: 'textfield',
                                        itemId: 'nombreServicio',
                                        fieldLabel: 'Nombre del Servicio',
                                        anchor:'100%',
                                        labelWidth: 150
                                    },{
                                        xtype: 'textfield',
                                        itemId: 'descripcionServicio',
                                        fieldLabel: 'Descripcion',
                                        anchor:'100%',
                                        labelWidth: 150,
                                        hidden : true
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
                }/*,'->',{
                    xtype : 'button',
                    text: 'Exportar',
                    iconCls : 'icon-page-excel',
                    action : 'export'
                }*/
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
    } 
});