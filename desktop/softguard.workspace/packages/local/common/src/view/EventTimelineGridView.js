//MIGRADO2024
Ext.define('Common.view.EventTimelineGridView',
{ extend: 'Ext.grid.Panel',
    alias: 'widget.eventotimelinegridview',
    
    columns: [{
            xtype : 'gridcolumn',
        	sortable : false,
			dataIndex : 'iconCls',
			width : 25,
            renderer: function(value, metadata,record){
                if (value)
                    return '<span style="position:absolute; width:16px;height:16px;" class="'+value+'" />';
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
            dataIndex: 'order',
            renderer : function(value, metadata, record, row, col, store, gridView) {
                var tiempoAcumulado;
                //var fechaIncio = new Date(store.data.items[0].get('fecha'));
                var fechaInicio = new Date(this.record.get('rec_isoFechaHora'));
                
                var fechaOriginal = new Date(record.get('fecha'));
                
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
            dataIndex: 'comentario',
            renderer: function (value, meta, record) {
                meta.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        },{
            xtype: 'datecolumn',
            text: 'Fecha',
            width: 120,
            sortable: false,
            //sortType : Ext.data.SortTypes.asDate,
            dataIndex: 'fecha',
            format: 'd/m/Y H:i:s'
        },{
            text: 'Operador',
            width: 120,
            dataIndex: 'usuario'
        }],
        
    initComponent: function(){
        this.callParent();
       
    }
});  // cierro define