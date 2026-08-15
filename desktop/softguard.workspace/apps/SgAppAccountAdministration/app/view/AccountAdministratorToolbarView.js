Ext.define('SgAppAccountAdministration.view.AccountAdministratorToolbarView', {
    extend: 'Ext.toolbar.Toolbar',
    alias: ['widget.moduletoolbar','widget.accountadministrationtoolbarview'],
  //  id: 'north',
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
			text : 'Reporte Multi-cuenta',
			iconCls : 'icon-reportes',
            itemId: 'btnMulticuenta',
            action: 'multicuenta',		
            //view : 'eventosautorefreshview'	,//view : 'eventostrgridview',//
            //view : 'multicuentagridview',
            skipRecord: true,
            closable: true
		}/*, {
    		text : 'Eventos Tiempo Real',
			iconCls : 'icon-monitor',
            itemId: 'btnTiempoReal',
            action: 'tiemporeal',
    		view : 'eventostrgridview',
            closable: true
		}*/, {
            text : 'Geo referenciar cuentas',
			iconCls : 'icon-monitor',
            itemId: 'autolocalizarcuentas',
            skipRecord: true,
			//myurl : '/a/EventosTiempoReal',
            view : 'cuentalocalizationgridview',
            closable: true
		},{
            text : 'Dealers',
    		iconCls : 'icon-group',
            itemId: 'tablaslineas',
            skipRecord: true,
			//myurl : '/a/EventosTiempoReal',
            view : 'tablaslineasgridview',
            closable: true,
            viewConfig: {
                readOnly : false,
                hiddenSPVC : false
            }
        },{
            text : 'Solicitudes de modificacion',
        	iconCls : 'icon-group',
            itemId: 'solicitudescambio',
            view : 'objectomodificacionesview',
            hidden:true,
            closable: true
		}
        ,{
            text : 'Victimarios',
        	iconCls : 'icon-victimario',
            itemId: 'victimariosgest',
            view : 'victimariosview',
            hidden:true,
          // skipRecord: true,
            closable: true
		}
        ,'->',{
            text : 'Generar evento',
        	iconCls : 'icon-group',
            itemId: 'generareventoformview',
            hidden: true
		},{            
            text: 'Cerrar todos',
            iconCls: 'icon-tab-delete',
            itemId: 'closeall'            
        },'|',
        {
            xtype: 'displayfield',
            value: '',
            itemId: 'toolbardisplayfield',
            margin: '0 10 0 10' // modificado dedalo 17/5/2018
        }
    ]
})