Ext.define( 'DealerSearch.view.DealerToolbarView', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.moduletoolbar',
    id: 'north',
    itemId: 'north',
    border: 0,
    items: [
        /*{
			text : 'Cuentas',
			iconCls : 'icon-search',
			view : 'cuentagridview'
		}, {
			text : 'Usuarios',
			iconCls : 'icon-usuarios',
			view : 'griduser'
		}*/ {
            text: 'Reporte Multi-cuenta',
            iconCls: 'icon-reportes',
            itemId: 'btnMulticuenta',
            action: 'multicuenta',
            view: 'multicuentagridview',
            //view : 'eventosautorefreshview',
            closable: true,
            skipRecord: true
        }, {
            text: 'Victimarios',
            iconCls: 'icon-victimario',
            itemId: 'victimariosgest',
            view: 'victimariosview',
            hidden: true,
            closable: true
        }/*,{
            text : 'Dealers',
        	iconCls : 'icon-group',
            itemId: 'tablaslineas',
            skipRecord: true,
			//myurl : '/a/EventosTiempoReal',
            view : 'tablaslineasgridview',
            closable: true,
            viewConfig: {
                readOnly:true
            }
		}*/, '->', {
            iconCls: 'icon-sound-add',
            text: 'Grabar llamada entrante',
            itemId: 'grabarllamada',
            disabled: true,

        }, {
            text: 'Cerrar pestañas',
            iconCls: 'icon-tab-delete',
            itemId: 'closeall'
        }, '|',
        {
            xtype: 'displayfield',
            value: '',
            itemId: 'toolbardisplayfield',
            margin: '0 10 0 10'
        }
    ]
})