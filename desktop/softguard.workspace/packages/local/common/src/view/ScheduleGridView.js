//MIGRADO2024
Ext.define('Common.view.ScheduleGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.schedulegridview'],
    title : 'Templates',
    autoHeight : true,    
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    columns : [
      {
            xtype : 'gridcolumn',            
            header : 'Nombre',
            dataIndex : 'Name',
            flex: 1
    	},{
            xtype : 'gridcolumn',            
            header : 'Tipo de programa',
            dataIndex : 'programtype',
            flex: 1,
            renderer:function (value,field, record) {
                
                var panelString = ''
                //si es mayor a 10 es tipo de programa + panel abierto o cerrado
                if(value >= 10) {
                    var programtype = value.toString().slice(0,1)
                    var panel = value.toString().slice(1)
                    if(panel == 1) {
                        panelString = ' - ' + getLocale('Panel abierto');
                    } else {
                        panelString = ' - ' + getLocale('Panel cerrado');                        
                    }
                } else {
                    //si es menor a 10 es solo programa
                    programtype = value
                }
                
                switch(parseInt(programtype)) {
                    case 1:
                        return getLocale('Todos los dias')+panelString;
                    break;
                    case 2:
                        return getLocale('Luneas a viernes')+panelString;
                    break;
                    case 3:
                        
                        var dia = '';
                        switch(record.get('dayofweek')) {
                            case 0:
                                dia = getLocale('Domingo');
                            break;
                            case 1:
                                dia = getLocale('Lunes');
                            break;
                            case 2:
                                dia = getLocale('Martes');
                            break;
                            case 3:
                                dia = getLocale('Miercoles');
                            break;
                            case 4:
                                dia = getLocale('Jueves');
                            break;
                            case 5:
                                dia = getLocale('Viernes');
                            break;
                            case 6:
                                dia = getLocale('Sabado');
                            break;
                        }
                        
                        return getLocale('Dias de la semana') + " " + dia + panelString;
                    break;
                    case 4:
                        return getLocale('Una vez al mes') + " " + record.get('dayofmonth') + panelString;
                    case 5:
                        return getLocale('Personalizado, repite cada') + ' ' + Ext.String.leftPad(record.get('endhour'),2,'0') + ':' + Ext.String.leftPad(record.get('endminutes'),2,'0') + ' ' + getLocale('hs') + panelString;
                    break;                    
                    
                }
            }
		},{
            xtype : 'gridcolumn',            
            header : 'Evento esperado',
        	dataIndex : 'eventos',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Evento a emitir',
            dataIndex : 'eventogenerar',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Hora inicio',
            dataIndex : '',
            flex: 1,
            renderer:function (value,field, record) {
                
                var pad = "00";
                var hora = (pad+record.get('starthour')).slice(-pad.length);
                var minuto = (pad+record.get('startminutes')).slice(-pad.length);
                
                return hora+":"+minuto
            }
        },{
            xtype : 'gridcolumn',            
            header : 'Hora fin',
            dataIndex : '',
            flex: 1,
            renderer:function (value,field, record) {
                var pad = "00";
                var hora = (pad+record.get('endhour')).slice(-pad.length);
                var minuto = (pad+record.get('endminutes')).slice(-pad.length);
                
                return hora+":"+minuto
            }
        }
        
   
    ],
    
    initComponent: function () {
       
        
        var comboSearch =  [
                             ['Name',getLocale('Nombre')],
                           ];
        
        
      
        
                
        this.callParent(arguments);     
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
        
        
        this.onSelectChange = function (selModel, selections) {
            var button = this.down('button[action=delete]');
            if (button)
                button.setDisabled(selections.length === 0);                
            
        };
        
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-table-add',
                    text: 'Nuevo',
                    scope: this,
                    action: 'add'
                },"-", {
                    iconCls: 'icon-delete',
                    text: 'Eliminar',
                    action: 'delete',                    
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
                                            
                                            xtype: 'combo',
                                            queryMode: 'local',
                                            itemId: 'fieldName',
                                            store: comboSearch,
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
                }
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
    } 
});