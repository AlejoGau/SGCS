//MIGRADO2024
Ext.define('Common.view.EventoTimeLineFullView',
{ extend: 'Ext.grid.Panel',
    alias: ['widget.eventotimelinefullgridview','widget.eventotimelinegridview'],
    title:'Timeline',
    columns: [{
            xtype : 'gridcolumn',
            sortable : false,
			dataIndex : 'iconClass',
			width : 25,
            renderer: function(value, metadata,record){
                if (value)
                    return '<span style="display: inline-block; width:16px;height:16px;" class="'+value+'" />';
            },
        },{
            text: 'order',
            width: 90,
            dataIndex: 'order',
            hidden: true
        },{
            xtype: 'gridcolumn',
            text: 'Tiempo',
            width: 90,
            dataIndex: 'etl_tFechaHora',
            renderer : function(value, metadata, record, row, col, store, gridView) {
                var tiempoAcumulado;
                //var fechaIncio = new Date(store.data.items[0].get('fecha'));
                var fechaInicio = new Date(this.record.get('rec_isoFechaHora'));
                
                var fechaOriginal = new Date(record.get('etl_tFechaHora'));
                
                var diff = fechaOriginal-fechaInicio;
                
                if (diff < 0){
                    diff = 0;
                }
                
                var milisegundos = new Date(diff);
                
                var segundos = milisegundos/1000;
                var dias = Math.floor(segundos / 86400);
                segundos -= dias * (86400);
                var horas = Math.floor(segundos / 3600);
                segundos -= horas * (3600);
                var minutos = Math.floor(segundos / 60);
                segundos -= minutos * (60);
                var text = dias+':'+Ext.String.leftPad(horas,2,'0')+':'+Ext.String.leftPad(minutos,2,'0')+':'+Ext.String.leftPad(Math.round(segundos),2,'0');
                
                return text;
                
                
            },
            format: 'H:i:s'
        },{
            text: 'Comentario',
            flex: 1,
            minWidth: 120,
            dataIndex: 'etl_cObservacion',
            renderer: function (value, meta, record) {
                var cleanValue = value ? value.replace(/%/g, '') : '';
                var encoded = Ext.htmlEncode(value);
                meta.tdAttr = 'data-qtip="' + encoded + '"';
                return cleanValue;
            }
        },{
            xtype: 'datecolumn',
            text: 'Fecha',
            width: 120,
            sortable: false,
            //sortType : Ext.data.SortTypes.asDate,
            dataIndex: 'etl_tFechaHora',
            format: 'd/m/Y H:i:s'
        },{
            text: 'Horario Cuenta',
            dataIndex: '_tfechahoraOffset',
            xtype: 'datecolumn',
            //format : 'd-m-Y G:i:s',
            renderer: function( value, metadata, record ) {
                var fecha = record.get( "_tfechahoraOffset" );
                return Ext.Date.format( fecha, 'd/m/Y H:i:s' );
            },
            hidden: true,
            width: 170
        },{
            text: 'Operador',
            width: 120,
            dataIndex: 'ope_clogin'
        },{
            text: 'Origen',
            
            dataIndex: 'etl_cOwner',
            renderer: function (value) {
                return getLocale(value)
            }
        }],
        
    initComponent: function(){
        this.callParent();
        
        
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
               {
                    xtype: 'button', 
                    text: 'Refrescar', 
                    action: 'refresh',
                    itemId: 'refresh',
                    iconCls:'x-tbar-loading'
                },'->',{
                    type: 'button', 
                    itemId: 'maximizer',
                    hidden:true,
                    iconCls:'icon-arrow-out',
                    text:'',
                    handler: function(btn){
                        var view = btn.up('eventotimelinefullgridview');
                        var tabpanel = btn.up('tabpanel');
                        var record = view.record;
                                                
                        var win = Ext.create('Ext.Window', {
                            layout: 'fit',
                            title : getLocale('Timeline')+' ('+record.get('cue_clinea')+'-'+record.get('cue_ncuenta')+' '+record.get('cue_cnombre')+')',
                			closeAction : 'hide',
                			width : 750,
                            translate: false,
                			height : 400,
                			border : true,
                            modal: false,
                            view: view,
                			items : [
                                {
                                    xtype: 'eventotimelinefullgridview',
                                    caller: view,
                                    showMaximizer: false,
                                    record:record
                                    
                                }
                            ]
                		});
                        
                        win.show();
                    }
                }
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
       
    }
});  // cierro define