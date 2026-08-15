Ext.define('IPRSManager.view.IPRSEventGridView', {
    extend : 'Ext.grid.GridPanel',
    alias: 'widget.iprseventgridview',
    title: 'Eventos',
    columns: [
        {
            text: '',
            dataIndex: 'Status',
            renderer: function(value, metadata, record, colIndex,store, view){
                var cuenta = record.get('Cue_ncuenta');
                var alarma = record.get('Rec_calarma');

                if (value==11 || (cuenta && alarma)){
                    return "<img src=\"/resources/global/images/icons/accept.png\"/>";
                }else if (value==12 || value==13 || value==30){
                    return "<img src=\"/resources/global/images/icons/cross.png\"/>";
                }
            },
            width: 30
        }, {
            text: 'Fecha',
            xtype: 'datecolumn',
            format:'Y-m-d G:i:s',
            dataIndex: 'TRawFechaHora',
            width: 200
        }, {
            text: 'AssemblyClassName',
            dataIndex: 'AssemblyClassName',
            flex: 1,
            hidden:true,
            renderer: function(v){
                // limpio el packetparser del nombre
                return v.replace('PacketParser','');
            }
        }, {
            text: 'Conexión',
            dataIndex: 'Ipc_cdescripcion',
            flex: 1
        }, {
            text: 'Cuenta',
            dataIndex: 'Cue_ncuenta',
            renderer : function(value, metadata, record, colIndex,store, view) {
                if (Ext.String.trim(value) == 'XXXX' || Ext.String.trim(value) == '####') {
        			metadata.tdAttr  = 'bgcolor="red"';
    			} else if (value == '' && record.get('CCuenta')){
                    return record.get('CCuenta');
                }							
				return value; 
			},
            flex: 1
        }, {
            text: 'Evento',
            dataIndex: 'CEvento',
            flex: 1
        }, {
            text: 'Alarma',
            dataIndex: 'Rec_calarma',
            renderer : function(value, metadata, record, colIndex,store, view) {
                if (Ext.String.trim(value) == '_NE') {
            		metadata.tdAttr  = 'bgcolor="red"';
    			}												
				return value; 
			},
            flex: 1
        }, {
            text: 'Zona',
            dataIndex: 'CZona',
            flex: 1
        }, {
            text: 'Usuario',
            dataIndex: 'CUsuario',
            flex: 1
        }, {
            text: 'Particion',
            dataIndex: 'CParticion',
            flex: 1
        }, {
            text: 'Imei',
            dataIndex: 'CImei',
            flex: 1
        }, {
            text: 'Señal',
            dataIndex: 'ISignalLevel',
            align: 'center',
            width: 70,
            renderer: function(value, metadata, record, colIndex,store, view){
                
                /* datos pasados por Pablo 
                Do Case 
                Case Between(iNivel,1,8) 
                oic = '\SoftGuard\Graphics\okDataSignal14Diag.jpg'
                Case Between(iNivel,9,16) 
                oic = '\SoftGuard\Graphics\okDataSignal12Diag.jpg'
                Case Between(iNivel,17,24) 
                oic = '\SoftGuard\Graphics\okDataSignal34Diag.jpg'
                Case Between(iNivel,25,32) 
                oic = '\SoftGuard\Graphics\okDataSignalFullDiag.jpg'
                Otherwise
                oic = '\SoftGuard\Graphics\okData.gif'
                EndCase
                */
                metadata.tdAttr = 'data-qtip="' + Ext.String.htmlEncode('<i>'+getLocale('Señal')+': '+value+'</i>') + '"';
                
                
                if(value > 0 && value <=8) {
                    return '<img src="/resources/softguard/images/signal/1.png" />'
                } else if (value >= 9 && value <= 16) {
                    return '<img src="/resources/softguard/images/signal/2.png" />'
                } else if (value >= 17 && value <= 24) {
                    return '<img src="/resources/softguard/images/signal/3.png" />'
                } else if (value >= 25 ) {
                    return '<img src="/resources/softguard/images/signal/4.png" />'
                } else {
                    return ''
                }

            }
        }, {
            text: 'PacketId',
            dataIndex: 'PacketUniqueID',
            flex: 0,
            hidden:true
        }
        
    ],
     initComponent: function () {                
        this.callParent(arguments);
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [               
                
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
     }
});